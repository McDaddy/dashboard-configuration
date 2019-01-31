import React from 'react';
import 'antd/lib/style/v2-compatible-reset';
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import models from 'src/models';
import AppRouter from './router';

const history = createHistory();

const app = dva({
  history,
});

models.forEach((model) => {
  app.model(model);
});
app.router(() => <AppRouter {...{ app, history }} />);
app.start('#content');