import React, { FunctionComponent, useContext } from 'react';

import { CopyOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, notification } from 'antd';

import './HomeView.scss';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import {
  deleteTree,
  copyLeetCodeTreeToClipboard,
} from 'datastore/collections/tree';
import { TreeData } from 'datastore/collections/tree/tree.model';
import { updateVisualization } from 'datastore/collections/visualization';
import { VisualizationStatus } from 'datastore/collections/visualization/visualization.model';
import {
  generateTraversalPath,
  VISUALIZATION_ALGORITHMS_DISPLAY,
  VISUALIZATION_SPEED_DISPLAY,
} from 'helpers/visualization';

interface HomeViewProps {
  speedMenu: JSX.Element;
  visualizationMenu: JSX.Element;
}

const NOTIFICATION_PLACEMENT = 'bottomLeft';
const NOTIFICATION_DURATION = 5; // in seconds

const HomeView: FunctionComponent<HomeViewProps> = ({
  speedMenu,
  visualizationMenu,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const {
    tree: { data },
    visualization: { algorithm, speed },
  } = state;

  const openNotification = (): void => {
    notification.success({
      message: `Successfully Copied!`,
      description: `The LeetCode array version of the tree has been copied to your clipboard.`,
      duration: NOTIFICATION_DURATION,
      placement: NOTIFICATION_PLACEMENT,
    });
  };

  const handleClearTree = () => {
    dispatch(deleteTree());
  };

  const handleCopyTree = () => {
    copyLeetCodeTreeToClipboard(data);
    openNotification();
  };

  const handleStartVisualization = () => {
    dispatch(
      updatePlayground({
        playgroundView: PlaygroundView.Visualization,
      })
    );
    dispatch(
      updateVisualization({
        status: VisualizationStatus.Running,
        traversalPath: generateTraversalPath(data as TreeData, algorithm),
        traversalPathIndex: 0,
      })
    );
  };

  return (
    <>
      <div className="homeview desktop">
        <div className="homeview-left">
          <Dropdown.Button
            className="homeview-left-item"
            overlay={visualizationMenu}
            type="primary"
            onClick={handleStartVisualization}
          >
            {`Visualize ${VISUALIZATION_ALGORITHMS_DISPLAY[algorithm]}`}
          </Dropdown.Button>
          <Dropdown className="homeview-left-item" overlay={speedMenu}>
            <Button type="primary">
              {`Speed: ${VISUALIZATION_SPEED_DISPLAY[speed]}`} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="homeview-right">
          <Button
            className="homeview-right-item"
            icon={<CopyOutlined />}
            shape="circle"
            size="large"
            type="primary"
            onClick={handleCopyTree}
          />
          <Button
            className="homeview-right-item danger"
            icon={<DeleteOutlined />}
            shape="circle"
            size="large"
            type="primary"
            onClick={handleClearTree}
          />
        </div>
      </div>
      <div className="homeview mobile">
        <div className="homeview-left">
          <Dropdown.Button
            className="homeview-left-item"
            overlay={visualizationMenu}
            type="primary"
            onClick={handleStartVisualization}
          >
            {VISUALIZATION_ALGORITHMS_DISPLAY[algorithm]}
          </Dropdown.Button>
        </div>
        <div className="homeview-right">
          <Button
            className="homeview-right-item"
            icon={<CopyOutlined />}
            shape="circle"
            size="middle"
            type="primary"
            onClick={handleCopyTree}
          />
          <Button
            className="homeview-right-item danger"
            icon={<DeleteOutlined />}
            shape="circle"
            size="middle"
            type="primary"
            onClick={handleClearTree}
          />
        </div>
      </div>
    </>
  );
};

export default HomeView;
