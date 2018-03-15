import headerActions from '../components/header/header.action';

import api from '../api';

global.api = api;

function createAction(actionType) {
    return data => {
        let action = {type: actionType};
        if (typeof data !== 'undefined') {
            action.data = data;
        }
        return action;
    }
}

export const setStyle = createAction(headerActions.SET_STYLE);
export const toggleInfo = createAction(headerActions.TOGGLE_INFO);

