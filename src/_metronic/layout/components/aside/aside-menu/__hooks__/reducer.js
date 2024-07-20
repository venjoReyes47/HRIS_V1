import _ from 'lodash';
import { menuTypes } from './types';

const reducer = (state, action) => {
    // console.log('state',state,'action',action);
    switch (action.type) {
        case menuTypes.CREATE:
            return { ...state, data: { ...state.data, [action.data.MenuId]: action.data } };
        case menuTypes.GET_MENUS:
            return { ...state, data: { ..._.mapKeys(action.data, 'MenuId') } };
        case menuTypes.GET_PARENT_MENUS:
            return { ...state, data: { ...state.data, [action.data.MenuId]: action.data } };
        case menuTypes.GET_CHILD_MENUS:
            return { ...state, data: { ..._.mapKeys(action.data, 'MenuId') } };
        case menuTypes.UPDATE:
            return { ...state, data: { ...state.data, [action.data.MenuId]: action.data } }
        case menuTypes.DELETE:
            return { ...state, data: { ..._.omit(state.data, action.data) } };
        default:
            return state;
    }
}

export default reducer;