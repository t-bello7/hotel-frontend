import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../services/hotel';
import Loader from '../components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail, validatePassword } from '../hooks/validation';
import InlineError from '../components/InlineError';
import HomeLayout from '../layouts/homeLayout';
import background from '../assets/images/hotel-background.jpg';
import '../assets/styles/card.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();
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
  }, [emailError, passwordError, navigate, email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (valid) {
      const user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      navigate('/hotels');
      snotify();
    } else {
      notify();
    }
  };

  return (
    <HomeLayout background={background}>
      <div className="holder">
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit} className="form_holder">
          <div>
            <input id="email" type="email" className="form_feild" placeholder="Email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <InlineError error={emailError} />}
          </div>
          <div className="mb-6">
            <input id="password" type="password" className="form_feild" placeholder="**********" ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && password && <InlineError error={passwordError} />}
          </div>
          <div>
            <button type="submit" onClick={error && notify()} className="btn green_btn">Sign In</button>
          </div>
          <div>
            <p className="white_color">Don&#39;t have an account yet?</p>
            <br />
            <NavLink to="/register" className="btn blue_btn">Register Now</NavLink>
          </div>
          <ToastContainer />
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
