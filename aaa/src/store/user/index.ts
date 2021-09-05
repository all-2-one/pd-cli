import { Model } from '../../core/Model';

export interface UserState {
  name: string;
}

const model: Model<UserState> = {
  namespace: 'user',
  state: {
    name: 'allen',
  },
  reducers: {
    changeName(state) {
      return {
        ...state,
        name: 'jack',
      };
    },
  },
  effects: {
    * asyncChangeName(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'changeName' });
    },
  },
};

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default model;
