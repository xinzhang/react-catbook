import * as types from './actionTypes';
import catApi from '../api/CatsApi';

export function loadCats() {
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats));
    }).catch(error => {
      throw(error);
    });
  }
}

export function updateCat(cat) {
  return function(dispatch) {
    return catApi.updateCat(cat).then(responseCat => {
      dispatch(updateCatSuccess(responseCat));
    }).catch(error => {
      throw(error);
    });
  }
}

export function createCat(cat) {
  return function(dispatch) {
    return catApi.createCat(cat).then(responseCat => {
      dispatch(createCatSuccess(responseCat));
    }).catch(error => {
      throw(error);
    });
  }
}

export function deleteCat(cat) {
  return function(dispatch) {
    return catApi.deleteCat(cat).then(responseCat => {
      dispatch(deleteCatSuccess(responseCat));
    }).catch(error => {
      throw(error);
    });
  }
}

export function loadCatsSuccess(cats) {
  return {type: types.LOAD_CATS_SUCCESS, cats}
}

export function updateCatSuccess(cat) {
  return {type: types.UPDATE_CAT_SUCCESS, cat}
}

export function createCatSuccess(cat) {
  return {type: types.CREATE_CAT_SUCCESS, cat}
}

export function deleteCatSuccess(cat) {
  return {type: types.DELETE_CAT_SUCCESS, cat}
}
