import React from 'react'
import ProductForm from './ProductForm'

export default function ProductList(props) {
	return (
		<div className='col-sm-6'>
		{
			props.products.map((product)=> 
				<div className='col-sm-4' key={product.id}>
					<div className='panel panel-default'>
						<ProductForm 
							categories={props.categories} 
							product={product} 
							editProduct={props.editProduct} 
							deleteProduct={props.deleteProduct}
						/>
					</div>
				</div>
			)
		}
		</div>
	)
}
