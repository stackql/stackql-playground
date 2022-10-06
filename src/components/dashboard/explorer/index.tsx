import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import CloudIcon from "@mui/icons-material/Cloud";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TableViewIcon from "@mui/icons-material/TableView";
import TreeItem from "@mui/lab/TreeItem";
import { RenderTree } from "../../../types";

const Explorer = ({
  itemTrees,
  loading,
}: {
  itemTrees: RenderTree[] | null;
  loading: boolean;
}) => {
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
        className="w-full"
        multiSelect
      >
        {renderTree(itemTree)}
      </TreeView>
    );
  };
  return (
    <div className="w-1/6 flex-col border-right">
      <h2 className="panel-title text-center bg-gray-100 border-bottom">
        Explorer
      </h2>
      {!loading && itemTrees ? (
        itemTrees.map((itemTree) => renderTreeView(itemTree))
      ) : (
        <h6> Loading Resources </h6>
      )}
    </div>
  );
};

export default Explorer;
