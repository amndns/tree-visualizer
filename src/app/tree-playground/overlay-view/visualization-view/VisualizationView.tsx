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
  const {
    tree: { data },
    visualization: {
      algorithm,
      speed,
      status,
      traversalPath,
      traversalPathIndex,
    },
  } = state;

  /**
   * Handles the replay action during and after the animation.
   */
  const handleReplayVisualization = () => {
    const rootNodeClone = cloneDeep(data) as TreeData;
    resetTreeNodeStyles(rootNodeClone);

    dispatch(
      updateTree({
        data: rootNodeClone,
      })
    );
    dispatch(
      updateVisualization({
        status: VisualizationStatus.Running,
        traversalPathIndex: 0,
      })
    );
  };

  /**
   * Handles the pause action during the animation. The
   * assumption is that the animation must be running before
   * this action can be triggered.
   */
  const handlePauseVisualization = () => {
    if (status !== VisualizationStatus.Running) return;

    dispatch(
      updateVisualization({
        status: VisualizationStatus.Paused,
      })
    );
  };

  /**
   * Handles the play action during the animation. The
   * assumption is that the animation must be paused before
   * this action can be triggered.
   */
  const handlePlayVisualization = () => {
    if (status !== VisualizationStatus.Paused) return;

    dispatch(
      updateVisualization({
        status: VisualizationStatus.Running,
      })
    );
  };

  /**
   * Handles the stop action during and after the animation.
   * This action simply exits the visualization view of the
   * application and resets the tree node styling.
   */
  const handleStopVisualization = () => {
    const rootNodeClone = cloneDeep(data) as TreeData;
    resetTreeNodeStyles(rootNodeClone);

    dispatch(
      updatePlayground({
        playgroundView: PlaygroundView.Home,
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
            onClick={handleReplayVisualization}
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
