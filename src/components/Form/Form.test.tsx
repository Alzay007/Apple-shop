import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from './Form';
import '@testing-library/jest-dom';
import { validateEmail, validatePassword } from '../../helpers/validateFunc';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const mockReducer = (state = {}) => state;
const store = createStore(mockReducer);

jest.mock('../../helpers/validateFunc', () => ({
  validateEmail: jest.fn() as jest.MockedFunction<typeof validateEmail>,
  validatePassword: jest.fn() as jest.MockedFunction<typeof validatePassword>
}));

const mockHandleLogin = jest.fn();
const mockHandleLoginGoogle = jest.fn();
const mockHandleCloseModal = jest.fn();

describe('Form component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with all fields and buttons', () => {
    render(
      <Provider store={store}>
        <Form
          action="Sign In"
          handleLogin={mockHandleLogin}
          handleLoginGoogle={mockHandleLoginGoogle}
          handleCloseModal={mockHandleCloseModal}
        />
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('validates email and password on form submit', async () => {
    render(
      <Provider store={store}>
        <Form
          action="Sign In"
          handleLogin={mockHandleLogin}
          handleLoginGoogle={mockHandleLoginGoogle}
          handleCloseModal={mockHandleCloseModal}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@mail.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    (
      validateEmail as jest.MockedFunction<typeof validateEmail>
    ).mockReturnValue(true);
    (
      validatePassword as jest.MockedFunction<typeof validatePassword>
    ).mockReturnValue(true);

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith(
        'test@mail.com',
        'password123'
      );
    });
  });

  test('shows error message if email is invalid', async () => {
    render(
      <Provider store={store}>
        <Form
          action="Sign In"
          handleLogin={mockHandleLogin}
          handleLoginGoogle={mockHandleLoginGoogle}
          handleCloseModal={mockHandleCloseModal}
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    (
      validateEmail as jest.MockedFunction<typeof validateEmail>
    ).mockReturnValue(false);
    (
      validatePassword as jest.MockedFunction<typeof validatePassword>
    ).mockReturnValue(true);

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  test('toggle password visibility on button click', () => {
    render(
      <Provider store={store}>
        <Form
          action="Sign In"
          handleLogin={mockHandleLogin}
          handleLoginGoogle={mockHandleLoginGoogle}
          handleCloseModal={mockHandleCloseModal}
        />
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByTestId('toggle-password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('change form from Sign In to Sign Up', () => {
    render(
      <Provider store={store}>
        <Form
          action="Sign In"
          handleLogin={mockHandleLogin}
          handleLoginGoogle={mockHandleLoginGoogle}
          handleCloseModal={mockHandleCloseModal}
        />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
