import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CatList from './CatList';

class CatsPage extends React.Component {
  render() {
    const cats = this.props.cats;
    return(
      <div className="col-md-12">
        <h1>Cats</h1>
        <div className="col-md-4">
          <CatList cats={cats} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    )
  }
}

CatsPage.propTypes = {
  cats: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    cats: state.cats
  }
}

export default connect(mapStateToProps)(CatsPage);
