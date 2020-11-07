import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import AppContext from 'app/context';
import { fetchTree } from 'datastore/collections/tree';
import rootReducer from 'datastore/reducer';
import initialRootState from 'datastore/store';

import './App.scss';
import TreePlayground from './tree-playground/TreePlayground';

const App: FunctionComponent = () => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  useEffect(() => {
    dispatch(fetchTree());
  }, []);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={{ ...contextValue }}>
      <TreePlayground />
    </AppContext.Provider>
  );
};

export default App;
