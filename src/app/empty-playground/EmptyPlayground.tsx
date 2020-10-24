import React, { FunctionComponent, useContext } from 'react';

import AppContext from 'app/context';
import { updatePlayground } from 'datastore/collections/playground';
import { PlaygroundView } from 'datastore/collections/playground/playground.model';
import { updateTree } from 'datastore/collections/tree';
import { NodeTypes } from 'datastore/collections/tree/tree.model';

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

  const handleClick = () => {
    dispatch(updateTree({ data: dummy }));
    dispatch(updatePlayground({ playgroundView: PlaygroundView.Home }));
  };

  return (
    <div>
      <div>Empty Playground</div>
      <button onClick={handleClick} type="button">
        Create New Tree
      </button>
    </div>
  );
};

export default EmptyPlayground;
