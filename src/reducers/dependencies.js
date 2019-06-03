import {getAction} from '../actions/constants';

const dependencies = (state = [], action) => {
    if (action.type === getAction('SET_DEPENDENCIES')) {
        return  action.payload;
    }

    return state;
}

export default dependencies;
