import { GET_PITCHERS } from './types';

const serviceUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8080/api' : 'https://mlb-lineup-optimizer-server.herokuapp.com/api';

export const getPitchers = () => async (dispatch) => {
    const data = await (await fetch(`${serviceUri}/pitchers`)).json();
    dispatch({
        type: GET_PITCHERS,
        payload: data
    });
};