import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useSignupMutation, useLoginMutation } from '../services/hotel';
import 'react-responsive-datepicker/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import InlineError from '../components/InlineError';
import {
  validateComfirmePassword,
  validateEmail,
  validateUsername,
  validatePassword,
} from '../hooks/validation';
import HomeLayout from '../layouts/homeLayout';
import background from '../assets/images/hotel-background.jpg';
import '../assets/styles/card.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [role, setRole] = useState('');
  const [submited, setSubmited] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useSignupMutation();
  const [login] = useLoginMutation();

  useEffect(() => {
    validateEmail({ email, setEmailError });
    validateUsername({ username, setUsernameError });
    validatePassword({ password, setPasswordError });
    validateComfirmePassword({ password, cpassword, setCPasswordError });

    if (
      emailError
      || passwordError
      || usernameError
      || cpasswordError
      || !email
      || !password
      || !cpassword
      || !username
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [
    emailError,
    passwordError,
    usernameError,
    navigate,
    email,
    role,
    password,
    username,
    cpasswordError,
    cpassword,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmited(true);
    if (valid) {
      let user = await register({
        username,
        email,
        role,
        password,
        password_confirmation: cpassword,
      }).unwrap();
      user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      toast.success('Login successful');
      navigate('/hotels');
    } else {
      toast.error(error);
    }
  };
  return (
    <HomeLayout background={background}>
      <div className="holder">
        <ToastContainer />
        {error && <div>{error}</div>}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit} className="form_holder">
          <div>
            <input id="username" type="name" className="form_feild" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input id="email" type="email" className="form_feild" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <select name="role" id="role" className="form_field" onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Please choose a role--</option>
              <option value="default"> User </option>
              <option value="admin"> Admin </option>
            </select>
          </div>
          <div>
            <input id="password" type="password" className="form_feild" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submited && passwordError && <InlineError error={passwordError} />}
          </div>
          <div>
            <input id="c  password" type="password" className="form_feild" placeholder="Verify Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
            {submited && cpasswordError && <InlineError error={cpasswordError} />}
          </div>
          <div>
            <button type="submit" onClick={handleSubmit} className="btn">Sign up</button>
          </div>
          <div>
            <p> Already have an account? </p>
            <br />
            <NavLink to="/login" className="btn blue_btn"> Login </NavLink>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Register;
