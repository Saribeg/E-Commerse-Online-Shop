import React from 'react';
import LoginForm from './index';

describe('LoginForm component', () => {
    it('LoginForm component render', () => {
        const wrapper  = shallow(<LoginForm />)
        expect(wrapper).toMatchSnapshot()
    })
})