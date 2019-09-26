/* global Mixcloud */
import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";

class Player extends Component {
  componentWillReceiveProps(nextProps) {
      // if there is a new mix in the props
    if (nextProps.currentMix !== this.props.currentMix) {
        // start playing the mix
        this.widget.load(nextProps.currentMix, true)
    }
  }

  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for the widget to be ready before continuing
    await this.widget.ready;

    // using the mixcloud widget we can detect when our audio is paused
    // audio has been paused, set playing state to false
    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );
    // audio is playing, set playing state to true
    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );

    console.log(this.widget);
  };

  componentDidMount() {
    // when our app component mounted on the page our componentDidMount gets called, and we run our mountAudio widget
    this.mountAudio();
  }

  // we group together our methods into an action object
  actions = {
    togglePlay: () => {
      // we want to togglePlay() on our widget
      this.widget.togglePlay();
    },
    playMix: mixName => {
      // if th mixname is the same as the currently playing mix
      // we want to pause it instead
      const { currentMix } = this.state;
      if (mixName === currentMix) {
        // when our code sees the return statement it will stop running and exit
        return this.widget.togglePlay();
      }
      // update the currentMix in our state
      // with the mixName
      this.setState({
        currentMix: mixName
      });
      // load a mix by it's name and start playing it immediately
      this.widget.load(mixName, true);
    }
  };

  render() {
    return (
      <iframe
        // this gets the element inside react
        ref={player => (this.player = player)}
        className="db fixed bottom-0 z-5"
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
        frameBorder="0"
      />
    );
  }
}

export default connect(
  state => state,
  actions
)(Player);
