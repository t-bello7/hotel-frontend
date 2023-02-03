import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../features/auth/authSlice';

const useAuth = () => {
  const token = useSelector(selectUserToken);
  return useMemo(() => ({ token }), [token]);
};

export default useAuth;
