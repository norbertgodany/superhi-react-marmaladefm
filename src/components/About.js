import React from "react";
import Stat from "./Stat";
import { connect } from "react-redux";

const About = ({ mixes }) => (
  <div className="ph3 ph4-l pad-bottom mb5">
    <div className="measure center lh-copy">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p className="mb4">
        Whether you're into hiphop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat... we have you covered!
      </p>
      <Stat
        statName="Featuring..."
        statNumber={mixes.length}
        statWord="mixes"
      />
      {/* play_count */}
      <Stat
        statName="Played..."
        statNumber={mixes.reduce(
          (accum, current) => accum + current.play_count,
          0
        )}
        statWord="times"
      />
      {/* audio_length */}
      <Stat
        statName="With..."
        statNumber={mixes.reduce(
          (accum, current) => accum + current.audio_length,
          0
        )}
        statWord="seconds"
      />
    </div>
  </div>
);

// here we connect our component to our redux state
// we pass it our entire state and all of our actions
// this is a higher order component (a wrapper component)
// that provides our About component with all our data
export default connect(state => state)(About);
