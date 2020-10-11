import React, { FunctionComponent, useContext } from 'react';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Tag } from 'antd';
import cloneDeep from 'lodash-es/cloneDeep';

import './VisualizationView.scss';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree } from 'datastore/collections/tree';
import { TreeData } from 'datastore/collections/tree/tree.model';
import { updateVisualization } from 'datastore/collections/visualization';
import { VisualizationStatus } from 'datastore/collections/visualization/visualization.model';
import {
  resetTreeNodeStyles,
  VISUALIZATION_ALGORITHMS_DISPLAY,
  VISUALIZATION_SPEED_DISPLAY,
} from 'helpers/visualization';

const DefaultView: FunctionComponent<any> = ({ speedMenu }) => {
  const { state, dispatch } = useContext(AppContext);
  const { tree, visualization } = state;
  const { data } = tree;
  const {
    algorithm,
    speed,
    status,
    traversalPath,
    traversalPathIndex,
  } = visualization;

  const handlePauseVisualization = () => {
    dispatch(
      updateVisualization({
        status: VisualizationStatus.Paused,
      })
    );
  };

  const handlePlayVisualization = () => {
    dispatch(
      updateVisualization({
        status: VisualizationStatus.Running,
      })
    );
  };

  const handleStopVisualization = () => {
    const rootNodeClone = cloneDeep(data) as TreeData;
    resetTreeNodeStyles(rootNodeClone);

    dispatch(
      updatePlayground({
        playgroundView: PlaygroundView.Default,
      })
    );
    dispatch(
      updateTree({
        data: rootNodeClone,
      })
    );
    dispatch(
      updateVisualization({
        status: VisualizationStatus.Idle,
        traversalPath: [],
        traversalPathIndex: 0,
      })
    );
  };

  let animationButton;

  /**
   * The animation button has three states:
   *  - Hidden button state, when the animation is done
   *  - Play button state, when the current animation is paused
   *  - Pause button state, when the current animation is ongoing
   */
  if (traversalPathIndex === traversalPath.length) {
    animationButton = null;
  } else if (status === VisualizationStatus.Paused) {
    animationButton = (
      <Button
        className="overlay-right-item"
        icon={<PlayCircleOutlined />}
        type="primary"
        onClick={handlePlayVisualization}
      >
        Play
      </Button>
    );
  } else {
    animationButton = (
      <Button
        className="overlay-right-item"
        icon={<PauseCircleOutlined />}
        type="primary"
        onClick={handlePauseVisualization}
      >
        Pause
      </Button>
    );
  }

  return (
    <>
      <div className="overlay">
        <div className="overlay-left">
          <Button
            className="overlay-left-item"
            icon={<ReloadOutlined />}
            type="primary"
          >
            {`Replay ${VISUALIZATION_ALGORITHMS_DISPLAY[algorithm]}`}
          </Button>
          <Dropdown className="overlay-left-item" overlay={speedMenu}>
            <Button type="primary">
              {`Speed: ${VISUALIZATION_SPEED_DISPLAY[speed]}`} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="overlay-right">
          {animationButton}
          <Button
            className="overlay-right-item danger"
            icon={<CloseCircleOutlined />}
            type="primary"
            onClick={handleStopVisualization}
          >
            Stop
          </Button>
        </div>
      </div>
      <div className="overlay-bottom-left">
        <Tag color="default" icon={<ClockCircleOutlined />}>
          Unvisited
        </Tag>
        <Tag color="processing" icon={<SyncOutlined />}>
          Explored
        </Tag>
        <Tag color="success" icon={<CheckCircleOutlined />}>
          Processed
        </Tag>
      </div>
    </>
  );
};

export default DefaultView;
