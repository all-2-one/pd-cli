import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionTypes from '../../store/action-types';
import { ConnectState } from '../../store/Connect';
import actionMap from '../../store/global/createAction';

function Home() {
  const { loading } = useSelector(({ global }: ConnectState) => global);
  const dispatch = useDispatch();

  return (
    <div>
      <Link to="/about">
        Components
      </Link>
      <p>{loading ? 'hello' : 'world'}</p>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: ActionTypes.hide });
        }}
      >
        change loading
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(actionMap.asyncToggle());
        }}
      >
        saga change
      </button>
    </div>
  );
}

export default Home;
