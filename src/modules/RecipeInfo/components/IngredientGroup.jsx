import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredients';

const groupLetterLabel = (int, groupCount) => {
  if (groupCount > 1) {
    return (
      <span className="recipe-info-group-letter-label">
        {String.fromCharCode(65 + int)}
      </span>
    );
  }
  return null;
};

const IngredientGroup = ({ ingredients, groups, groupCount }) => {
  const ingredientGroups = [];
  for (let i = 1; i < groupCount + 1; i++) {
    ingredientGroups.push(ingredients.filter(item => item.group_id === i));
  }
  return (
    <div className="recipe-info-ingredients-list">
      {ingredientGroups.map((group, i) => (
        <div className="recipe-info-ingredients-list-group" key={groups[i].id}>
          <p className="recipe-info-group-note">{groups[i].notes}</p>
          {groupLetterLabel(i, groupCount)}
          <div className="recipe-info-ingredients-item-parent">
            {group.map(ingredient => (
              <Ingredient ingredient={ingredient} key={ingredient.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  groupCount: PropTypes.number,
};

IngredientGroup.defaultProps = {
  ingredients: [],
  groups: [{}],
  groupCount: null,
};

export default IngredientGroup;