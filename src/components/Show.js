import React, { Component } from "react";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mix: null
    };
  }

  componentDidMount() {
    const { mixes, match } = this.props;

    // here we grab the mix that has a slug that matches our params from the url
    const [firstMix = {}] = mixes.filter(mix => mix.slug === match.params.slug);
    console.log(firstMix);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Show page</h1>
        <p>{match.params.slug}</p>
      </div>
    );
  }
}

export default Show;
