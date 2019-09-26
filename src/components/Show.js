import React, { Component } from "react";
import Stat from "./Stat";
import differenceInDays from "date-fns/difference_in_days";

import { connect } from "react-redux";

const Tag = ({ name, url }) => (
  <div className="mr2 mb2 o-70">
    <a
      className="block f6 link blue b ba bw1 b--blue gray br2 pv1 ph2 lh-title"
      href={url}
      taget="_blank"
    >
      {name}
    </a>
  </div>
);

const Tags = ({ tags = [] }) => (
  <div className="tags flex flex-wrap">
    {tags.map(tag => (
      <Tag {...tag} />
    ))}
  </div>
);

const Show = ({ mix }) => (
  <div className="ph3 ph4-l pad-bottom">
    <div className="measure center lh-copy">
      <Tags tags={mix.tags} />

      <p>{mix.description}</p>

      <Stat statName="Plays" statNumber={mix.play_count} statWord="times" />

      {/* new Date() creates a date/time stamp from the current time */}
      {/* differenceInDays(new Date(), mix.created_time) */}

      <Stat
        statName="Uploaded"
        statNumber={differenceInDays(new Date(), mix.created_time)}
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

// this is what we call a selector, it grabs a certain piece of data from our state
const getMix = (mixes, slug) => {
  const [mix = {}] = mixes.filter(mix => mix.slug === slug);
  return mix;
};

export default connect((state, props) => ({
  ...state,
  mix: getMix(state.mixes, props.match.params.slug)
}))(Show);
