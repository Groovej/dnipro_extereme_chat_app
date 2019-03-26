import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import AppRootContainer from './containers/App'

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.querySelector('#app');
  const store = configureStore();

  appContainer && render(
    <Provider store={store}>
      <AppRootContainer />
    </Provider>,
    appContainer
  )
})
