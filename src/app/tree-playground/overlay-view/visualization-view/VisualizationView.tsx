import React, { FunctionComponent } from 'react';

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

const DefaultView: FunctionComponent<any> = ({ speedMenu }) => (
  <>
    <div className="overlay">
      <div className="overlay-left">
        <Button
          className="overlay-left-item"
          icon={<ReloadOutlined />}
          type="primary"
        >
          Replay Pre-Order
        </Button>
        <Dropdown className="overlay-left-item" overlay={speedMenu}>
          <Button type="primary">
            Speed: Fast <DownOutlined />
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

export default DefaultView;
