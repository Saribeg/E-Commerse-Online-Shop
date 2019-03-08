import React from 'react';
import Unsubscribe from './index';

describe('Unsubscribe component', () => {
    it('Unsubscribe component render', () => {
        const wrapper  = shallow(<Unsubscribe />)
        expect(wrapper).toMatchSnapshot()
    })
})