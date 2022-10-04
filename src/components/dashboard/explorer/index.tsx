import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import CloudIcon from "@mui/icons-material/Cloud";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TableViewIcon from "@mui/icons-material/TableView";
import TreeItem from "@mui/lab/TreeItem";
import Image from "next/image";
import { Divider, Drawer, Paper } from "@mui/material";

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
  level: 0 | 1 | 2;
}

const Explorer = () => {
  const data: RenderTree = {
    id: "root",
    name: "AWS",
    level: 0,
    children: [
      {
        id: "1",
        name: "Elastic Load Balancer",
        level: 1,
      },
      {
        id: "3",
        name: "EC2",
        level: 1,
        children: [
          {
            id: "4",
            name: "Security Groups",
            level: 2,
          },
        ],
      },
    ],
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
    >
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
        defaultCollapseIcon={<TableViewIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<TableViewIcon />}
        className="w-full"
        multiSelect
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default Explorer;
