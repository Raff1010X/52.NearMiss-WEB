import useScroll from '../../hooks/useScroll'
import Intro from './Intro'
import Description from './Description'

import './main.css'

const Main = () => {
  useScroll()

  return (
    <div id="main">
      <Intro />
      <Description />
    </div>
  )
}

export default Main
