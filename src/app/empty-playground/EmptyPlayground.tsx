import React, { FunctionComponent, useContext } from 'react';

import { Empty } from 'antd';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree } from 'datastore/collections/tree';
import { NodeTypes } from 'datastore/collections/tree/tree.model';

import './EmptyPlayground.scss';

const EmptyPlayground: FunctionComponent = () => {
  const dummy = {
    name: '0',
    location: '',
    type: NodeTypes.Regular,
    nodeSvgShape: {
      shape: 'circle',
      shapeProps: {
        r: 30,
        fill: '#FFFFFF',
      },
    },
  };

  const { dispatch } = useContext(AppContext);

  const handleCreateTree = () => {
    dispatch(updateTree({ data: dummy }));
    dispatch(updatePlayground({ playgroundView: PlaygroundView.Home }));
  };

  return (
    <div className="empty-playground">
      <button
        className="empty-playground-button"
        type="button"
        onClick={handleCreateTree}
      >
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 135,
          }}
          description={
            <span className="empty-playground-description">
              Click to add root node.
            </span>
          }
        />
      </button>
    </div>
  );
};

export default EmptyPlayground;
