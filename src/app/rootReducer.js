import combineReducers from "./combineReducers";
// AUTH
import AuthReducer from './modules/Auth/__hooks__/reducer';
// ADMIN - REFERENCES

// COMPONENTS
import SnackbarReducer from '../_metronic/layout/components/snackbar/__hooks__/reducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  snackbar: SnackbarReducer,

});

export default rootReducer;
