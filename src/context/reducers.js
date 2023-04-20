import { STATENAME, TYPES } from "../constants";

function saveState(state) {
  localStorage.setItem(STATENAME, JSON.stringify(state));
}

function updateLang(state, payload) {
  const newState = { ...state, lang: payload };
  saveState(newState);
  return newState;
}

function updateUser(state, payload) {
  //console.log('Update user reducer '+ JSON.stringify(payload));
  const newState = { ...state, user: payload };
  saveState(newState);
  return newState;
}

function updateCategories(state, payload) {
  //console.log('Update categories reducer '+ JSON.stringify(payload));
  const newState = { ...state, categories: payload };
  saveState(newState);
  return newState;
}

export default function AppReducer(state, { type, payload }) {
  switch (type) {
    case TYPES.UPDATE_LANG:
      return updateLang(state, payload);
    case TYPES.UPDATE_USER:
      return updateUser(state, payload);
    case TYPES.UPDATE_CATEGORIES:
      return updateCategories(state, payload);
    default:
      throw new Error("TYPE NOT FOUND");
  }
}