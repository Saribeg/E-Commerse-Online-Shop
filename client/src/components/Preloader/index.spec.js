import React from 'react';
import Preloader from './index';

describe('Preloader component', () => {
    it('Preloader component render', () => {
        const wrapper  = shallow(<Preloader />)
        expect(wrapper).toMatchSnapshot()
    })
})