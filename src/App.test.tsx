import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Employee Management Portal', () => {
  render(<App />);

  expect(
    screen.getByText('Employee Management Portal')
  ).toBeInTheDocument();
});