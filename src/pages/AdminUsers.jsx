import React, { Component } from 'react';
import Poly from '../utils/i18n';

import Header from '../components/Header';
import CardHeader from '../components/CardHeader';
import CreateUser from '../components/CreateUser';

class AdminUsers extends Component {
  createUser() {
  }

  render() {
    return (
      <div className="admin-users">
        <Header />
        <div className="card card-2">
          <CardHeader
            title={Poly.t("Admin Users")}
            rightContent={<CreateUser 
              type="admin"
              submit={this.createUser}
            />}
          />
        </div>
      </div>
    )
  }
}

export default AdminUsers;
