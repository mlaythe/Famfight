import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        HomeContainer
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

HomeContainer.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);