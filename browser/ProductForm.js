import React, {Component} from 'react'

class ProductForm extends Component {
	constructor() {
    super()
		this.state = {
			name : '', 
			price : 0, 
			inStock : false,
			categoryId : undefined,
			saveDisabled : true
		} 
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		if (this.props.product) {
			const {name, price, inStock} = this.props.product
			const categoryId = this.props.product.category ? 
				this.props.product.category.id : 0
			this.setState({name, price, inStock, categoryId})
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		if (this.props.product) {
			this.setState({saveDisabled : true})
			const {name, price, inStock, categoryId} = this.state
			const newProduct = Object.assign(this.props.product, {name,price,inStock,categoryId})
			this.props.editProduct(newProduct) 
		}
		else {
			this.props.addProduct(this.state)
			this.setState({ name : '', price : 0, inStock : false, categoryId : undefined, saveDisabled : true })
		}
	}

	handleChange(event) {
		const value = event.target.name == "inStock" ? 
			event.target.checked :
			event.target.value
		this.setState({ [event.target.name] : value, saveDisabled : false})
	}

	render() {
		return (
			<div className='panel-body'> 
				<form onSubmit={this.handleSubmit}>
					<fieldset>
					<div className='form-group'>
						<label>Name</label>
						<input 
							name='name' 
							className='form-control' 
							onChange={this.handleChange}
							value={this.state.name}
						/>
					</div>
					<div className='form-group'>
						<label>Price</label>
						<input 
							name='price' 
							className='form-control'
							type='number'
							onChange={this.handleChange}
							value={this.state.price}
						/>
					</div>
					<div className='form-group'>
						<label>In Stock</label>
						<br />
						<input 
							name='inStock' 
							type='checkbox'
							onChange={this.handleChange}
							checked={this.state.inStock}
						/>
					</div>
					<div className='form-group'>
						<label>Category</label>
						<select 
							name='categoryId' 
							className='form-control'
							value={this.state.categoryId} 
							onChange={this.handleChange}>
							<option key={0} value={null}></option>
							{
								this.props.categories.map((category)=> {
									return (
										<option key={category.id} value={category.id}>{category.name}</option>
									)
								})

							}
						</select>
					</div>
					<div className='form-group'>
						<button
							type="submit"
							className="btn btn-primary btn-block"
							disabled={this.state.saveDisabled}
						>Save</button>
						<button
							type="button"
							onClick={()=>this.props.deleteProduct(this.props.product.id)}
							className="btn btn-danger btn-block"
						>Delete</button>
					</div>
				</fieldset>
			</form>
		</div>
		)
	}
}

export default ProductForm
