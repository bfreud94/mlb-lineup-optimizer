import { GET_BATTERS } from './types';

const serviceUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8080/api' : 'https://mlb-lineup-optimizer-server.herokuapp.com/api';

export const getBatters = () => async (dispatch) => {
    const data = await (await fetch(`${serviceUri}/batters`)).json();
    dispatch({
        type: GET_BATTERS,
        payload: data
    });
};