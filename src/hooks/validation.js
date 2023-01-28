/* eslint-disable no-useless-escape */

export const validateEmail = ({ email, setEmailError }) => {
  const emailRegular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email && !email.match(emailRegular)
    ? setEmailError("Please enter a valid email")
    : setEmailError("");
};

export const validatePassword = ({ password, setPasswordError }) => (password && password.length < 6
  ? setPasswordError("Password must be at least 6 characters")
  : setPasswordError(""));

export const validateUsername = ({ username, setUsernameError }) => (
  username && username.length < 5 && username.length > 25
    ? setUsernameError(`${username.length}/5`)
    : setUsernameError("")
);

export const validateComfirmePassword = ({
  password,
  cpassword,
  setCPasswordError,
}) => (password !== cpassword
  ? setCPasswordError("Password does not match")
  : setCPasswordError(""));

export const validateAge = ({ age, setAgeError }) => {
  if (age) {
    const Age = new Date().getFullYear() - new Date(age).getFullYear();
    return Age < 18
      ? setAgeError("You must be at least 18 years old")
      : setAgeError("");
  }
  return setAgeError("Age must be a number");
};
