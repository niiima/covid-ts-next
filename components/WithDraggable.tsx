import { useState } from 'react'
import Draggable from 'react-draggable';
import useWindowSize from '../hooks/useWindowSize';
const WithDraggable = (props) => {

  const [activeDrags, setActiveDrags] = useState(0);
  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };

  return (
    <Draggable {...dragHandlers}
      axis={useWindowSize().width > 700 ? "both" : "y"}
      grid={[25, 25]}
      bounds="body"
    >
      {props.children}
    </Draggable>
  )
}

export default WithDraggable;