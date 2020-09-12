import React, { FunctionComponent, useContext } from 'react';
import { updateTree } from 'datastore/collections/tree';
import { NodeTypes } from 'datastore/collections/tree/tree.model';
import AppContext from '../context';

const EmptyPlayground: FunctionComponent = () => {
  const dummy = {
    name: '1A',
    location: '',
    type: NodeTypes.Node,
    children: [
      {
        name: '2A',
        location: '0',
        type: NodeTypes.Node,
      },
      {
        name: '4A',
        location: '1',
        type: NodeTypes.Node,
        children: [
          {
            name: '',
            location: '01',
            type: NodeTypes.Plus,
            nodeSvgShape: {
              shape: 'circle',
              shapeProps: {
                r: 20,
                strokeWidth: 1,
                fill: 'transparent',
                visibility: 'hidden',
              },
            },
          },
          {
            name: '6A',
            location: '11',
            type: NodeTypes.Node,
          },
        ],
      },
    ],
  };

  const { dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch(updateTree({ data: dummy }));
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
