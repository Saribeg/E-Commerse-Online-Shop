import React from 'react';
import Search from './index';

describe('Search component', () => {
    it('Search component render', () => {
        const wrapper  = shallow(<Search />)
        expect(wrapper).toMatchSnapshot()
    })
})