import React from 'react';
import ScrollBtn from './index';

describe('ScrollBtn component', () => {
    it('ScrollBtn component render', () => {
        const wrapper  = shallow(<ScrollBtn />)
        expect(wrapper).toMatchSnapshot()
    })
})