import React from 'react';
import Mix from './Mix'

const Home = ({ mixes, ...props }) => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-l mb5">
    {/* here we loop through all of our mixes */}
    {/* we sliced the array to only include the first 6 items */}
    {mixes.slice(0, 6).map(mix => (
      <div className="mix mb4">
        {/* Here we just pass the props straight through */}
        {/* Here we pass through and id for the mix to play with */}
        <Mix {...props} {...mix} id={mix.key}/>
      </div>
    ))}

  </div>
)

export default Home;