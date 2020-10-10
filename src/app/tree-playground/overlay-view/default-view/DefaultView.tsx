import React, { FunctionComponent, useContext } from 'react';

import { DeleteOutlined, DownOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

import './DefaultView.scss';
import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree } from 'datastore/collections/tree';
import {
  VISUALIZATION_ALGORITHMS_DISPLAY,
  VISUALIZATION_SPEED_DISPLAY,
} from 'helpers/visualization';

const DefaultView: FunctionComponent<any> = ({
  speedMenu,
  visualizationMenu,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const {
    visualization: { algorithm, speed },
  } = state;

  const handleClearTree = () => {
    dispatch(
      updateTree({
        data: [],
        selectedNode: null,
      })
    );
  };

  // TODO: Add visualization logic
  const handleStartVisualization = () => {
    dispatch(
      updatePlayground({
        playgroundView: PlaygroundView.Visualization,
      })
    );
  };

  return (
    <div className="overlay">
      <div className="overlay-left">
        <Dropdown.Button
          className="overlay-left-item"
          overlay={visualizationMenu}
          type="primary"
          onClick={handleStartVisualization}
        >
          {`Visualize ${VISUALIZATION_ALGORITHMS_DISPLAY[algorithm]}`}
        </Dropdown.Button>
        <Dropdown className="overlay-left-item" overlay={speedMenu}>
          <Button type="primary">
            {`Speed: ${VISUALIZATION_SPEED_DISPLAY[speed]}`} <DownOutlined />
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
          onClick={handleClearTree}
        />
      </div>
    </div>
  );
};

export default DefaultView;
