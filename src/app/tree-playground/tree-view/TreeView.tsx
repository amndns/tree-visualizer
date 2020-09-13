import React, { FunctionComponent } from 'react';
import Tree, { ReactD3TreeProps } from 'react-d3-tree';
import { UnionedTreeData } from 'datastore/collections/tree/tree.model';
import { REGULAR_NODE_SVG_STYLE } from 'helpers/tree';

interface TreeViewProps extends ReactD3TreeProps {
  onClick?: (targetNode: UnionedTreeData, event: Event) => any;
}

interface D3TreeData {
  x: number;
  y: number;
  type: string;
}

interface LinkData {
  source: D3TreeData;
  target: D3TreeData;
}

const TEXT_LAYOUT = {
  textAnchor: 'middle',
  x: 0,
  y: 0,
};

const DEFAULT_TREE_PROPS = {
  collapsible: false,
  orientation: 'vertical' as 'horizontal' | 'vertical',
  transitionDuration: 0,
  pathFunc: ({ source, target }: LinkData) => {
    if (target.type === 'plus') return null;
    return `M${source.x},${source.y}L${target.x},${target.y}`;
  },
};

const TreeView: FunctionComponent<TreeViewProps> = ({ data, onClick }) => {
  const {
    collapsible,
    orientation,
    transitionDuration,
    pathFunc,
  } = DEFAULT_TREE_PROPS;

  return (
    <Tree
      data={data}
      collapsible={collapsible}
      nodeSvgShape={REGULAR_NODE_SVG_STYLE}
      orientation={orientation}
      textLayout={TEXT_LAYOUT}
      transitionDuration={transitionDuration}
      onClick={onClick}
      pathFunc={pathFunc}
    />
  );
};

export default TreeView;
