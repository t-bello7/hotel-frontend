/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../redux/actions/UserAction';
import { validateEmail, validatePassword } from '../components/validation';
import InlineError from '../components/InlineError';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submited, setSubmited] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const notify = () => {
    toast.error(error);
  };

  const snotify = () => {
    toast.success('Login successful');
  };

  useEffect(() => {
    validateEmail({ email, setEmailError });
    validatePassword({ password, setPasswordError });

    if (emailError || passwordError || !email || !password) {
      setValid(false);
    } else {
      setValid(true);
    }
    if (userInfo) {
      navigate('/');
    }
  }, [emailError, passwordError, userInfo, navigate, email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmited(true);
    if (valid) {
      dispatch(login(email, password));
      snotify();
    } else {
      notify();
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <InlineError error={emailError} />}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="**********"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && password && <InlineError error={passwordError} />}
        </div>
        <div>
          <button
            type="submit"
            onClick={error && notify()}
          >
            Sign In
          </button>
        </div>
        <div>
          <p>
            Don&#39;t have an account yet?
          </p>
          <NavLink
            to="/register"
          >
            Sign Up now
          </NavLink>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
