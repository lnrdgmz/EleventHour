import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class AddressInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    });
    this.props.handleAddressSelect(address);
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    });
    this.props.handleAddressChange(address);
  }

  render() {
    const cssClasses = {
      root: 'address-input ui input huge focus modalInput',
      input: '',
      autocompleteContainer: 'autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="autocomplete-suggestion-item">
        <i className='fa fa-map-marker AddressInput__suggestion-icon' />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'AddressInput__input',
      id: "my-input-id",
    }

    return (
      <div className='page-wrapper'>
        <div className='container'>
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
          />
        </div>
      </div>
    )
  }
}

export default AddressInput;
