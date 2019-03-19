import React, { Fragment } from 'react';

const customRequiredInput = (props) => {
    const {input, type, className, classError, placeholder, meta} = props;


    // const errorClass = meta.error ? 'section-profile-content-input section-profile-content-input-error' : 'section-profile-content-input'
    return (
        <Fragment>
            <input {...input} type={type} placeholder={placeholder} className={className}/>
            {meta.error && meta.touched && <div className={classError}>{meta.error}</div>}
        </Fragment>
    )
}
export default customRequiredInput;