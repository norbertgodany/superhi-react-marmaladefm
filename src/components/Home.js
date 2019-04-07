import React from 'react';
import Mix from './Mix'

const Home = props => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-l">
    {/* here we loop through all of our mixes */}
    <div className="mix mb4">
      {/* Here we just pass the props straight through */}
      <Mix
        name="CLASSIC TRANCE GENERATIONS"
        id='/house_kidd/classic-trance-generations-post-2009-classics/'
        {...props} />
    </div>

    <div className="mix mb4">
      {/* Here we just pass the props straight through */}
      <Mix
        name="TECH HOUSE CLASSICS"
        id='/house_kidd/tech-house-classics-part-1-special-edition-mix-2017/'
        {...props} />
    </div>

    <div className="mix mb4">
      {/* Here we just pass the props straight through */}
      <Mix
        name="CLASSIC FUNKY HOUSE 1996-2006"
        id='/house_kidd/classic-funky-house-1996-2006-part-2-special-edition-mix-2017/'
        {...props} />
    </div>

  </div>
)

export default Home;