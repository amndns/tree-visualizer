import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ApartmentOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import cloneDeep from 'lodash-es/cloneDeep';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree, deleteTree } from 'datastore/collections/tree';
import {
  NodeChildIndex,
  TreeData,
} from 'datastore/collections/tree/tree.model';
import {
  createPlusNode,
  getNodeByLocation,
  hidePlusNodesByLocation,
  MAX_NODE_VALUE_CHAR_COUNT,
  ROOT_NODE_LOCATION,
} from 'helpers/tree';
import { toNumber } from 'helpers/utils';

import './NodeUpdateView.scss';

const NodeUpdateView: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);
  const { tree } = state;
  const { data, selectedNode } = tree;

  const [inputValue, setInputValue] = useState(selectedNode?.name ?? '');

  useEffect(() => {
    setInputValue(selectedNode?.name ?? '');
  }, [selectedNode]);

  const isValidNaturalNumber = (value: string): boolean => {
    const regex = /^([1-9]+\d*|0)$/;
    return (!Number.isNaN(+value) && regex.test(value)) || value === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (isValidNaturalNumber(value)) {
      setInputValue(e.target.value);
    }
  };

  const handleEditNode = () => {
    if (!selectedNode) return;

    const rootNodeClone = cloneDeep(data) as TreeData;
    const currentNode = getNodeByLocation(rootNodeClone, selectedNode.location);

    currentNode.name = inputValue.toString();
    dispatch(
      updateTree({
        data: rootNodeClone,
      })
    );
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    if (isValidNaturalNumber(value)) {
      handleEditNode();
    }
  };

  /**
   * Handle the deleting of a node and its children. The idea is
   * to retrieve both the location of the parent and node index of
   * the current node. The current node is then converted into a
   * a plus node and then hidden by using the `hidePlusNodesByLocation`
   * helper function.
   */
  const handleDeleteNode = () => {
    if (!selectedNode) return;

    // Clear the tree if the root node is being deleted
    if (selectedNode.location === ROOT_NODE_LOCATION) {
      dispatch(
        updatePlayground({
          playgroundView: PlaygroundView.Home,
        })
      );
      dispatch(deleteTree());
      return;
    }

    const parentLocation = selectedNode.location.slice(0, -1);
    const currentNodeIndex = toNumber(selectedNode.location.slice(-1));

    const rootNodeClone = cloneDeep(data) as TreeData;
    const parentNode = getNodeByLocation(rootNodeClone, parentLocation);

    if (!parentNode.children) return;

    parentNode.children[currentNodeIndex] = createPlusNode(
      parentLocation + (currentNodeIndex as NodeChildIndex)
    );
    hidePlusNodesByLocation(rootNodeClone, parentLocation);

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
  };

  /**
   * Handle the exiting of the update playground view. The idea is
   * to update the playground state and deselect the currently
   * selected node.
   */
  const handleCancel = () => {
    const rootNodeClone = cloneDeep(data) as TreeData;
    hidePlusNodesByLocation(rootNodeClone, selectedNode?.location);

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
  };

  return (
    <>
      <div className="nodeupdateview desktop">
        <div className="nodeupdateview-left">
          <Input
            className="nodeupdateview-left-input"
            addonBefore={<ApartmentOutlined />}
            bordered
            maxLength={MAX_NODE_VALUE_CHAR_COUNT}
            placeholder="Node Value"
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handlePressEnter}
          />
          <Button
            className="nodeupdateview-left-compressed-item"
            type="primary"
            disabled={inputValue === ''}
            onClick={handleEditNode}
          >
            Edit Node
          </Button>
          <Button
            className="nodeupdateview-left-compressed-item danger"
            type="primary"
            onClick={handleDeleteNode}
          >
            Delete Node
          </Button>
        </div>
        <div className="nodeupdateview-right">
          <Button
            className="nodeupdateview-right-item"
            type="primary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="nodeupdateview mobile">
        <div className="nodeupdateview-left">
          <Input
            className="nodeupdateview-left-input"
            addonBefore={<ApartmentOutlined />}
            bordered
            maxLength={MAX_NODE_VALUE_CHAR_COUNT}
            placeholder="Node Value"
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handlePressEnter}
          />
          <Button
            className="nodeupdateview-left-compressed-item"
            type="primary"
            disabled={inputValue === ''}
            onClick={handleEditNode}
          >
            Edit
          </Button>
          <Button
            className="nodeupdateview-left-compressed-item danger"
            type="primary"
            onClick={handleDeleteNode}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default NodeUpdateView;
