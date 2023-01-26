/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { DatePicker } from 'react-responsive-datepicker';
import 'react-responsive-datepicker/dist/index.css';
import Loader from '../components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import InlineError from '../components/InlineError';
import { register } from '../redux/actions/UserAction';
import {
  validateAge,
  validateComfirmePassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from '../components/validation';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState(new Date());
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [submited, setSubmited] = useState(false);
  const [valid, setValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // add date format
  const dateFormat = (age) => {
    const d = new Date(age);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onImageChange = (event) => {
    setAvatar(event.target.files[0]);
  };
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user[name]', fullName);
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[date_of_birth]', age);
    setSubmited(true);
    if (valid) {
      dispatch(register(formData));
      toast.success('Register successful');
    } else {
      toast.error('Please fill all the fields');
    }
  };

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    validateEmail({ email, setEmailError });
    validateFullName({ fullName, setFullNameError });
    validatePassword({ password, setPasswordError });
    validateAge({ age, setAgeError });
    validateComfirmePassword({ password, cpassword, setCPasswordError})

    if (
      emailError ||
      passwordError ||
      fullNameError ||
      ageError ||
      cpasswordError ||
      !email ||
      !password ||
      !cpassword ||
      !fullName ||
      !age
    ) {
      setValid(false);
    } else {
      setValid(true);
    }

    if (userInfo) {
      navigate('/login');
    }
  }, [
    emailError,
    passwordError,
    fullNameError,
    ageError,
    userInfo,
    navigate,
    email,
    password,
    fullName,
    age,
    cpasswordError,
    cpassword,
  ]);

  const handleSubmitt = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <ToastContainer />
      {error && <div>{error}</div>}
      {loading && <Loader />}
      <form
        onSubmit={handleSubmitt}
      >

        <div>
          <label
            htmlFor="username"
          >
            FullName
          </label>
          <input
            id="username"
            type="name"
            placeholder="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="username"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="date"
          >
            Date Of Birth
          </label>
          <input
            type="text"
            value={dateFormat(age)}
            readOnly
            onClick={() => setIsOpen(true)}
          />
          <DatePicker
            value={age}
            onChange={(age) => setAge(age)}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            defaultValue={new Date(2022, 8, 8)}
            maxDate={new Date(2023, 0, 10)}
            headerFormat="DD MM dd"
          />

          {submited && ageError && <InlineError error={ageError} />}
        </div>
        <div>
          <label
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {submited && passwordError && <InlineError error={passwordError} />}
        </div>
        <div>
          <label
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="******************"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        {submited && cpasswordError && <InlineError error={cpasswordError} />}
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
        <div>
          <p>
            Already have an account?
          </p>
          <NavLink
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
