import { Tree, TreeAction, TreeActionTypes } from './tree.model';

const reducer = (state: Tree, action: TreeAction): Tree => {
  switch (action.type) {
    case TreeActionTypes.UpdateData:
      return { ...state, data: action.payload.data ?? [] };
    case TreeActionTypes.UpdateSelectedNodeLoc:
      return {
        ...state,
        selectedNodeLoc: action.payload.selectedNodeLoc ?? null,
      };
    default:
      return state;
  }
};

export default reducer;
