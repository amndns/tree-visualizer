import React, { FunctionComponent, useContext } from 'react';
import cloneDeep from 'lodash-es/cloneDeep';
import { updateTree } from 'datastore/collections/tree';
import {
  UnionedTreeData,
  TreeData,
} from 'datastore/collections/tree/tree.model';
import {
  NodeClickActions,
  createRegularNode,
  getNodeByLocation,
  getNodeClickAction,
  showPlusNodeChildren,
  hidePlusNodesByLocation,
  selectNode,
} from 'helpers/tree';
import AppContext from '../context';
import TreeView from './tree-view/TreeView';

const TreePlayground: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    tree: { data, selectedNodeLoc },
  } = state;

  const handleClick = (node: UnionedTreeData) => {
    const targetNode = node as TreeData;
    const rootNodeClone = cloneDeep(data) as TreeData;
    const currentNode = getNodeByLocation(rootNodeClone, targetNode.location);

    switch (getNodeClickAction(node as TreeData)) {
      case NodeClickActions.AddNewNode:
        createRegularNode(currentNode);
        hidePlusNodesByLocation(rootNodeClone, selectedNodeLoc ?? null);
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNodeLoc: currentNode.location,
          })
        );
        break;

      case NodeClickActions.ShowPlusNodes:
        showPlusNodeChildren(currentNode);
        if (selectedNodeLoc !== targetNode.location) {
          hidePlusNodesByLocation(rootNodeClone, selectedNodeLoc ?? null);
        }
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNodeLoc: currentNode.location,
          })
        );
        break;

      case NodeClickActions.HidePlusNodes:
        hidePlusNodesByLocation(rootNodeClone, selectedNodeLoc ?? null);

        if (selectedNodeLoc === targetNode.location) {
          dispatch(
            updateTree({
              data: rootNodeClone,
              selectedNodeLoc: null,
            })
          );
          break;
        }

        selectNode(currentNode);
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNodeLoc: currentNode.location,
          })
        );
        break;

      default:
        throw new Error('[TreePlayground] Invalid `NodeClickAction` type.');
    }
  };

  return <TreeView data={state.tree.data} onClick={handleClick} />;
};

export default TreePlayground;
