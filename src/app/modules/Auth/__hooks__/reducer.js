// import _ from 'lodash';
import { authTypes } from './types';

const reducer = (state, action) => {
    // console.log('state',state,'action',action);
    switch (action.type) {
        case authTypes.LOGIN:
            return { ...state, isUserVerified: true, data: action.data, loginType: action.loginType };
        case authTypes.LOGOUT:
            return { ...state, isUserVerified: false, data: [], loginType: 'L' };
        default:
            return state;
    }
}

export default reducer;