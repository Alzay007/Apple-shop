import { useAppSelector } from './hooks';

export function useAuth() {
  const { email, token, id } = useAppSelector((state) => state.userReducer);

  return {
    isAuth: !!email,
    token,
    id
  };
}
