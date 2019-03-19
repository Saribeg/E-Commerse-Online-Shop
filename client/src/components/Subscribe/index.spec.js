import React from 'react';
import Subscribe from './index';

describe('Subscribe component', () => {
    it('Subscribe component render', () => {
        const wrapper  = shallow(<Subscribe />)
        expect(wrapper).toMatchSnapshot()
    })
})