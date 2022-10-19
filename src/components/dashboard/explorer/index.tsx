import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import CloudIcon from "@mui/icons-material/Cloud";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TableViewIcon from "@mui/icons-material/TableView";
import TreeItem from "@mui/lab/TreeItem";
import { ItemLevel, RenderTree } from "../../../types";
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import { fetchExplorer } from "../../../fetch";
import { useEffect, useState } from "react";
import { populateItemTree } from "./utils";

const Explorer = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedNode, setSelectedNode] = React.useState<null | RenderTree>(
    null
  );
  const [providers, setProviders] = React.useState<RenderTree[] | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    fetchExplorer()
      .then((data) => {
        setProviders(data as RenderTree[]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

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
      // 👇️ if id equals 2 replace object
      if (tree.id === updatedNode.id) {
        return updatedNode;
      }

      // 👇️ otherwise return object as is
      return tree;
    });

    setProviders(newState);
  };

  const handleLeftClick = async (node: RenderTree, rootId: string) => {
    if (!providers) return;
    if (
      node.level < ItemLevel.resource &&
      (!node.children || !node.children.length)
    ) {
      setLoading(true);
      const children = await fetchExplorer(node.path);
      const updatedRoot = providers?.find((node) => node.id === rootId);
      if (updatedRoot) {
        const updatedTree = populateItemTree(updatedRoot, node, children);
        updateItemTreeState(updatedTree);
        setExpanded([...expanded, node.id]);
      }
      setLoading(false);
    } else {
      setExpanded(expanded.filter((ids) => ids !== node.id));
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

  return (
    <div className="w-full flex-col border-right max-h-full h-full">
      <h2 className="panel-title text-center bg-gray-100 border-bottom">
        Explorer
      </h2>
      {!isLoading && providers ? (
        <>
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<TableViewIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<TableViewIcon />}
            className="w-full overflow-x-scroll overflow-y-auto h-[95%]"
            multiSelect
            key={0}
            expanded={expanded}
          >
            {providers.map((provider) => {
              return renderTree(provider, provider.id);
            })}
          </TreeView>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
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

export default Explorer;
