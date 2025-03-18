import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { Card } from './Card';
import cartReducer, { addItem } from '../../features/reducers/cartSlice';
import wishlistReducer, {
  addFavItem
} from '../../features/reducers/wishlistSlice';
import modalReducer, { openSnackBar } from '../../features/reducers/modalSlice';
import { useAuth } from '../../features/hooks/useAuth';

jest.mock('features/hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cartReducer,
      wishlistReducer,
      modalSlice: modalReducer
    },
    preloadedState
  });
};

const product = {
  id: '1',
  name: 'Product 1',
  fullPrice: 100,
  capacity: '128GB',
  screen: '6.1"',
  rating: 4.5,
  image: 'product1.jpg',
  itemId: 'product1',
  category: 'phone',
  color: 'Black',
  ram: '8GB',
  year: 2
};

describe('Card component', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ isAuth: true, userId: '123', token: null });
    store = createTestStore({
      cartReducer: { items: [] },
      wishlistReducer: { favItems: [] }
    });
    jest.spyOn(store, 'dispatch');
  });

  test('renders product card correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card product={product} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.fullPrice}`)).toBeInTheDocument();
    expect(screen.getByText(/Rating/)).toBeInTheDocument();
    expect(screen.getByText(product.capacity)).toBeInTheDocument();
    expect(screen.getByText(product.screen)).toBeInTheDocument();
  });

  test('Add to cart button changes text when clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card product={product} />
        </BrowserRouter>
      </Provider>
    );

    const addToCartButton = screen.getByRole('button', {
      name: /Add to cart/i
    });
    fireEvent.click(addToCartButton);

    expect(addToCartButton).toHaveTextContent('Added');
    expect(store.dispatch).toHaveBeenCalledWith(addItem(product.id));
  });

  // test('Add to favourite button toggles correctly', async () => {
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Card product={product} />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const addToFavouriteButton = screen.getByRole('button', {
  //     name: /wishlist_btn/i
  //   });

  //   fireEvent.click(addToFavouriteButton);

  //   await waitFor(() => {
  //     expect(
  //       addToFavouriteButton.classList.contains('card_wishlist_heart')
  //     ).toBe(true);
  //   });

  //   expect(store.dispatch).toHaveBeenCalledWith(addFavItem(product.id));
  // });

  test('opens snack-bar when user is not authenticated and clicks "Add to favourite" button', () => {
    mockUseAuth.mockReturnValueOnce({
      isAuth: false,
      userId: null,
      token: null
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card product={product} />
        </BrowserRouter>
      </Provider>
    );

    const addToFavouriteButton = screen.getByRole('button', {
      name: /wishlist_btn/i
    });

    fireEvent.click(addToFavouriteButton);

    expect(store.dispatch).toHaveBeenCalledWith(openSnackBar());
  });
});
