import { combineReducers } from 'redux';
import batterReducer from './batterReducer';
import pitcherReducer from './pitcherReducer';
import teamReducer from './teamReducer';

export default combineReducers({
    batters: batterReducer,
    pitchers: pitcherReducer,
    teams: teamReducer
});