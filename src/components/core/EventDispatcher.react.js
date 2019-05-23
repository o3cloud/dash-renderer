import {connect} from 'react-redux';
import {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * event polyfill for IE
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
function CustomEvent(event, params) {
    // eslint-disable-next-line no-param-reassign
    params = params || {
        bubbles: false,
        cancelable: false,
        // eslint-disable-next-line no-undefined
        detail: undefined,
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
    );
    return evt;
}
CustomEvent.prototype = window.Event.prototype;

const EventsConstants = {
    redirect: 'redirect',
    call: 'call',
}

/**
 * EventHandler allows you send event to front-end to trriger
 */
class EventDispatcher extends Component {
    constructor(props) {
        super(props);
        this.dispatchEvent = this.dispatchEvent.bind(this);
        this.dispatchEvent(this.props.events);
        this.prevEvents = [];
    }

    dispatchEvent(events) {
        while(events.length > 0) {
            const { type, params } = events.pop();
            this.props.dispatch({
                type: 'SET_EVENTS',
                payload: events,
            });
            switch(type) {
                case EventsConstants.redirect:
                    if (params.external) {
                        window.location.href = params.url;
                    } else {
                        window.history.pushState({}, '', params.url);
                        window.dispatchEvent(new CustomEvent('onpushstate'));
                    }
                    break
                case EventsConstants.call:
                    window.customFunctions[params.functionName](params.functionParams);
                    break
                default:
            }
        }
    }

    componentWillReceiveProps(props) {
        const newEvents = props.events.filter(
            ({ uid }) => this.prevEvents.length === 0 || this.prevEvents.filter(({uidIn}) => uidIn !== uid).length > 0
        );
        this.prevEvents = [...newEvents];
        if (newEvents.length > 0) {
            this.dispatchEvent(newEvents);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return null;
    }
}

EventDispatcher.propTypes = {
    events: PropTypes.array.isRequired,
    dispatch: PropTypes.func,
};

export default connect(
    state => ({
        events: state.events,
    }),
    dispatch => ({dispatch})
)(EventDispatcher);
