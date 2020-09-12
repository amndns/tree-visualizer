import { ReactD3TreeItem } from 'react-d3-tree';

export enum NodeTypes {
  Node = 'node',
  Plus = 'plus',
}

export enum NodeVisibility {
  Hidden = 'hidden',
  Visible = 'visible',
}

export enum TreeActionTypes {
  UpdateTree = 'UPDATE_TREE',
}

export interface TreeData extends ReactD3TreeItem {
  location: string;
  type: NodeTypes;
  children?: TreeData[];
}

export interface Tree {
  data: TreeData | [];
  selectedNodeLoc: string | null;
}

export interface TreeActionPayload {
  data?: TreeData;
  selectedNodeLoc?: string;
}

export interface TreeAction {
  type: TreeActionTypes;
  payload: TreeActionPayload;
}
