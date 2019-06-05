import {getAction} from '../actions/constants';
import { filter, findIndex } from 'ramda';

const dependencies = (state = [], action) => {
    if (action.type === getAction('SET_DEPENDENCIES')) {
        return  action.payload;
    }

    if (action.type === getAction('MERGE_DEPENDENCIES')) {
        const newState = [...state];
        action.payload.forEach(item => {
            const index = findIndex(dependency => 
                dependency.output === item.output,
                newState
            )
            if (index === -1) {
                newState.push(item);
            } else {
                newState[index] = item; 
            }
        });
        return newState;
    }

    if (action.type === getAction('REMOVE_DEPENDENCIES')) {
        return filter(dependency =>
            findIndex(item =>
                dependency.output === item.output,
                action.payload
            ) === -1, state)
    }

    return state;
}

export default dependencies;
