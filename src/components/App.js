/* global Mixcloud */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'

const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // whether a mix is currently playing
      playing: false,
      // the id of the current mix
      currentMix: '',
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
  }

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
      this.setState({
        currentMix: mixName
      });
      // load a mix by it's name and start playing it immediately
      this.widget.load(mixName, true);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flex-l justify-end ">
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              <Header />
              {/* Here we are passing down all the state and the actions object to the Home component */}
              <Route exact path="/" component={() => <Home {...this.state} {...this.actions} />} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />
            </div>
          </div>
          {/* AudioPlayer */}
          <iframe
            // this gets the element inside react
            ref={player => this.player = player}
            className="db fixed bottom-0 z-5"
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
            frameBorder="0" >
          </iframe>
        </div>
      </Router>
    );
  }
}

export default App;