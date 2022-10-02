import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Divider, Drawer, Paper } from "@mui/material";
interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const Explorer = () => {
  const data: RenderTree = {
    id: "root",
    name: "AWS",
    children: [
      {
        id: "1",
        name: "Elastic Load Balancer",
      },
      {
        id: "3",
        name: "EC2",
        children: [
          {
            id: "4",
            name: "Security Groups",
          },
        ],
      },
    ],
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <div className="w-1/6 flex-col border-right">
      <h2 className="panel-title text-center bg-gray-100 border-bottom">
        Explorer
      </h2>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        className="w-full"
        multiSelect
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default Explorer;
