import React from 'react';
import PhotoGallery from './index';

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

describe('PhotoGallery component', () => {
    it('PhotoGallery component render', () => {
        const wrapper  = shallow(<PhotoGallery productFeatures={productFeatures} />)
        expect(wrapper).toMatchSnapshot()
    })
})