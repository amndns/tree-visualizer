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

export interface TreeData {
  name: string;
  location: string;
  type: NodeTypes;
  nodeSvgShape: {
    shape: string;
    shapeProps: {
      r: number;
      strokeWidth: number;
      fill: string;
      visibility: NodeVisibility;
    };
  };
  children: TreeData[];
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
