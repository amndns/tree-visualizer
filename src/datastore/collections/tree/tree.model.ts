import { NodeSvgShape, ReactD3TreeItem } from 'react-d3-tree';

export enum NodeChildIndex {
  Left,
  Right,
}

export enum NodeTypes {
  Regular = 'regular',
  Plus = 'plus',
}

export enum NodeVisibility {
  Visible = 'visible',
  Hidden = 'hidden',
}

export enum PlaygroundState {
  DefaultView = 'DefaultView',
  NodeUpdateView = 'NodeUpdateView',
  VisualizationView = 'VisualizationView',
}

export enum PlusNodeName {
  Shown = '+',
  Hidden = '',
}

export enum TreeActionTypes {
  UpdateTree = 'UPDATE_TREE',
}

export interface StrictNodeSvgShape extends NodeSvgShape {
  shape: string;
  shapeProps: {
    r: number;
    stroke?: string;
    strokeWidth?: number;
    fill: string;
    visibility?: NodeVisibility;
  };
}

export interface TreeData extends ReactD3TreeItem {
  location: string;
  type: NodeTypes;
  nodeSvgShape: StrictNodeSvgShape;
  children?: TreeData[];
}

export interface Tree {
  data: TreeData | [];
  selectedNodeLoc: string | null;
}

export interface TreeActionPayload {
  data?: TreeData;
  selectedNodeLoc?: string | null;
}

export interface TreeAction {
  type: TreeActionTypes;
  payload: TreeActionPayload;
}

/**
 * Custom type to override the 'react-d3-tree' tree node.
 */
export type UnionedTreeData = TreeData | ReactD3TreeItem;
