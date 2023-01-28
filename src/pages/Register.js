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
import HomeLayout from '../layouts/homeLayout';
import background from '../assets/images/hotel-background.jpg'
import '../assets/styles/card.css';

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
    var data={
      name: fullName,
      email: email,
      password: password,
      age: age
    }
    if (valid) {
      dispatch(register(data));
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
    <HomeLayout background={background}>
      <div className="holder">
        <ToastContainer />
        {error && <div>{error}</div>}
        {loading && <Loader />}
        <form onSubmit={handleSubmitt} className="form_holder">
          <div>
            <input id="username" type="name"  className="form_feild" placeholder="FullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <input id="email" type="email"  className="form_feild" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="text"  className="form_feild" value={dateFormat(age)} readOnly onClick={() => setIsOpen(true)} />
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
            <input id="password" type="password"  className="form_feild" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {submited && passwordError && <InlineError error={passwordError} />}
          </div>
          <div>
            <input id="password" type="password"  className="form_feild" placeholder="Verify Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
          {submited && cpasswordError && <InlineError error={cpasswordError} />}
          </div>
          <div>
            <button type="submit" onClick={handleSubmit} className="btn" >Sign up</button>
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
