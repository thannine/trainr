import { render, screen } from '@testing-library/react';
import App from './App';

test('renders customers and trainings links', () => {
  render(<App />);
  const linkElement1 = screen.getByText(/customers/i);
  const linkElement2 = screen.getByText(/trainings/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});
