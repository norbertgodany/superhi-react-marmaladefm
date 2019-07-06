/* global Mixcloud */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";
import Show from "./Show";

import mixesData from "../data/mixes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // whether a mix is currently playing
      playing: false,
      // the id of the current mix
      currentMix: "",
      mixIds: mixesData,
      mixes: [],
      mix: null
    };
  }

  // /djcity/dj-dime/

  fetchMixes = async () => {
    const { mixIds } = this.state;
    console.log(mixIds);

    // here we loop over our mix ids and fetch each other
    mixIds.map(async id => {
      try {
        const response = await fetch(
          // we add the id to make it a dynamic segment
          `https://api.mixcloud.com${id}`
        );
        // always remember await whe using fetch in an async function
        const data = await response.json();
        // put the mix into our state
        this.setState((prevState, props) => ({
          // here we add our data onto the end of all of our previous state using the spread operator
          mixes: [...prevState.mixes, data]
        }));
      } catch (error) {
        console.log(error);
      }
    });
  };

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
    this.fetchMixes();
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
    // this makes a variable from the first mix in the array
    // if the array is empty, we assign it a default value of an empty object {}
    const [firstMix = {}] = this.state.mixes;

    return (
      <Router>
        <div>
          <div className="flex-l justify-end ">
            <FeaturedMix
              {...this.state}
              {...this.actions}
              {...firstMix}
              id={firstMix.key}
            />
            <div className="w-50-l relative z-1">
              <Header />
              {/* Here we are passing down all the state and the actions object to the Home component */}
              <Route
                exact
                path="/"
                render={() => <Home {...this.state} {...this.actions} />}
              />
              <Route
                path="/archive"
                render={() => <Archive {...this.state} {...this.actions} />}
              />
              <Route path="/about" render={() => <About {...this.state} />} />
              <Route
                path="/show/:slug"
                // Here we pass in the route params so that we can access the url of the current show page
                render={routeParams => (
                  <Show {...routeParams} {...this.state} />
                )}
              />
            </div>
          </div>
          {/* AudioPlayer */}
          <iframe
            // this gets the element inside react
            ref={player => (this.player = player)}
            className="db fixed bottom-0 z-5"
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
            frameBorder="0"
          />
        </div>
      </Router>
    );
  }
}

export default App;
