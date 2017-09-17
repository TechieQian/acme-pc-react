import React, {Component} from 'react'

export default function Summary (props) {
	const numProducts = props.data.products.length
	const in_data = {
		noCategory : 0,
		mostExpensive : { name : '', price : -1 },
		notInStock : [] 
	}

	const data = props.data.products.reduce((input, product)=> {
		if (!product.category) {
			input.noCategory ++
		}
		if (product.price > input.mostExpensive.price) {
			input.mostExpensive = product
		}
		if (!product.inStock) {
			input.notInStock.push(product.name)
		}
		return input
	}, in_data)

	console.log(`not in stock ${data.notInStock}`)

  
	return (
		<div className='col-sm-3'>
			<div className='panel panel-default'> 
				<div className='panel-heading'> Summary </div>
				<div className='panel-body'>
					<ul className='list-group'>
						<li className='list-group-item'>
							There are <b>{numProducts}</b> items
						</li>
						<li className='list-group-item'>
							Categories : 
							<ul>
							{
								props.data.categories.map((category)=> {
									return (
									 category.products.length ? 
										<li key={category.id}>{category.name} has {category.products.length} items</li> : null 
									)
								})
							}
								<li><b>{data.noCategory} </b> product(s) has no category </li>
							</ul>
						</li>
						<li className='list-group-item'> 
							Most expensive product is <b>{data.mostExpensive.name}</b>
						</li>
						<li className='list-group-item'>
							Products not in stock are {data.notInStock.join(' ')}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
