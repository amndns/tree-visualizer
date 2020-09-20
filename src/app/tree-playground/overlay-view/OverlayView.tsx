import React, { FunctionComponent } from 'react';

import { ApartmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { PlaygroundState } from 'datastore/collections/tree/tree.model';

import DefaultView from './default-view/DefaultView';
import NodeUpdateView from './node-update-view/NodeUpdateView';
import TutorialView from './tutorial-view/TutorialView';
import VisualizationView from './visualization-view/VisualizationView';

const OverlayView: FunctionComponent<any> = ({ playgroundState }) => {
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

  let overlayViewComponent;

  switch (playgroundState) {
    case PlaygroundState.DefaultView:
      overlayViewComponent = (
        <DefaultView
          speedMenu={speedMenu}
          visualizationMenu={visualizationMenu}
        />
      );
      break;

    case PlaygroundState.NodeUpdateView:
      overlayViewComponent = <NodeUpdateView />;
      break;

    case PlaygroundState.VisualizationView:
      overlayViewComponent = <VisualizationView speedMenu={speedMenu} />;
      break;

    default:
      throw new Error('[TreePlayground] Invalid `NodeClickAction` type.');
  }

  return (
    <>
      {overlayViewComponent}
      <TutorialView />
    </>
  );
};

export default OverlayView;
