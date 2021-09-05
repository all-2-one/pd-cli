import * as sagaEffects from 'redux-saga/effects';

export interface Action<T = unknown> {
  type: string;
  payload?: T;
}

export type Reducer<State> = (state: State, action: Action) => State;

export interface Model<State = object> {
  namespace: string;
  state: State;
  reducers: {
    [actionType: string]: Reducer<State>;
  };
  effects: {
    // @ts-ignore
    [effectType: string]: (action: Action, sagaEffects: typeof sagaEffects) => Generator;
  };
}

function prefixNamespace(type: string, namespace: string) {
  if (type.indexOf('/') === -1) {
    return `${namespace}/${type}`;
  }
  return type;
}

export function getReducer<T>(model: Model<T>) {
  const { state: initalState, reducers, namespace } = model;
  const matchReducers = Object.keys(reducers).reduce<{ [x: string]: Reducer<T>; }>((obj, key) => ({
    ...obj,
    [prefixNamespace(key, namespace)]: reducers[key],
  }), {});
  const reducer = (state = initalState, action: Action) => {
    const reducer = matchReducers[prefixNamespace(action.type, namespace)];
    if (reducer) {
      return reducer(state, action);
    }
    return state;
  };
  return reducer;
}

export function getSaga<T>(model: Model<T>) {
  const { effects, namespace } = model;
  return function* saga() {
    const keys = Object.keys(effects);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const watcherSaga = getWatcherSaga<T>(
        prefixNamespace(key, namespace),
        effects[key] as unknown as Generator,
        model,
      );
      yield sagaEffects.fork(watcherSaga);
    }
  };
}

function getWatcherSaga<T>(key: unknown, effect: Generator, model: Model<T>) {
  const { namespace } = model;
  return function* saga() {
    // @ts-ignore
    yield sagaEffects.takeEvery(key, function* handle(action: Action) {
      // @ts-ignore
      yield effect(action, {
        ...sagaEffects,
        put(action: Action) {
          return sagaEffects.put({ ...action, type: prefixNamespace(action.type, namespace) });
        },
      });
    });
  };
}
