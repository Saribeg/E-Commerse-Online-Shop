import React, { Fragment } from 'react';

const customRequiredInput = (props) => {
    const {input, type, placeholder, meta} = props;
    // const errorClass = meta.error ? 'section-profile-content-input section-profile-content-input-error' : 'section-profile-content-input'
    return (
        <Fragment>
            <input {...input} type={type} placeholder={placeholder} className='section-profile-content-input'/>
            {meta.error && meta.touched && <div className='input-error-message'>{meta.error}</div>}
        </Fragment>
    )
}
export default customRequiredInput;