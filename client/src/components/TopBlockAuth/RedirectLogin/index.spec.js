import React from 'react';
import RedirectLogin from './index';

describe('RedirectLogin component', () => {
    it('RedirectLogin component render', () => {
        const wrapper  = shallow(<RedirectLogin />)
        expect(wrapper).toMatchSnapshot()
    })
})