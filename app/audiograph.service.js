"use strict";
exports.INCREMENT = 'INCREMENT';
exports.DECREMENT = 'DECREMENT';
exports.TOGGLE_MENU = 'TOGGLE_MENU';
exports.RESET = 'RESET';
function counterReducer(state, action) {
    var changeState = function () {
        return Object.assign({}, state, action.payload);
    };
    console.log(state);
    switch (action.type) {
        case exports.TOGGLE_MENU:
            if (typeof action.payload === 'undefined') {
                action.payload = { menuOpen: !state.menuOpen };
            }
            return changeState();
        // case INCREMENT:
        //     return state + 1;
        // case DECREMENT:
        //     return state - 1;
        case exports.RESET:
            return 0;
        default:
            return state;
    }
}
exports.counterReducer = counterReducer;
//# sourceMappingURL=audiograph.service.js.map