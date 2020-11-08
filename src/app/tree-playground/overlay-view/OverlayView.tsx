import React, { FunctionComponent, useContext } from 'react';

import { ApartmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import AppContext from 'app/context';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateVisualization } from 'datastore/collections/visualization';
import {
  VisualizationAlgorithms,
  VisualizationSpeed,
} from 'datastore/collections/visualization/visualization.model';

import HomeView from './home-view/HomeView';
import NodeUpdateView from './node-update-view/NodeUpdateView';
import TutorialView from './tutorial-view/TutorialView';
import VisualizationView from './visualization-view/VisualizationView';

interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

interface OverlayViewProps {
  playgroundView: string;
}

const OverlayView: FunctionComponent<OverlayViewProps> = ({
  playgroundView,
}) => {
  const { dispatch } = useContext(AppContext);

  /**
   * Handles the changing of the visualization speed.
   */
  const handleSpeedMenuItemClick = ({ key }: MenuInfo) => {
    dispatch(
      updateVisualization({
        speed: key as VisualizationSpeed,
      })
    );
  };

  /**
   * Handles the changing of the visualization algorithm.
   */
  const handleVisualizationMenuItemClick = ({ key }: MenuInfo) => {
    dispatch(
      updateVisualization({
        algorithm: key as VisualizationAlgorithms,
      })
    );
  };

  const speedMenu = (
    <Menu onClick={handleSpeedMenuItemClick}>
      <Menu.Item key={VisualizationSpeed.Fast} icon={<ThunderboltOutlined />}>
        Fast
      </Menu.Item>
      <Menu.Item
        key={VisualizationSpeed.Average}
        icon={<ThunderboltOutlined />}
      >
        Average
      </Menu.Item>
      <Menu.Item key={VisualizationSpeed.Slow} icon={<ThunderboltOutlined />}>
        Slow
      </Menu.Item>
    </Menu>
  );

  const visualizationMenu = (
    <Menu onClick={handleVisualizationMenuItemClick}>
      <Menu.Item
        key={VisualizationAlgorithms.PreOrder}
        icon={<ApartmentOutlined />}
      >
        Visualize Pre-Order
      </Menu.Item>
      <Menu.Item
        key={VisualizationAlgorithms.InOrder}
        icon={<ApartmentOutlined />}
      >
        Visualize In-Order
      </Menu.Item>
      <Menu.Item
        key={VisualizationAlgorithms.PostOrder}
        icon={<ApartmentOutlined />}
      >
        Visualize Post-Order
      </Menu.Item>
      <Menu.Item
        key={VisualizationAlgorithms.LevelOrder}
        icon={<ApartmentOutlined />}
      >
        Visualize Level-Order
      </Menu.Item>
    </Menu>
  );

  let overlayViewComponent;

  switch (playgroundView) {
    case PlaygroundView.Home:
      overlayViewComponent = (
        <HomeView speedMenu={speedMenu} visualizationMenu={visualizationMenu} />
      );
      break;

    case PlaygroundView.NodeUpdate:
      overlayViewComponent = <NodeUpdateView />;
      break;

    case PlaygroundView.Visualization:
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
