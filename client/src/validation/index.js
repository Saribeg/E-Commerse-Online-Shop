export const correctEmail = input => {
  const chkEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return chkEmail.test(input)
    ? undefined
    : `You have to enter correct e-mail (example@com.com)`;
};

export const cardNumber = input => {
  const chkCardNumber = new RegExp(/^([0-9]{16})$/);
  return chkCardNumber.test(input)
    ? undefined
    : `Please enter correct card number`;
};

export const cvc = input => {
  const cvc = new RegExp(/^([0-9]{3})$/);
  return cvc.test(input) ? undefined : `Please enter correct CVC`;
};

export const dateExp = (input, allInputs) => {
  let date = allInputs.expiryMonth + "/" + input;

  console.log("date", date);

  const dateExp = new RegExp(/^(0[1-9]|1[0-2])\/([0-9]{4})$/);
  return dateExp.test(date) ? undefined : `Please enter correct date - MM/YYYY`;
};

export const requiredInput = input => {
  return input ? undefined : `You have to fill this field`;
};

export const matchPasswords = (input, allInputs) => {
  return input === allInputs.newPass
    ? undefined
    : "Your entered passwords isn't matched";
};

export const matchPasswordsReg = (input, allInputs) => {
  return input === allInputs.password
    ? undefined
    : "Your entered passwords isn't matched";
};
