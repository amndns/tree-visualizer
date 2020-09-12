import combineReducers from './helpers';
import { treeReducer } from './collections/tree';
import { visualizationReducer } from './collections/visualization';

const rootReducer = combineReducers({
  tree: treeReducer,
  visualization: visualizationReducer,
});

export default rootReducer;
