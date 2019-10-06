import React, { Component } from "react";
import { connect } from "react-redux";
import PlayMix from "./PlayMix";
import PlayButton from "./PlayButton";
import { Link } from "react-router-dom";

const FeaturedMix = ({ name, pictures = {}, picture_primary_color, title, id, slug, ...props }) => (
  <div
    className="w-50-l vh-100 flex items-center justify-center cover bg-center bg-center bg-featured pad-bottom fixed-l left-0 mix-overlay"
    style={{
      backgroundImage: `url(${pictures.extra_large})`,
      backgroundColor: `#${picture_primary_color}`
    }}
  >
    <div className="w-100 tc pa3 relative z-2">
      <p className="b biryani f6 white ttu">{title}</p>
      <h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>

      <Link to={`/show/${slug}`} className="absolute absolute--fill z-3" />

      <PlayMix id={id} className="relative z-5 pointer">
        <PlayButton />
      </PlayMix>

    </div>
  </div>
);

// on the show page, we are going to set the featuredMix to be the currently visible viewed mix

// if theres a mix playing we want to set that as our featured mix

// we want to display our first mix as our featured mix

const getMix = state => {
  // here we grab the mix that has a slug that matches
  // our params from the url

  // 1. if we have a featuredMix in redux, we show that firstMix
  // 2. if theres a currently playing mix, we show that text
  // 3. otherwise we just show the first mix

  // here we use let for our varialbe, which allows us to reassign it
  // this is somethign which we cannot do with const
  let featuredMix;

  // if we have a featuredMix in our state
  if (state.featuredMix) {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.featuredMix);
  } else {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.currentMix);
  }

  const [firstMix = {}] = state.mixes;
  // return the featured mix if it exists, otherwise return the first mix
  return featuredMix || firstMix;
};

const getTitle = state => {
  if (state.featuredMix) {
    return "Currently Viewing";
  } else if (state.currentMix && state.playing) {
    return "Currently Playing";
  } else {
    return "Featured Mix";
  }
};

export default connect(state => ({
  ...getMix(state),
  // here we use our getTitle selector
  title: getTitle
}))(FeaturedMix);
