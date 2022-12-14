import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import CloudIcon from "@mui/icons-material/Cloud";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import TreeItem from "@mui/lab/TreeItem";
import { ItemLevel, RenderTree } from "../../../types";
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import { fetchExplorer } from "../../../fetch";
import { useEffect, useRef, useState } from "react";
import { populateItemTree } from "./utils";
import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import { AlertMessage } from "../../layout/alert";
import { useWindowSize } from "../../../contexts/useWindowSize";
import Collapsible from "../../layout/collapse";

const Explorer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<null | RenderTree>(null);
  const [providers, setProviders] = useState<RenderTree[] | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const rightClickMenu = Boolean(anchorEl);
  const { serverUrl } = useQueryContext();
  let scrollRef = useRef<number>(0);
  useEffect(() => {
    setLoading(true);
    fetchExplorer({ serverUrl })
      .then((data) => {
        setProviders(data as RenderTree[]);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serverUrl]);

  useEffect(() => {
    const explorerContainer = document.getElementById("explorer-container");
    if (explorerContainer) explorerContainer.scrollTop = scrollRef.current;
  }, [providers]);

  const handleRightClick = (
    event: React.MouseEvent<HTMLElement>,
    node: RenderTree
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedNode(node);
  };

  const updateItemTreeState = (updatedNode: RenderTree) => {
    const newState = providers!.map((tree) => {
      if (tree.id === updatedNode.id) {
        return updatedNode;
      }

      return tree;
    });

    setProviders(newState);
  };

  const handleLeftClick = async (node: RenderTree, rootId: string) => {
    const nodeExpanded = () => expanded.includes(node.id);
    const collapseNode = () => {
      setExpanded(expanded.filter((ids) => ids !== node.id));
    };
    const expandNode = () => {
      setExpanded([...expanded, node.id]);
    };
    const nodeChildrenNotLoad =
      node.level < ItemLevel.subResourceItem &&
      (!node.children || !node.children.length);

    if (!providers) return;
    if (nodeChildrenNotLoad) {
      setLoading(true);
      //Need to also get methods when populating resources
      const children = await fetchExplorer({ path: node.path, serverUrl });
      const updatedRoot = providers?.find((node) => node.id === rootId);
      if (updatedRoot) {
        const updatedTree = populateItemTree(updatedRoot, node, children);
        updateItemTreeState(updatedTree);

        expandNode();
      }
      setLoading(false);
    } else if (nodeExpanded()) {
      collapseNode();
    } else {
      expandNode();
    }
  };

  const handleCopy = () => {
    const node = selectedNode;
    if (node && node.path) {
      navigator.clipboard.writeText(node.path);
    }
    setAnchorEl(null);
  };
  const renderLevelIcon = (level: ItemLevel) => {
    switch (level) {
      case ItemLevel.provider:
        return <CloudIcon />;
      case ItemLevel.service:
        return <MiscellaneousServicesIcon />;
      case ItemLevel.resource:
        return <TableViewIcon />;
      case ItemLevel.subResourceKey:
        return <ViewColumnOutlinedIcon />;
      case ItemLevel.subResourceItem:
        return <HorizontalSplitOutlinedIcon />;
      default:
        break;
    }
  };

  const renderTree = (node: RenderTree, rootId: string) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={node.name}
      icon={renderLevelIcon(node.level)}
      onContextMenu={(event) => {
        node.level === ItemLevel.resource && handleRightClick(event, node);
      }}
      onClick={() => handleLeftClick(node, rootId)}
      className="w-full border-0"
    >
      {Array.isArray(node.children)
        ? node.children.map((node) => renderTree(node, rootId))
        : null}
    </TreeItem>
  );
  const providerFetched = providers && providers.length;
  const Content = () => {
    return (
      <div
        className="w-full h-full min-h-0 overflow-auto"
        id="explorer-container"
        onScroll={() => {
          const scroll =
            document.getElementById("explorer-container")?.scrollTop;
          if (scroll) scrollRef.current = scroll;
        }}
      >
        {!isLoading && providers ? (
          <>
            <TreeView
              aria-label="rich object"
              defaultCollapseIcon={<TableViewIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<TableViewIcon />}
              className="w-full"
              multiSelect
              key={0}
              expanded={expanded}
            >
              {providerFetched &&
                providers.map((provider) => {
                  return renderTree(provider, provider.id);
                })}
            </TreeView>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={rightClickMenu}
              onClose={handleCopy}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleCopy}>Copy Resource Name</MenuItem>
            </Menu>
          </>
        ) : (
          <h6>
            <CircularProgress />
          </h6>
        )}
      </div>
    );
  };
  return (
    <>
      <AlertMessage
        open={error !== undefined}
        handleClose={() => {
          setError(undefined);
        }}
        severity="error"
        errorMessage={error as string}
      />
      <div className="w-full flex flex-col border-right h-full resize-none mobile:hidden ">
        {
          // TODO: make collapsible intelligently render this class when not in mobile
        }
        <div>
          <h2 className="panel-title text-center bg-gray-100 border-bottom">
            Explorer
          </h2>
        </div>
        <Content />
      </div>
      <Collapsible
        containerClass=" hidden w-full flex-col border-right h-full mobile:inline-flex"
        label="Explorer"
        open={false}
      >
        <Content />
      </Collapsible>
    </>
  );
};

export default Explorer;
