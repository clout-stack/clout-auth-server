/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the applicationReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/ApplicationConstants';
import auth from '../utils/auth';

// The initial application state
const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: auth.isLocallyLoggedIn(),
    errorMessage: ''
};

// Takes care of changing the application state
export function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return assign({}, state, {
                formState: action.newState
            });
            break;
        case SET_AUTH:
            return assign({}, state, {
                loggedIn: action.newState
            });
            break;
        case SENDING_REQUEST:
            return assign({}, state, {
                currentlySending: action.sending
            });
            break;
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
