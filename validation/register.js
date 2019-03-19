const Validator = require("validator");
const isEmpty = require("./isEmpty");

// Function for returning the object with error texts for all inputs for registration form
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.login = !isEmpty(data.login) ? data.login : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.fullName, { min: 5, max: 30 })) {
    errors.fullName = "Full Name length must be between 5 and 30 characters";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Full Name field is required";
  }

  if (!Validator.isLength(data.login, { min: 5, max: 30 })) {
    errors.login = "Login length must be between 5 and 30 characters";
  }

  if (Validator.isEmpty(data.login)) {
    errors.login = "Login field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password length must be between 6 and 20 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
