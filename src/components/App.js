import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import FeaturedMix from "./FeaturedMix";
import Header from "./Header";
import Home from "./Home";
import Archive from "./Archive";
import About from "./About";
import Show from "./Show";
import Player from "./Player";

import mixesData from "../data/mixes";
import actions from "../store/actions";

class App extends Component {
  fetchMixes = async () => {
    const { addMix } = this.props;

    // here we loop over our mix ids and fetch each other
    mixesData.map(async id => {
      try {
        const response = await fetch(
          // we add the id to make it a dynamic segment
          `https://api.mixcloud.com${id}`
        );
        // always remember await whe using fetch in an async function
        const data = await response.json();
        // put the mix into our state
        addMix(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentDidMount() {
    this.fetchMixes();
  }

  render() {
    // this makes a variable from the first mix in the array
    // if the array is empty, we assign it a default value of an empty object {}
    const [firstMix = {}] = this.props.mixes;

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
              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />

              <Route
                path="/show/:slug"
                // Here we pass in the route params so that we can access the url of the current show page
                render={routeParams => (
                  <Show {...routeParams} {...this.state} />
                )}
              />
            </div>
          </div>
          {/* Audio player */}
          <Player />
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state,
  actions
)(App);
