import React, { FunctionComponent } from 'react';
import Tree, { ReactD3TreeProps } from 'react-d3-tree';

interface D3TreeData {
  x: number;
  y: number;
  type: string;
}

interface LinkData {
  source: D3TreeData;
  target: D3TreeData;
}

const svgCircle = {
  shape: 'circle',
  shapeProps: {
    r: 30,
    fill: '#fff',
  },
};

const textLayout = {
  textAnchor: 'middle',
  x: 0,
  y: 0,
};

const defaultTreeProps = {
  collapsible: false,
  orientation: 'vertical' as 'horizontal' | 'vertical',
  transitionDuration: 0,
  pathFunc: ({ source, target }: LinkData) => {
    if (target.type === 'plus') return null;
    return `M${source.x},${source.y}L${target.x},${target.y}`;
  },
};

const TreeView: FunctionComponent<ReactD3TreeProps> = ({ data, onClick }) => {
  const {
    collapsible,
    orientation,
    transitionDuration,
    pathFunc,
  } = defaultTreeProps;

  return (
    <Tree
      data={data}
      collapsible={collapsible}
      nodeSvgShape={svgCircle}
      orientation={orientation}
      textLayout={textLayout}
      transitionDuration={transitionDuration}
      onClick={onClick}
      pathFunc={pathFunc}
    />
  );
};

export default TreeView;
