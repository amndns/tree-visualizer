/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// Instead of importing combineReducers from redux, we instead create
// a simple self-made one to save space. Downside is ugly typing.
const combineReducers = (slices: any) => (state: any, action: any): any =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

export default combineReducers;
