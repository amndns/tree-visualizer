import {
  Tree,
  TreeAction,
  TreeActionPayload,
  TreeActionTypes,
} from './tree.model';

export const initialTreeState: Tree = {
  data: [],
  selectedNodeLoc: null,
};

export const updateTree = (payload: TreeActionPayload): TreeAction => ({
  type: TreeActionTypes.UpdateTree,
  payload,
});

const reducer = (state: Tree = initialTreeState, action: TreeAction): Tree => {
  switch (action.type) {
    case TreeActionTypes.UpdateTree:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
