import React from 'react';
import RegistrationForm from './index';

describe('RegistrationForm component', () => {
    it('RegistrationForm component render', () => {
        const wrapper  = shallow(<RegistrationForm />)
        expect(wrapper).toMatchSnapshot()
    })
})