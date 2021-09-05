import { GlobalState } from './global/reducer';
import { UserState } from './user';

export interface ConnectState {
  global: GlobalState;
  user: UserState;
}
