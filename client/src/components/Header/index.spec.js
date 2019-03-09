import React from 'react';
import Header from './index';

describe('Header component', () => {
    it('Header component render', () => {
        const wrapper  = shallow(<Header />)
        expect(wrapper).toMatchSnapshot()
    })
})