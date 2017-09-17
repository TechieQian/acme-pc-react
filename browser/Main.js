import React, {Component} from 'react'
import ProductForm from './ProductForm'
import Summary from './Summary'
import axios from 'axios'
import ProductList from './ProductList'

class Main extends Component {
	constructor() {
    super()
		this.state = { products : [], categories : []}
		this.addProduct = this.addProduct.bind(this)
		this.editProduct = this.editProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
	}

	componentDidMount(){
		this.getProductCategories() 
	}

	getProductCategories() {
		Promise.all([
			axios.get('/api/products'),
			axios.get('api/categories')
		])
			.then(([products, categories])=>{
				this.setState({products : products.data, categories : categories.data})
			})
	}

	editProduct(product) {
		axios.put(`/api/products/${product.id}`, product)
			.then((product)=> {
				this.getProductCategories()
			})
	}

	addProduct (product) {
		axios.post(`/api/products/`, product)
			.then((product)=> {
				this.getProductCategories()
			})
			.catch((err)=> {
				console.log(`error ${err}`)
			})
	}

	deleteProduct(productId) {
		axios.delete(`/api/products/${productId}`)
			.then(()=> {
				this.getProductCategories()
			})
	}

	render() {
		return (
			<div className='row'>
				<ProductList
					categories={this.state.categories} 
					products={this.state.products} 
					editProduct={this.editProduct} 
					deleteProduct={this.deleteProduct}
				/>
				<div className='col-sm-3'> 
					<div className='panel panel-default'>
						<div className='panel-heading'> Add a product </div>
						<ProductForm 
							addProduct={this.addProduct}
							categories={this.state.categories}
						/>	
					</div>
				</div>
				<Summary data={this.state} />
			</div>
		)
	}
}

export default Main
