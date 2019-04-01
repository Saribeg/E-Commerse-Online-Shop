import React from 'react';
import TopBlockAuth from './index';

describe('TopBlockAuth component', () => {
    it('TopBlockAuth component render', () => {
        const wrapper  = shallow(<TopBlockAuth />)
        expect(wrapper).toMatchSnapshot()
    })
})