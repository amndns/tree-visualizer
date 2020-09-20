import React, { FunctionComponent } from 'react';

import { DeleteOutlined, DownOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

import './DefaultView.scss';

const DefaultView: FunctionComponent<any> = ({
  speedMenu,
  visualizationMenu,
}) => (
  <div className="overlay">
    <div className="overlay-left">
      <Dropdown.Button
        className="overlay-left-item"
        overlay={visualizationMenu}
        type="primary"
      >
        Visualize Pre-Order
      </Dropdown.Button>
      <Dropdown className="overlay-left-item" overlay={speedMenu}>
        <Button type="primary">
          Speed: Fast <DownOutlined />
        </Button>
      </Dropdown>
    </div>
    <div className="overlay-right">
      <Button
        className="overlay-right-item"
        icon={<SaveOutlined />}
        shape="circle"
        size="large"
        type="primary"
      />
      <Button
        className="overlay-right-item danger"
        icon={<DeleteOutlined />}
        shape="circle"
        size="large"
        type="primary"
      />
    </div>
  </div>
);

export default DefaultView;
