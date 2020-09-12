import { Tree, TreeAction, TreeActionTypes } from './tree.model';

const reducer = (state: Tree, action: TreeAction): Tree => {
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
