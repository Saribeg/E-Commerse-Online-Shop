import React from 'react';
import RegistrationOk from './index';

describe('RegistrationOk component', () => {
    it('RegistrationOk component render', () => {
        const wrapper  = shallow(<RegistrationOk />)
        expect(wrapper).toMatchSnapshot()
    })
})