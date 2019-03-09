import React from 'react';
import ProductCounter from './index';

describe('ProductCounter component', () => {
    it('ProductCounter component render', () => {
        const wrapper  = shallow(<ProductCounter />)
        expect(wrapper).toMatchSnapshot()
    })
})