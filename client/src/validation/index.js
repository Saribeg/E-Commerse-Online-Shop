

export const correctEmail = (input) => {

    const chkEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    return (chkEmail.test(input)) ? undefined : `You have to enter correct e-mail (example@com.com)`;
}

export const requiredInput = (input) => {

    return input ? undefined : `You have to fill this field`;
}

export const correctInput = (input) => {
    return input.length < 3 ? 'Слишком короткий email' : undefined;
}

export const matchPasswords = (input, allInputs) => {
    return input === allInputs.newPass ? undefined :'Your entered passwords isn\'t matched';
}