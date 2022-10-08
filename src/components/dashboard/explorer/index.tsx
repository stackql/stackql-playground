import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import CloudIcon from "@mui/icons-material/Cloud";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TableViewIcon from "@mui/icons-material/TableView";
import TreeItem from "@mui/lab/TreeItem";
import { RenderTree } from "../../../types";
import { Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";

const Explorer = ({
  itemTrees,
  loading,
}: {
  itemTrees: RenderTree[] | null;
  loading: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedNode, setSelectedNode] = React.useState<null | RenderTree>(
    null
  );

  const open = Boolean(anchorEl);
  const handleRightClick = (
    event: React.MouseEvent<HTMLElement>,
    node: RenderTree
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedNode(node);
  };
  const handleCopy = () => {
    const node = selectedNode;
    if (node && node.path) {
      navigator.clipboard.writeText(node.path);
    }
    setAnchorEl(null);
  };
  const renderLevelIcon = (level: 0 | 1 | 2) => {
    switch (level) {
      case 0:
        return <CloudIcon />;
        break;
      case 1:
        return <MiscellaneousServicesIcon />;
        break;
      case 2:
        return <TableViewIcon />;
      default:
        break;
    }
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      icon={renderLevelIcon(nodes.level)}
      onContextMenu={(event) => {
        nodes.level === 2 && handleRightClick(event, nodes);
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const renderTreeView = (itemTree: RenderTree) => {
    return (
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<TableViewIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<TableViewIcon />}
        className="w-full overflow-scroll max-h-[95%]"
        multiSelect
      >
        {renderTree(itemTree)}
      </TreeView>
    );
  };
  return (
    <div className="w-1/6 flex-col border-right max-h-full h-full">
      <h2 className="panel-title text-center bg-gray-100 border-bottom">
        Explorer
      </h2>
      {!loading && itemTrees ? (
        <>
          {itemTrees.map((itemTree) => renderTreeView(itemTree))}
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
        <h6> Loading Resources </h6>
      )}
    </div>
  );
};

export default Explorer;
