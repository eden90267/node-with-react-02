import React, {Component} from 'react';
import {DropDownMenu, MenuItem} from 'material-ui';

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class DropDownMenuSimpleExample extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      value: 1
    };
  }

  handleChange = (event, index, value) => {
    switch (index) {
      case 4:
        this.props.logout();
        return;
      default:
        return;
    }
  };

  render() {
    return (
      <div>
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText={`使用者： ${this.props.title}`}/>
          <MenuItem value={2} primaryText="Every Night"/>
          <MenuItem value={3} primaryText="Weeknights"/>
          <MenuItem value={4} primaryText="Weekends"/>
          <MenuItem value={5} primaryText="登出"/>
        </DropDownMenu>
      </div>
    );
  }

}