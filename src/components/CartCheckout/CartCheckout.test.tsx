import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/reducers/cartSlice';
import { CartCheckout } from './CartCheckout';
import { ROUTER } from '../Header';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: { cartReducer },
    preloadedState
  });
};

describe('CartCheckout component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore({
      cartReducer: {
        items: [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ],
        sumOfItems: { 1: 10, 2: 20 }
      }
    });
  });

  test('renders total price and items count correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartCheckout />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('$30')).toBeInTheDocument();
    expect(screen.getByText(/Total for 2 items/i)).toBeInTheDocument();
  });

  test('renders checkout button with correct link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartCheckout />
        </BrowserRouter>
      </Provider>
    );

    const checkoutButton = screen.getByRole('link', { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).toHaveAttribute('href', ROUTER.checkout);
  });
});
