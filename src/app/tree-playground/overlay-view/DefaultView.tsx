import React, { FunctionComponent } from 'react';

import {
  ApartmentOutlined,
  DeleteOutlined,
  DownOutlined,
  SaveOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import './DefaultView.scss';

const DefaultView: FunctionComponent = () => {
  const visualizationMenu = (
    <Menu>
      <Menu.Item key="1" icon={<ApartmentOutlined />}>
        Visualize Pre-Order
      </Menu.Item>
      <Menu.Item key="2" icon={<ApartmentOutlined />}>
        Visualize In-Order
      </Menu.Item>
      <Menu.Item key="3" icon={<ApartmentOutlined />}>
        Visualize Post-Order
      </Menu.Item>
      <Menu.Item key="4" icon={<ApartmentOutlined />}>
        Visualize Level-Order
      </Menu.Item>
    </Menu>
  );

  const speedMenu = (
    <Menu>
      <Menu.Item key="1" icon={<ThunderboltOutlined />}>
        Fast
      </Menu.Item>
      <Menu.Item key="2" icon={<ThunderboltOutlined />}>
        Average
      </Menu.Item>
      <Menu.Item key="3" icon={<ThunderboltOutlined />}>
        Slow
      </Menu.Item>
    </Menu>
  );

  return (
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
          type="primary"
          shape="circle"
          icon={<SaveOutlined />}
          size="large"
        />
        <Button
          className="overlay-right-item danger"
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default DefaultView;
