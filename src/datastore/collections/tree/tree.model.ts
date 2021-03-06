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

export enum PlusNodeName {
  Shown = '+',
  Hidden = '',
}

export enum TreeActionTypes {
  FetchTree = 'FETCH_TREE',
  UpdateTree = 'UPDATE_TREE',
  DeleteTree = 'DELETE_TREE',
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
  name: string;
  location: string;
  type: NodeTypes;
  nodeSvgShape: StrictNodeSvgShape;
  children?: TreeData[];
}

export interface SelectedNode {
  location: string;
  name: string;
}

export interface Tree {
  data: TreeData;
  selectedNode: SelectedNode | null;
  nodeCounter: number;
}

export interface TreeActionPayload {
  data?: TreeData;
  selectedNode?: SelectedNode | null;
  nodeCounter?: number;
}

export interface TreeAction {
  type: TreeActionTypes;
  payload?: TreeActionPayload;
}

/**
 * Custom type to override the 'react-d3-tree' tree node.
 */
export type UnionedTreeData = TreeData | ReactD3TreeItem;
