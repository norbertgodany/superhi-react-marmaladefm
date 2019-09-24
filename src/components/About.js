import React from "react";
import Stat from "./Stat";
import { connect } from "react-redux";

import actions from "../store/actions";

const About = ({ mixes, currentMix }) => (
  <div className="ph3 ph4-l pad-bottom mb5">
    <div className="measure center lh-copy">
      <div>
        <button>Set the redux state</button>
        <h1>{currentMix}</h1>
      </div>

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

export default connect(state => state, actions)(About);
