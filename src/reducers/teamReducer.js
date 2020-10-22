import { GET_TEAMS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TEAMS:
            return action.payload;
        default:
            return state;
    }
};