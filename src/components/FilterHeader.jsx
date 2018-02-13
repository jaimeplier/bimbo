import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import CardHeader from './CardHeader';

const styles = {
  main: {
    fontSize: '12px',
    height: '20px',
  },
  borderBottom: {
    border: 'none',
  },
  noMargin: {
    margin: 0,
    padding: '0 34px 0 0',
  },
  button: {
    right: 0,
    padding: 0,
  },
  item: {
    fontSize: '12px',
    height: '20px',
  },
  noPadding: {
    padding: 0,
  },
};

const componentProps = {
  style: styles.main,
  labelStyle: styles.noMargin,
  underlineStyle: styles.borderBottom,
  iconStyle: styles.button,
  menuItemStyle: styles.main,
};

export default class FilterHeader extends Component {
  render() {
    return (
      <div className="card card-2 filter-header">
        <CardHeader
          title={this.props.title}
          noMargin
          rightContent={
            <div className="header-filters">
              <DropDownMenu
                value={this.props.organizationValue}
                onChange={this.props.handleOrganizationChange}
                {...componentProps}
              >
                <MenuItem value="todos" primaryText="Todas" />
                { this.props.organizations && this.props.organizations.map(item =>
                  <MenuItem value={item.get('slug')} key={item.get('id')} primaryText={item.get('name')} />)}
              </DropDownMenu>

              <DropDownMenu
                value={this.props.productValue}
                onChange={this.props.handleProductChange}
                {...componentProps}
              >
                <MenuItem value="todos" primaryText="Todos" />
                { this.props.products && this.props.products.map(item =>
                  <MenuItem value={item.get('slug')} key={item.get('id')} primaryText={item.get('name')} />)}
              </DropDownMenu>

              <DropDownMenu
                value={this.props.timeValue}
                onChange={this.props.handleTimeChange}
                {...componentProps}
              >
                <MenuItem value="last-24" primaryText="Last 24hrs" />
                <MenuItem value="last-week" primaryText="Last week" />
                <MenuItem value="last-month" primaryText="Last month" />
                <MenuItem value="last-year" primaryText="Last year" />
              </DropDownMenu>
            </div>
          }
        />
      </div>
    );
  }
}
