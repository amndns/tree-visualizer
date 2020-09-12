import React, { FunctionComponent, useContext } from 'react';
import AppContext from '../context';
import TreeView from './tree-view/TreeView';

const TreePlayground: FunctionComponent = () => {
  const { state } = useContext(AppContext);

  return <TreeView data={state.tree.data} />;
};

export default TreePlayground;
