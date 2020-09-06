export enum TraversalActions {
  Visit = 'visit',
  Print = 'print',
}

export enum VisualizationAlgorithms {
  LevelOrder = 'bfs',
  PreOrder = 'preorder',
  InOrder = 'inorder',
  PostOrder = 'postorder',
}

export enum VisualizationStatus {
  Running = 'running',
  Paused = 'paused',
  Idle = 'idle',
}

export enum VisualizationActionTypes {
  UpdateAlgorithm = 'UPDATE_ALGORITHM',
  UpdateStatus = 'UPDATE_STATUS',
  UpdateTraversalPath = 'UPDATE_TRAVERSAL_PATH',
  UpdateTraversalPathIndex = 'UPDATE_TRAVERSAL_PATH_INDEX',
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
