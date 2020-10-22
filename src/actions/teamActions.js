import { GET_TEAMS } from './types';

const serviceUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8080/api' : 'https://mlb-lineup-optimizer-server.herokuapp.com/api';

export const getTeams = () => async (dispatch) => {
    const data = await (await fetch(`${serviceUri}/teams`)).json();
    dispatch({
        type: GET_TEAMS,
        payload: data
    });
};