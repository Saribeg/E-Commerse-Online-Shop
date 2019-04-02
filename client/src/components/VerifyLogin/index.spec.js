import React from 'react';
import VerifyLogin from './index';

const match = {  
        params: {
            id: 1
        }
}

describe('VerifyLogin component', () => {
    it('VerifyLogin component render', () => {
        const wrapper  = shallow(<VerifyLogin match={match}/>)
        expect(wrapper).toMatchSnapshot()
    })
})