import cloneDeep from 'lodash-es/cloneDeep';

import { INITIAL_ROOT_NODE } from 'helpers/tree';
import { copyToClipboard } from 'helpers/utils';

import {
  Tree,
  TreeAction,
  TreeActionPayload,
  TreeActionTypes,
  TreeData,
} from './tree.model';
import {
  deserializeNodeCounter,
  deserializeTreeData,
  serializeNodeCounter,
  serializeTreeData,
} from './tree.transformer';

export const TREE_DATA_KEY = 'tree-visualization-data';
export const TREE_NODE_COUNTER_KEY = 'tree-node-counter';

export const initialTreeState: Tree = {
  data: cloneDeep(INITIAL_ROOT_NODE),
  selectedNode: null,
  nodeCounter: 0,
};

export const fetchTree = (): TreeAction => ({
  type: TreeActionTypes.FetchTree,
});

export const updateTree = (payload: TreeActionPayload): TreeAction => ({
  type: TreeActionTypes.UpdateTree,
  payload,
});

export const deleteTree = (): TreeAction => ({
  type: TreeActionTypes.DeleteTree,
});

export const copyLeetCodeTreeToClipboard = (treeData: TreeData): void => {
  const [, leetCodeSerializedTree] = serializeTreeData(treeData);
  copyToClipboard(leetCodeSerializedTree);
};

export const saveTreeToLocalStorage = (
  treeData: TreeData,
  nodeCounter: number
): void => {
  const [serializedTree] = serializeTreeData(treeData);
  const serializedNodeCounter = serializeNodeCounter(nodeCounter);
  localStorage.setItem(TREE_DATA_KEY, serializedTree);
  localStorage.setItem(TREE_NODE_COUNTER_KEY, serializedNodeCounter);
};

export const deleteTreeFromLocalStorage = (): void => {
  localStorage.removeItem(TREE_DATA_KEY);
  localStorage.removeItem(TREE_NODE_COUNTER_KEY);
};

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

    case TreeActionTypes.UpdateTree:
      return {
        ...state,
        ...action.payload,
      };

    case TreeActionTypes.DeleteTree: {
      deleteTreeFromLocalStorage();
      return initialTreeState;
    }

    default:
      return state;
  }
};

export default reducer;
