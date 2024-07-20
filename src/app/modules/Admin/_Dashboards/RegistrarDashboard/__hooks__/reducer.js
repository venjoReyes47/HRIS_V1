import _ from 'lodash';
import { admissionsTypes } from './types';

const reducer = (state, action) => {

    switch (action.type) {
        case admissionsTypes.SELECTED_STUDENT_INFO:
            return { ...state, data: action.data };
        case admissionsTypes.CREATE:
            return { ...state, data: { ...state.data, [action.data.StudentInfoId]: action.data } };
        case admissionsTypes.GET_STUDENT_INFO:
            return {
                ...state
                , data: { ..._.mapKeys(action.data, 'UserRoleId') }
                , keyword: action.keyword === undefined ? state.keyword : action.keyword
                , page: action.page === undefined ? state.page : action.page
                , rowsPerPage: action.rowsPerPage === undefined ? state.rowsPerPage : action.rowsPerPage
            };
        case admissionsTypes.UPDATE:
            return { ...state, data: { ...state.data, [action.data.StudentInfoId]: action.data }, id: action.id }
        case admissionsTypes.DELETE:
            return { ...state, data: { ..._.omit(state.data, action.data) } };

        default:
            return state;
    }
}

export default reducer;