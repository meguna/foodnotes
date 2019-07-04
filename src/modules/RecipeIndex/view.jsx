import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../RecipeInfo';
import RecipeList from '../RecipeList';
import NewRecipeForm from '../NewRecipeForm';
import EditRecipeForm from '../EditRecipeForm';
import DeleteRecipe from '../DeleteRecipe';
import NoSelectedRecipe from '../NoSelectedRecipe';
import './styles.css';

class RecipeIndex extends Component {
  componentDidMount() {
    const { fetchRecipes, sortMethod } = this.props;
    fetchRecipes(sortMethod);
  }

  render() {
    return (
      <div className="recipe-everything-wrapper">
        <div id="recipe-list">
          <RecipeList />
        </div>
        <div id="recipe-info">
          <Switch>
            <Route exact path="/addRecipe" component={NewRecipeForm} />
            <Route exact path="/editRecipe/:id" component={EditRecipeForm} />
            <Route path="/recipe/:id" component={RecipeInfo} />
            <Route path="/deleteRecipe/:id" component={DeleteRecipe} />
            <Route exact path="/" component={NoSelectedRecipe} />
          </Switch>
        </div>
      </div>
    );
  }
}

RecipeIndex.propTypes = {
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
};

RecipeIndex.defaultProps = {
  fetchRecipes: null,
  sortMethod: 'update_date',
};

export default RecipeIndex;
