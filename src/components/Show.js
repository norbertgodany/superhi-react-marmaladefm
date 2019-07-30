import React, { Component } from "react";
import Stat from "./Stat";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mix: {}
    };
  }

  // componentWillReceiveProps runs every time our component gets some new props, rather than just one like componentDidMount , meaning that we can get and update the props everytime some new ones comes in
  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    const { mixes } = nextProps;

    // here we grab the mix that has a slug that matches our params from the url
    const [firstMix = {}] = mixes.filter(mix => mix.slug === match.params.slug);

    this.setState({
      mix: firstMix
    });
  }

  render() {
    const { match } = this.props;
    const { mix } = this.state;
    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center lh-copy">
          <p>{mix.description}</p>

          <Stat statName="Plays" statNumber={mix.play_count} statWord="times" />
          <Stat
            statName="Uploaded"
            statNumber={mix.created_time}
            statWord="days ago"
          />
          <Stat
            statName="Lasting for"
            statNumber={mix.audio_length / 60}
            statWord="minutes"
          />
        </div>
      </div>
    );
  }
}

export default Show;
