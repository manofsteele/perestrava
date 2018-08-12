import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import routesReducer from './routes_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  errors: errorsReducer,
});

export default rootReducer;
