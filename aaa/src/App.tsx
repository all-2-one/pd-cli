import React, { Suspense } from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import router from './router';
import WrapperRouter from './core/WrapperRouter';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>加载中</div>}>
        <WrapperRouter routerData={router} />
        {/* 如果特殊情况满足不了可以在这里扩展 */}
      </Suspense>
    </Router>
  );
}

export default App;
