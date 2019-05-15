import React from 'react'

// this component wraps around anything that when we click
// will start playing a mix for us, it provides us functionality rather than any design
const PlayMix = ({ playMix, id, currentMix, playing, children }) => (
  // when our currenntly playing mix equals the id of the mix
  // that this components refers to, we will add a class name
  // of playing
  <div
    className={`pointer ${id === currentMix && playing && 'playing'}`}
    onClick={() => playMix(id)}
  >
    {children}
  </div>
)

export default PlayMix