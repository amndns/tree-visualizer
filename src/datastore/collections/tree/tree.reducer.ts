import { copyToClipboard } from 'helpers/utils';

import {
  Tree,
  TreeAction,
  TreeActionPayload,
  TreeActionTypes,
} from './tree.model';
import {
  deserializeNodeCounter,
  deserializeTreeData,
  serializeNodeCounter,
  serializeTreeData,
} from './tree.transformer';

const TREE_DATA_KEY = 'tree-visualization-data';
const TREE_NODE_COUNTER_KEY = 'tree-node-counter';

export const initialTreeState: Tree = {
  data: [],
  selectedNode: null,
  nodeCounter: 0,
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

export const deleteTree = (): TreeAction => ({
  type: TreeActionTypes.DeleteTree,
});

const reducer = (state: Tree = initialTreeState, action: TreeAction): Tree => {
  switch (action.type) {
    case TreeActionTypes.FetchTree:
      return {
        ...state,
        data: deserializeTreeData(localStorage.getItem(TREE_DATA_KEY)),
        nodeCounter: deserializeNodeCounter(
          localStorage.getItem(TREE_NODE_COUNTER_KEY)
        ),
      };

    case TreeActionTypes.SaveTree: {
      const [serializedTree, leetcodeTree] = serializeTreeData(state.data);
      const serializedNodeCounter = serializeNodeCounter(state.nodeCounter);
      localStorage.setItem(TREE_DATA_KEY, serializedTree);
      localStorage.setItem(TREE_NODE_COUNTER_KEY, serializedNodeCounter);
      copyToClipboard(leetcodeTree);
      return state;
    }

    case TreeActionTypes.UpdateTree:
      return {
        ...state,
        ...action.payload,
      };

    case TreeActionTypes.DeleteTree: {
      localStorage.removeItem(TREE_DATA_KEY);
      return initialTreeState;
    }

    default:
      return state;
  }
};

export default reducer;
