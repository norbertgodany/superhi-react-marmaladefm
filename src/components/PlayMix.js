import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import actions from "../store/actions";

// this component wraps around anything that when we clickW
// will start playing a mix for us, it provides us functionality rather than any design
const PlayMix = ({ playMix, currentMix, playing, children, className, id, fromMixCloud }) => (
  // when our currenntly playing mix equals the id of the mix
  // that this components refers to, we will add a class name
  // of playing
  <div
    className={classNames({
      // it's going to add our custom classNames only when they're present
      [className]: className,
      // className on the left, true/false on the right (here we test things from our redux state)

      // mixcloud takes control of actually playing a mix, and the event and the playstate will both
      // will come from there
      playing: id === currentMix && playing && fromMixCloud,
      // when we request to play a mix, things are not loaded yet, so
      // we need to show a loading state, and we do this by seeing
      // where the event has come from
      loading: id === currentMix && !playing && !fromMixCloud
    })}
    onClick={() => playMix({ currentMix: id, fromMixCloud: false })}
  >
    {children}
  </div>
);

export default connect(
  state => state,
  actions
)(PlayMix);
