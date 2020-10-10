import { playgroundReducer } from './collections/playground';
import { treeReducer } from './collections/tree';
import { visualizationReducer } from './collections/visualization';
import combineReducers from './combineReducers';

const rootReducer = combineReducers({
  playground: playgroundReducer,
  tree: treeReducer,
  visualization: visualizationReducer,
});

export default rootReducer;
