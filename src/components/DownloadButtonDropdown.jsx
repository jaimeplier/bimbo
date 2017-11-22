import React, { Component } from 'react';
import Poly from '../utils/i18n';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import {
  Download
} from 'react-feather';

export default class DownloadButtonDropdown extends Component {
  render() {
    return (
      <IconMenu
        className="float-right"
        onChange={this.props.handleDownload}
        iconButtonElement={
          <IconButton
            className="button grey-btn mu-btn-wide"
          ><Download /></IconButton>
        }
      >
        <MenuItem value="csv" primaryText={Poly.t("Download as CSV")} />
        <MenuItem value="xml" primaryText={Poly.t("Download as XML")} />
        <MenuItem value="png" primaryText={Poly.t("Download as PNG")} />
      </IconMenu>
    )
  }
}
