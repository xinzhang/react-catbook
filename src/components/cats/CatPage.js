import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import HobbyList from '../hobbies/HobbyList';
import {bindActionCreators} from 'redux';
import * as catActions from '../../actions/catActions';
import CatForm from './CatForm';

class CatPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
      saving: false,
      cat: Object.assign({}, this.props.cat),
      catHobbies: Object.assign([], [...this.props.catHobbies]),
      checkBoxHobbies: Object.assign([], [...this.props.checkBoxHobbies])
    };

    //bind this to the component function.
    this.toggleEdit = this.toggleEdit.bind(this);
    this.saveCat = this.saveCat.bind(this);
    this.updateCatState = this.updateCatState.bind(this);
    this.updateCatHobbies = this.updateCatHobbies.bind(this);
    this.deleteCat = this.deleteCat.bind(this);
  }

  //set up state only when props ready
  componentWillReceiveProps(nextProps) {
    if (this.props.cat.id != nextProps.cat.id) {
      this.setState({cat: Object.assign({}, nextProps.cat)});
    }
    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
      this.setState({catHobbies: [...nextProps.catHobbies], checkBoxHobbies: [...nextProps.checkBoxHobbies]});
    }

    this.setState({saving: false, isEditing: false});
  }

  updateCatHobbies(event) {
      const cat = this.state.cat;
      const hobbyId = event.target.value;
      const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0];
      const checked = !hobby.checked;
      hobby['checked'] = !hobby.checked;
      if (checked) {
        cat.hobby_ids.push(hobby.id);
      } else {
        cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id));
      }
      this.setState({cat: cat});

    }

  //update each field - you have to do it yourself there is no auto binding.
  updateCatState(event) {
      const field = event.target.name;
      const cat = this.state.cat;
      cat[field] = event.target.value;
      return this.setState({cat: cat});
  }

  toggleEdit() {
      this.setState({isEditing: !this.state.isEditing});
  }

  saveCat(event) {
      event.preventDefault();
      this.setState({saving: true});
      this.props.actions.updateCat(this.state.cat);
  }

  deleteCat(event) {
    this.props.actions.deleteCat(this.state.cat);
  }

  render() {
    if (this.state.isEditing) {
      return(
        <div>
            <h1>edit cat</h1>
            <CatForm
                cat={this.state.cat}
                hobbies={this.state.checkBoxHobbies}
                onSave={this.saveCat}
                onChange={this.updateCatState}
                onHobbyChange={this.updateCatHobbies} />

            <button onClick={this.toggleEdit}>back</button>
        </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.props.cat.name}</h1>
        <p>breed: {this.props.cat.breed}</p>
        <p>weight: {this.props.cat.weight}</p>
        <p>temperament: {this.props.cat.temperament}</p>
        <HobbyList hobbies={this.props.catHobbies} />
        <button className="btn btn-default" onClick={this.toggleEdit}>edit</button>
        <button className="btn btn-default" onClick={this.deleteCat}>delete</button>
      </div>
    );
  }
}

CatPage.propTypes = {
  cat: PropTypes.object.isRequired,
  catHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function hobbiesForCheckBoxes(hobbies, cat=null) {
  return hobbies.map(hobby => {
    if (cat && cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
      hobby['checked'] = true;
    } else {
      hobby['checked'] = false;
    }
    return hobby;
  });
}

function collectCatHobbies(hobbies, cat) {

  let selected = hobbies.map(hobby => {
    if (cat.hobby_ids.filter(hobbyId => hobbyId === hobby.id).length > 0) {
      return hobby;
    }
  })
  return selected.filter(el => el !== undefined)
}

function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies)

  let checkBoxHobbies = [];
  let catHobbies = [];
  let cat = {name: '', breed: '', weight: '', temperament: '', hobby_ids: []};

  const catId = ownProps.params.id;

  if (catId && state.cats.length > 0 && state.hobbies.length > 0) {
    cat = Object.assign({}, state.cats.find(cat => cat.id == catId));

    if (cat.id && cat.hobby_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, cat);
      catHobbies = collectCatHobbies(stateHobbies, cat);
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies);
    }
  }

  return {
    cat: cat,
    checkBoxHobbies: checkBoxHobbies,
    catHobbies: catHobbies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(catActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatPage);
