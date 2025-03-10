import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header, ROUTER } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { LoginModal } from './components/LoginModal';
import { SignUpModal } from './components/SignUpModal';
import {
  selectFavItems,
  selectItems,
  useAppDispatch,
  useAppSelector
} from './features/hooks/hooks';
import {
  fetchGoods,
  loadCartFromFirestore,
  loadWishListFromFirestore
} from './features/reducers/thunk';
import { addItems } from './features/reducers/cartSlice';
import { addFavItems } from './features/reducers/wishlistSlice';
import { setUser } from './features/reducers/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CartPage,
  WishlistPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  GoodsPage,
  ProductDetailPage,
  DevelopmentPage
} from './pages';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const favItems = useAppSelector(selectFavItems);
  const isAuth = getAuth();
  const { isLoginModalOpen, isSignupModalOpen } = useAppSelector(
    (state) => state.modalReducer
  );
  const [burgerMenuSelected, setBurgerMenuSelected] = useState(false);

  useEffect(() => {
    dispatch(fetchGoods());
    const localCart = localStorage.getItem('id');
    const localFav = localStorage.getItem('wishlistId');

    if (localCart && !isAuth) dispatch(addItems(JSON.parse(localCart)));
    if (localFav && !isAuth) dispatch(addFavItems(JSON.parse(localFav)));

    const unsubscribe = onAuthStateChanged(isAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        dispatch(
          setUser({
            email: user.email,
            token,
            id: user.uid,
            name: user.displayName
          })
        );

        dispatch(loadCartFromFirestore(user.uid));
        dispatch(loadWishListFromFirestore(user.uid));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuth.currentUser) {
      window.localStorage.setItem('id', JSON.stringify(items));
      window.localStorage.setItem('wishlistId', JSON.stringify(favItems));
    }
  }, [items, favItems, isAuth]);

  useEffect(() => {
    if (isLoginModalOpen || isSignupModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isLoginModalOpen, isSignupModalOpen]);

  return burgerMenuSelected ? (
    <>
      <BurgerMenu
        setBurgerMenuSelected={setBurgerMenuSelected}
        burgerMenuSelected={burgerMenuSelected}
      />
      {isLoginModalOpen && <LoginModal />}

      {isSignupModalOpen && <SignUpModal />}
    </>
  ) : (
    <>
      {isLoginModalOpen && <LoginModal />}

      {isSignupModalOpen && <SignUpModal />}

      <Header
        setBurgerMenuSelected={setBurgerMenuSelected}
        burgerMenuSelected={burgerMenuSelected}
      />

      <div className="section">
        <Routes>
          <Route path={ROUTER.home} element={<HomePage />} />
          <Route
            path={ROUTER.phones}
            element={<GoodsPage title={'Phones'} category="phones" />}
          />
          <Route
            path={ROUTER.tablets}
            element={<GoodsPage title={'Tablets'} category="tablets" />}
          />
          <Route
            path={ROUTER.laptops}
            element={<GoodsPage title={'Laptops'} category="laptops" />}
          />
          <Route
            path={ROUTER.watches}
            element={<GoodsPage title={'Watches'} category="watches" />}
          />
          <Route path={ROUTER.wishlist} element={<WishlistPage />} />
          <Route path={ROUTER.cart} element={<CartPage />} />
          <Route path={ROUTER.checkout} element={<CheckoutPage />} />
          <Route
            path={ROUTER.productDetalePage}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTER.support} element={<DevelopmentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
