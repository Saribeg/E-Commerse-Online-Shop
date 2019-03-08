import React from 'react';
import ProductsCarousel from './index';

describe('ProductsCarousel component', () => {
    it('ProductsCarousel component render', () => {
        const wrapper  = shallow(<ProductsCarousel />)
        expect(wrapper).toMatchSnapshot()
    })
})