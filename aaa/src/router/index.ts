import React from 'react';
import { RouteProps } from 'react-router-dom';
import Base from '../pages/Nest/Base';
import Nest1 from '../pages/Nest/Nest1';
import Nest2 from '../pages/Nest/Nest2';
import NoMatch from '../pages/NoMatch';

interface Props {
  children: React.ReactNode;
  [x: string]: unknown;
}

type PageComponent = React.FC<Props> | typeof React.PureComponent;
export interface Router extends Omit<RouteProps, 'component' | 'children'> {
  path: string;
  component: PageComponent | React.LazyExoticComponent<any>;
  children?: Router[];
}

const router: Router[] = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../pages/Home')),
  },
  {
    path: '/about',
    exact: true,
    component: React.lazy(() => import('../pages/About')),
  },
  {
    path: '/nest',
    component: Base,
    children: [
      {
        path: '/nest/1',
        exact: true,
        component: Nest1,
      },
      {
        path: '/nest/2',
        exact: true,
        component: Nest2,
      },
    ],
  },
  {
    path: '*',
    component: NoMatch,
  },
];

export default router;
