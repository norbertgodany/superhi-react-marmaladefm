/* global Mixcloud */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import FeaturedMix from './FeaturedMix'
import Header from './Header'

const Home = () => <h1>Home</h1>;
const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;

class App extends Component {

  mountAudio = async () => {
    var widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for the widget to be ready before continuing
    await widget.ready
    await widget.play()
    console.log(widget)
  }

  componentDidMount() {
    // when our app component mounted on the page our componentDidMount gets called, and we run our mountAudio widget
    this.mountAudio()
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flex-l justify-end ">
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              <Header />
              <Route exact path="/" component={Home} />
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