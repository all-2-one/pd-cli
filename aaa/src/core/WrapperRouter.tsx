import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Router as RouterType } from '../router';

interface Props {
  routerData: RouterType[];
}

export default function WithRouter(props: Props) {
  const { routerData } = props;

  return (
    <Switch>
      {routerData.map((routerItem) => {
        const {
          exact, path, component: Component, children,
        } = routerItem;

        let childrenNode = null;
        if (children) {
          childrenNode = <WithRouter routerData={children} />;
        }

        if (typeof Component === 'object') {
          return (
            <Route
              exact={exact}
              path={path}
              key={path}
              component={Component}
            />
          );
        }

        return (
          <Route
            exact={exact}
            path={path}
            key={path}
          >
            <Component>{childrenNode}</Component>
          </Route>
        );
      })}
    </Switch>
  );
}
