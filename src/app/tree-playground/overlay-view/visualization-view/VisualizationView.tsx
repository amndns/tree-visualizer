import React, { FunctionComponent, useContext } from 'react';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Tag } from 'antd';

import './VisualizationView.scss';
import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import {
  VISUALIZATION_ALGORITHMS_DISPLAY,
  VISUALIZATION_SPEED_DISPLAY,
} from 'helpers/visualization';

const DefaultView: FunctionComponent<any> = ({ speedMenu }) => {
  const { state, dispatch } = useContext(AppContext);
  const {
    visualization: { algorithm, speed },
  } = state;

  // TODO: Clear all selections
  const handleStopVisualization = () => {
    dispatch(
      updatePlayground({
        playgroundView: PlaygroundView.Default,
      })
    );
  };

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
          <Button
            className="overlay-right-item"
            icon={<PauseCircleOutlined />}
            type="primary"
          >
            Pause
          </Button>
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
