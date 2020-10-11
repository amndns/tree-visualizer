import {
  Playground,
  PlaygroundAction,
  PlaygroundActionPayload,
  PlaygroundActionTypes,
  PlaygroundView,
} from './playground.model';

export const initialPlaygroundState: Playground = {
  playgroundView: PlaygroundView.Home,
};

export const updatePlayground = (
  payload: PlaygroundActionPayload
): PlaygroundAction => ({
  type: PlaygroundActionTypes.UpdatePlayground,
  payload,
});

const reducer = (
  state: Playground = initialPlaygroundState,
  action: PlaygroundAction
): Playground => {
  switch (action.type) {
    case PlaygroundActionTypes.UpdatePlayground:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
