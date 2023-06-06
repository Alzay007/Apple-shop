import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header, ROUTER } from './components/Header';
import {
  selectItems,
  useAppDispatch,
  useAppSelector,
} from './features/hooks/hooks';
import { fetchGoods } from './features/reducers/thunk';
import { addItems } from './features/reducers/cartSlice';
import {
  CartPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  AccountPage,
  GoodsPage,
  ProductDetailPage,
  SignUpPage,
  DevelopmentPage,
} from './pages';

import './App.scss';
import { setUser } from './features/reducers/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchGoods());
    const idArray = window.localStorage.getItem('id');

    if (idArray) {
      dispatch(addItems(JSON.parse(idArray)));
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);

      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        }),
      );
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('id', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Header />
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
          <Route path={ROUTER.cart} element={<CartPage />} />
          <Route path={ROUTER.login} element={<LoginPage />} />
          <Route path={ROUTER.signUp} element={<SignUpPage />} />
          <Route path={ROUTER.account} element={<AccountPage />} />
          <Route
            path={ROUTER.productDetalePage}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTER.support} element={<DevelopmentPage />} />
          <Route path={ROUTER.contacts} element={<DevelopmentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
