import { connect } from 'react-redux';
import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import IngredientGroup from './components/IngredientGroup';
import RecipeNotes from './components/RecipeNotes';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      groups: [],
      loadingGroups: true,
      groupCount: 1,
      loadingIngredients: true,
      fetchError: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      this.fetchIngredients();
      this.fetchGroups();
    }
  }

  fetchGroups() {
    const { selectedId } = this.props;
    this.setState({ loadingGroups: true });
    fetch(`http://localhost:3005/api/getingredientgroups/${selectedId}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ groups: res });
        this.setState({ groupCount: res[res.length - 1].group_id });
        this.setState({ loadingGroups: false });
      })
      .catch(() => {
        this.setState({ fetchError: true });
      });
  }

  fetchIngredients() {
    const { selectedId } = this.props;
    this.setState({ loadingIngredients: true });
    fetch(`http://localhost:3005/api/getingredients/${selectedId}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ ingredients: res, loadingIngredients: false });
      })
      .catch(() => {
        this.setState({ fetchError: true });
      });
  }

  render() {
    const {
      selectedId,
      loading,
      error,
      recipes,
    } = this.props;
    const {
      loadingGroups,
      groups,
      groupCount,
      ingredients,
      loadingIngredients,
      fetchError,
    } = this.state;
    if (selectedId === -1) {
      return (
        <p className="housekeeping-message">
          Select a recipe to view it!
        </p>
      );
    }
    if (loading || error || loadingGroups || loadingIngredients || fetchError) {
      return <p />;
    }
    const selected = recipes.filter(item => item.id === selectedId)[0];
    return (
      <div>
        <p className="recipe-info-name">{selected.name}</p>
        {selected.size && <p className="recipe-info-serves">{selected.size}</p>}
        <p className="recipe-info-label">ingredients</p>
        <IngredientGroup
          ingredients={ingredients}
          groups={groups}
          groupCount={groupCount}
        />
        {selected.notes && <RecipeNotes notes={selected.notes} />}
      </div>
    );
  }
}

RecipeInfo.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  selectedId: PropTypes.number,
};

RecipeInfo.defaultProps = {
  recipes: {},
  error: false,
  loading: false,
  selectedId: 1,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RecipeInfo);
