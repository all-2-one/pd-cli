import React from 'react';
import { connect } from 'react-redux';
import { Action } from '../../core/Model';
import { ConnectState } from '../../store/Connect';
import { UserState } from '../../store/user';
// import { injectModel } from '../../store';
// import userModel from '../../store/user';

interface Props {
  user: UserState;
  dispatch: (action: Action) => void;
}

class About extends React.PureComponent<Props> {
  render() {
    const { user, dispatch } = this.props;
    // injectModel(userModel);
    return (
      <div>
        <p>{user.name}</p>
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: 'user/asyncChangeName',
              payload: 'tom',
            });
          }}
        >
          异步改名
        </button>
      </div>
    );
  }
}

export default connect(({ user }: ConnectState) => ({ user }))(About);
