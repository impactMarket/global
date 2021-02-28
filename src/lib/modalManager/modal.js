import { ACTION } from './helpers/actions';
import { eventManager } from './helpers/eventManager';

export const modal = {
    open: (type, props = {}, options = {}) => eventManager.emit(ACTION.OPEN, type, props, options),
    close: (callback, options = {}) => eventManager.emit(ACTION.CLOSE, callback, options)
};
