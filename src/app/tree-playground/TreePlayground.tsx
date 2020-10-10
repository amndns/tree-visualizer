import React, { FunctionComponent, useContext } from 'react';

import cloneDeep from 'lodash-es/cloneDeep';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
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

import './TreePlayground.scss';
import OverlayView from './overlay-view/OverlayView';
import TreeView from './tree-view/TreeView';

const TreePlayground: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const {
    playground: { playgroundView },
    tree: { data, selectedNode },
  } = state;

  /**
   * Handle the click action of a node. The click action depends on
   * the state of the currently selected node. Once the state is
   * retrieved, one of the following actions is executed:
   *  - Add a new node
   *  - Show the hidden plus node/s
   *  - Hide the plus node/s and
   *    - Select the current node, or
   *    - Deselect the current node
   */
  const handleClickNode = (node: UnionedTreeData) => {
    const targetNode = node as TreeData;
    const rootNodeClone = cloneDeep(data) as TreeData;
    const currentNode = getNodeByLocation(rootNodeClone, targetNode.location);

    switch (getNodeClickAction(node as TreeData)) {
      case NodeClickActions.AddNewNode:
        createRegularNode(currentNode);
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNode,
          })
        );
        break;

      case NodeClickActions.ShowPlusNodes:
        showPlusNodeChildren(currentNode);
        if (selectedNode?.location !== targetNode.location) {
          hidePlusNodesByLocation(rootNodeClone, selectedNode?.location);
        }
        dispatch(
          updatePlayground({
            playgroundView: PlaygroundView.NodeUpdate,
          })
        );
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNode: {
              name: currentNode.name,
              location: currentNode.location,
            },
          })
        );
        break;

      case NodeClickActions.HidePlusNodes:
        hidePlusNodesByLocation(rootNodeClone, selectedNode?.location);

        // Deselect the currently selected node
        if (selectedNode?.location === targetNode.location) {
          dispatch(
            updatePlayground({
              playgroundView: PlaygroundView.Default,
            })
          );
          dispatch(
            updateTree({
              data: rootNodeClone,
              selectedNode: null,
            })
          );
          break;
        }

        // Select the currently unselected node
        selectNode(currentNode);
        dispatch(
          updatePlayground({
            playgroundView: PlaygroundView.NodeUpdate,
          })
        );
        dispatch(
          updateTree({
            data: rootNodeClone,
            selectedNode: {
              name: currentNode.name,
              location: currentNode.location,
            },
          })
        );
        break;

      default:
        throw new Error('[TreePlayground] Invalid `NodeClickAction` type.');
    }
  };

  return (
    <div className="playground">
      <OverlayView playgroundView={playgroundView} />
      <TreeView data={state.tree.data} onClick={handleClickNode} />
    </div>
  );
};

export default TreePlayground;
