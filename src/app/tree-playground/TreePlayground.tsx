import React, { FunctionComponent, useContext, useEffect } from 'react';

import cloneDeep from 'lodash-es/cloneDeep';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree } from 'datastore/collections/tree';
import {
  UnionedTreeData,
  TreeData,
} from 'datastore/collections/tree/tree.model';
import { updateVisualization } from 'datastore/collections/visualization';
import {
  TraversalActions,
  VisualizationStatus,
} from 'datastore/collections/visualization/visualization.model';
import './TreePlayground.scss';
import {
  NodeClickActions,
  convertNodeToRegular,
  getNodeByLocation,
  getNodeClickAction,
  showPlusNodeChildren,
  hidePlusNodesByLocation,
  selectNode,
} from 'helpers/tree';
import {
  shouldInitializeAnimation,
  VISUALIZATION_SPEED_MAPPING,
  visualizeNode,
} from 'helpers/visualization';

import OverlayView from './overlay-view/OverlayView';
import TreeView from './tree-view/TreeView';

const TreePlayground: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const { playground, tree, visualization } = state;
  const { playgroundView } = playground;
  const { data, selectedNode } = tree;
  const { speed, status, traversalPath, traversalPathIndex } = visualization;

  /**
   * Handles the main logic for the visualization animation. The idea
   * is to use the `useEffect` hook to animate the traversal path of
   * the algorithm being visualized. For every render of the page,
   * when the visualization state is valid for animation, a timeout
   * action is set that will update the styling of a node, thus,
   * indicating that the node has either been explored or processed.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shouldInitializeAnimation(visualization)) {
        return;
      }

      const { location, action } = traversalPath[traversalPathIndex];

      const rootNodeClone = cloneDeep(data) as TreeData;
      const currentNode = getNodeByLocation(rootNodeClone, location);

      visualizeNode(currentNode, action as TraversalActions);

      dispatch(
        updateTree({
          data: rootNodeClone,
        })
      );
      dispatch(
        updateVisualization({
          traversalPathIndex: traversalPathIndex + 1,
        })
      );
    }, VISUALIZATION_SPEED_MAPPING[speed]);

    if (!shouldInitializeAnimation(visualization)) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [
    dispatch,
    tree,
    data,
    visualization,
    speed,
    status,
    traversalPath,
    traversalPathIndex,
  ]);

  /**
   * Handles the click action of a node. If a visualization animation
   * is ongoing, the nodes shouldn't be clickable at all. The click
   * action depends on the state of the currently selected node. Once
   * the state is retrieved, one of the following actions is executed:
   *  - Add a new node
   *  - Show the hidden plus node/s
   *  - Hide the plus node/s and
   *    - Select the current node, or
   *    - Deselect the current node
   */
  const handleClickNode = (node: UnionedTreeData) => {
    if (status !== VisualizationStatus.Idle) return;

    const targetNode = node as TreeData;
    const rootNodeClone = cloneDeep(data) as TreeData;
    const currentNode = getNodeByLocation(rootNodeClone, targetNode.location);

    switch (getNodeClickAction(node as TreeData)) {
      case NodeClickActions.AddNewNode:
        convertNodeToRegular(currentNode);
        dispatch(
          updateTree({
            data: rootNodeClone,
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
              playgroundView: PlaygroundView.Home,
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

// TODO:
// [/] Add the other algorithms
// [] Add serialization and deserialization
// [] Add tutorial modal
// [] Add empty playground styling
// [] Add auto-counter for node names
// [] Finalize styling
//    [] Fix scrolling issue
//    [] Change the node styling color
//    [] Change the tag styling color
//    [] Other misc

// OPTIONAL:
// [] Optimize traversal algorithms (e.g. queue, reverse())
