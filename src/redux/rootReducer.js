import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  let value;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type + 'State';
      return {...state, [field]: getModifiedStateValue(state, field, action)};
    case CHANGE_TEXT:
      field = 'dataState';
      return {...state, currentText: action.data.value, [field]: getModifiedStateValue(state, field, action)};
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      value = state[field] || {};
      action.data.ids.forEach(id => value[id] = {...value[id], ...action.data.value});
      return {...state, [field]: value, currentStyles: {...state.currentStyles, ...action.data.value}};
    case CHANGE_TITLE:
      return {...state, titleState: action.data};
    default: return state;
  }
}

function getModifiedStateValue(state, field, action) {
  const value = state[field] || {};
  value[action.data.id] = action.data.value;
  return value;
}
