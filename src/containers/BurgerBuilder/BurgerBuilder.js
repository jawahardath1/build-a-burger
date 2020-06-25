import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 0.9,
  bacon: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredient = (type) => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;
    const priceAddtion = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddtion;

    this.setState({ ingredient: updatedIngredient, totalPrice: newPrice });

    this.updatePurchaseState(updatedIngredient);
  };

  removeIngredient = (type) => {
    const currentCount = this.state.ingredient[type];
    if (currentCount < 1) {
      return;
    }
    const updatedCount = currentCount - 1;
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ ingredient: updatedIngredient, totalPrice: newPrice });

    this.updatePurchaseState(updatedIngredient);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredient,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal> 
          <OrderSummary ingredients={this.state.ingredient} />
        </Modal>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls
          ingredientAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
