import React, { Component } from 'react';


export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-12 center" style={{marginTop: '200px'}}>
          <h1>404 Not Found</h1>
          <p>Incorrect url</p>
        </div>
      </div>
    )
  }
}
