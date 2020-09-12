import React, { FunctionComponent, useMemo, useReducer } from 'react';
import initialRootState from 'datastore/store';
import rootReducer from 'datastore/reducer';
import AppContext from './context';
import EmptyPlayground from './empty-playground/EmptyPlayground';
import TreePlayground from './tree-playground/TreePlayground';

const App: FunctionComponent = () => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);
  const { tree } = state;

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={{ ...contextValue }}>
      {tree.data.length === 0 ? <EmptyPlayground /> : <TreePlayground />}
    </AppContext.Provider>
  );
};

export default App;
