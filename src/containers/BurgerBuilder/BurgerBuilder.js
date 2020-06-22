import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.7,
	meat: 0.9,
	bacon: 0.4
};

class BurgerBuilder extends Component {
	state = {
		ingredient: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredient = (type) => {
		const oldCount = this.state.ingredient[type];
		const updatedCount = oldCount + 1;
		const updatedIngredient = {
			...this.state.ingredient
		};
		updatedIngredient[type] = updatedCount;
		const priceAddtion = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddtion;

		this.setState({ingredient: updatedIngredient, totalPrice: newPrice} )
	}

	removeIngredient = (type) => {
		const currentCount = this.state.ingredient[type];
		const updatedCount = currentCount - 1;
		const updatedIngredient = {
			...this.state.ingredient
		};
		updatedIngredient[type] =  updatedCount;
		const priceAddtion = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddtion;

		this.setState({ ingredient: updatedIngredient, totalPrice: newPrice })
	}

	render() {
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredient} />
				<BuildControls ingredientAdded={this.addIngredient} ingredientRemoved={this.removeIngredient} />
			</Auxiliary>
		);
	};
}

export default BurgerBuilder;