// TODO: Probably move the loadscript to utils
// the file name const at least because it's also
// being used on FactoryActionPlans.jsx
import React, { Component } from 'react';

export default class ScoringTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: -1,
    };

    this.dotClass = this.dotClass.bind(this);
    this.scoreClass = this.scoreClass.bind(this);
  }

  dotClass(value) {
    if (value.get('warningCase') === value.get('value')) {
      return 'score-dot score-dot-yellow';
    } else if (value.get('failureCase') === value.get('value')) {
      return 'score-dot score-dot-red';
    }

    return 'score-dot';
  }

  scoreClass(score) {
    if (score < 70) {
      return 'lot-score lot-score-red';
    } else if (score < 90) {
      return 'lot-score lot-score-yellow';
    }
    return 'lot-score lot-score-green';
  }

  render() {
    const { scores } = this.props;

    const listItems = scores.get('scores').map((score, index) => {
      const scoreItem = score.get('values').entrySeq().map(([key, value]) => (
        <div className="lot-score-attribute" key={key}>
          <div className="lot-score-attribute-name">
            <div className={this.dotClass(value)} /> { key }
          </div>
          <div className="lot-score-value">{ value.get('value') }</div>
        </div>));

      return (
        // eslint-disable-next-line
        <div className="lot-card" key={index} >
          <div className="lot-card-header">
            <div className="lot-data">
              <p className="lot-name">Lote: { score.get('lot') }</p>
              <p>{ score.get('name') }</p>
            </div>
            <div className={this.scoreClass(score.get('totalScore'))}>
              <p>{ score.get('totalScore') }</p>
            </div>
          </div>
          <div className="lot-score-attributes">
            { scoreItem }
          </div>
        </div>);
    });

    return (
      <div className="lot-cards">
        { listItems }
      </div>
    );
  }
}
