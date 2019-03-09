import React from 'react';
import Careers from './Careers';
import AboutUs from './AboutUs';
import OurPolicy from './OurPolicy'

describe('Careers component', () => {
    it('Careers component render', () => {
        const wrapper  = shallow(<Careers />)
        expect(wrapper).toMatchSnapshot()
    })
});

describe('OurPolicy component', () => {
	it('OurPolicy component render', () => {
			const wrapper  = shallow(<OurPolicy />)
			expect(wrapper).toMatchSnapshot()
	})
});

describe('AboutUs component', () => {
	it('AboutUs component render', () => {
			const wrapper  = shallow(<AboutUs />)
			expect(wrapper).toMatchSnapshot()
	})
});