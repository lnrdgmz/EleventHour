import '../../public/styles/datePicker.scss';
import React, { Component } from 'react';

import moment from 'moment';
import InputMoment from 'input-moment';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      m: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
handleChange(m) {
    this.setState({ m });
};

handleSave() {
  console.log('saved', this.state.m.format('YYYY-MM-DD'));
};

  render() {
    return (
      <div className="calWidget">
        <form>
        <div className="input">
          <input
            type="text"
            value={this.state.m.format('LLLL')}
            readOnly
            className="dateTime"
          />
        </div>
        <InputMoment
          moment={this.state.m}
          onChange={this.handleChange}
          onSave={this.handleSave}
        />
        </form>
      </div>
    );
  }
}
export default DatePicker;