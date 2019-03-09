import React from 'react';
import ProductSizes from './index';

const productFeatures = [{
	"color": "#000000",
	"colorName": "black",
	"imageUrls": [
		"/img/products/women/clothing/hoodies/002/000000/021.jpg",
		"/img/products/women/clothing/hoodies/002/000000/022.jpg",
		"/img/products/women/clothing/hoodies/002/000000/023.jpg",
		"/img/products/women/clothing/hoodies/002/000000/024.jpg"
	],
	"sizes": [{
			"size": "xs",
			"quantity": 0
		},
		{
			"size": "s",
			"quantity": 0
		},
		{
			"size": "m",
			"quantity": 18
		},

		{
			"size": "l",
			"quantity": 23
		}
	]
}];

describe('ProductSizes component', () => {
    it('ProductSizes component render', () => {
        const wrapper  = shallow(<ProductSizes productFeatures={productFeatures}/>)
        expect(wrapper).toMatchSnapshot()
    })
})