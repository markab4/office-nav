import React from "react";
import Autosuggest from 'react-autosuggest';
import {fetchJSONnoArray } from "../api/staff_api_functions";


const staff = fetchJSONnoArray();

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = staff.filter(language => regex.test(language.fullName));

  if (suggestions.length === 0) {
    return [
      { isAddNew: true }
    ];
  }

  return suggestions;
}

const renderInputComponent = inputProps => (
  <div>
    <input id="my-custom-input" {...inputProps} />
  </div>
);

export default class Suggestions extends React.Component {
  constructor() {
    super();
//    this.getValue = this.getValue.bind(this);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  getValue() {
 //   console.log(this.state.value);
    return this.state.value;
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    this.props.getInputData(newValue);
//    this.getValue()
  };

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.value;
    }

    return suggestion.fullName;
  };

  renderSuggestion = suggestion => {
    return suggestion.fullName;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    if (suggestion.isAddNew) {
      // console.log('Add new:', this.state.value);
    }
  };

  doSearch(){
    // console.log(this.state.value);
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.props.inputPlaceholder,
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions.slice(0,6)}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={renderInputComponent}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps}
          onSubmit={this.doSearch}
        />
      </div>
    );
  }
}
