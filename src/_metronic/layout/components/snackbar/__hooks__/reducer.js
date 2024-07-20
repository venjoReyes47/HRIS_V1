import { componentTypes } from './types';

const reducer = (state, action) => {
    // console.log('state',state,'action',action);
    switch (action.type) {
        case componentTypes.HIDE_SNACKBAR:
            return { ...state, hasMessage: false, snackBarStatus: '', snackBarDuration: 5000, snackBarMessage: '' };
        case componentTypes.SHOW_SNACKBAR:
            return { ...state, hasMessage: true, snackBarStatus: action.snackBarStatus, snackBarDuration: action.snackBarDuration, snackBarMessage: action.snackBarMessage };
        default:
            return state;
    }
}

export default reducer;