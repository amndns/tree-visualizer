export enum TraversalActions {
  Visit = 'visit',
  Print = 'print',
}

export enum VisualizationAlgorithms {
  LevelOrder = 'bfs',
  PreOrder = 'preorder',
  InOrder = 'inorder',
  PostOrder = 'postorder',
  Default = LevelOrder,
}

export enum VisualizationStatus {
  Idle = 'idle',
  Running = 'running',
  Paused = 'paused',
  Default = Idle,
}

export enum VisualizationActionTypes {
  UpdateVisualization = 'UPDATE_VISUALIZATION',
}

export interface Traversal {
  location: string;
  action: TraversalActions;
}

export interface Visualization {
  algorithm: VisualizationAlgorithms;
  status: VisualizationStatus;
  traversalPath: Traversal[] | [];
  traversalPathIndex: number;
}

export interface VisualizationActionPayload {
  algorithm?: VisualizationAlgorithms;
  status?: VisualizationStatus;
  traversalPath?: Traversal[];
  traversalPathIndex?: number;
}

export interface VisualizationAction {
  type: VisualizationActionTypes;
  payload: VisualizationActionPayload;
}
