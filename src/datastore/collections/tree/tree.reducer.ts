import {
  Tree,
  TreeAction,
  TreeActionPayload,
  TreeActionTypes,
} from './tree.model';
import { deserializeTreeData } from './tree.transformer';

const TREE_DATA_KEY = 'tree-visualization-data';

export const initialTreeState: Tree = {
  data: [],
  selectedNode: null,
};

export const fetchTree = (): TreeAction => ({
  type: TreeActionTypes.FetchTree,
});

export const saveTree = (): TreeAction => ({
  type: TreeActionTypes.SaveTree,
});

export const updateTree = (payload: TreeActionPayload): TreeAction => ({
  type: TreeActionTypes.UpdateTree,
  payload,
});

const reducer = (state: Tree = initialTreeState, action: TreeAction): Tree => {
  switch (action.type) {
    case TreeActionTypes.FetchTree:
      return {
        ...state,
        data: deserializeTreeData(localStorage.getItem(TREE_DATA_KEY)),
      };

    case TreeActionTypes.SaveTree: {
      localStorage.setItem(TREE_DATA_KEY, 'state.data');
      return state;
    }

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
