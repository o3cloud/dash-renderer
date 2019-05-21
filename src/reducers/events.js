import {getAction} from '../actions/constants';

const events = (state = [], action) => {
    if (action.type === getAction('SET_EVENTS')) {
        return  action.payload;
    }

    return state;
}

export default events;
