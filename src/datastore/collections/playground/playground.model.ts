export enum PlaygroundActionTypes {
  UpdatePlayground = 'UPDATE_PLAYGROUND',
}

export enum PlaygroundView {
  Default = 'DefaultView',
  NodeUpdate = 'NodeUpdateView',
  Visualization = 'VisualizationView',
}

export interface Playground {
  playgroundView: PlaygroundView;
}

export interface PlaygroundActionPayload {
  playgroundView: PlaygroundView;
}

export interface PlaygroundAction {
  type: PlaygroundActionTypes;
  payload: PlaygroundActionPayload;
}
