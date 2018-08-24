import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import leagueProfile from './modules/leagueProfile';
import teamProfile from './modules/teamProfile';
import athleteProfile from './modules/athleteProfile';
import explore from './modules/explore';
import leagueManage from './modules/leagueManage';
import stats from './modules/stats';
import division from './modules/division';
import notification from './modules/notification';
import teamManage from './modules/teamManage';
import authPrivate  from './modules/authPrivate';
import teamRequestPosition  from './modules/teamRequestPosition';
import contact  from './modules/contact';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form: formReducer,
  auth,
  leagueProfile,
  teamProfile,
  athleteProfile,
  explore,
  leagueManage,
  stats,
  division,
  notification,
  teamManage,
  authPrivate,
  teamRequestPosition,
  contact,
});
