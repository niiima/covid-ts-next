import { useEffect, useState } from 'react'
import Draggable from 'react-draggable';
import useWindowSize from '../hooks/useWindowSize';
const WithDraggable = (props) => {
  // state = {
  //   activeDrags: 0,
  //   deltaPosition: {
  //     x: 0, y: 0
  //   },
  //   controlledPosition: {
  //     x: -400, y: 200
  //   }
  // };

  const [deltaPosition, setDeltaPosition] = useState({
    x: 0, y: 0
  })
  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    }
    );
  };


  const [activeDrags, setActiveDrags] = useState(0);
  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  //const [activeDrags, setactiveDrags] = useState(initialState)
  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  // For controlled component
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 })
  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x: x - 10, y });
  };

  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    // this.setState({ controlledPosition: { x, y: y - 10 } });
    setControlledPosition({ x, y: y - 10 });

  };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    onStop();
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };
  //const {deltaPosition, controlledPosition} = this.state;
  // Hook

  // const eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', e);
  //   console.log('Data: ', data);
  // };


  return (
    <Draggable {...dragHandlers}
      axis={useWindowSize().width > 700 ? "x" : "y"}
      // handle=".handle"
      // defaultPosition={{ x: 0, y: 0 }}
      // position={null}
      grid={[25, 25]}
      // scale={1}
      bounds="body"
    >
      {props.children}
    </Draggable>
  )
}

export default WithDraggable;