import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';

test('renders Employee Management Portal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(
    getByText('Employee Management Portal')
  ).toBeInTheDocument();
});