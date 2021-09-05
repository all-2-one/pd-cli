import { produce } from 'immer';
import { Action } from '../../core/Model';
import ActionTypes from '../action-types';

export interface GlobalState {
  loading: boolean;
}

const initialState = {
  loading: true,
};

export default function reducer(state = initialState, action: Action<Partial<GlobalState>>) {
  return produce<GlobalState>(state, (draft) => {
    switch (action.type) {
      case ActionTypes.show:
        draft.loading = true;
        break;
      case ActionTypes.hide:
        draft.loading = false;
        break;
      case ActionTypes.toggle:
        draft.loading = !draft.loading;
        break;
      default:
        break;
    }
  });
}
