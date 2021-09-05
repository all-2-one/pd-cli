import { Action } from '../../core/Model';
import ActionTypes from '../action-types';

interface ActionMapItem {
  [actionName: string]: (payload?: object) => Action;
}

const actionMap: ActionMapItem = {
  show: () => ({
    type: ActionTypes.show,
  }),
  asyncToggle: () => ({
    type: ActionTypes.asyncToggle,
  }),
  toggle: () => ({
    type: ActionTypes.toggle,
  }),
};

export default actionMap;
