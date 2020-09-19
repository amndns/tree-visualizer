import React from 'react';

import initialState, { RootState } from 'datastore/store';

const AppContext = React.createContext<{
  state: RootState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;
