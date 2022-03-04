import {  useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const clearButton = document.querySelector('.clear');

  clearButton.addEventListener('click', clearCanvas);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false)
  


  useEffect(() => {


    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width =  `${window.innerWidth}px`
    canvas.style.height =  `${window.innerHeight}px`

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round";

    contextRef.current = context;
  },[])
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const stroke_weight = document.querySelector('.stroke-weight');
    const color_picker = document.querySelector('.color-picker');
    const context = canvas.getContext("2d");

    context.strokeStyle = color_picker.value;
    context.lineWidth = stroke_weight.value;
    contextRef.current = context;
  })

    useEffect(() => {
    const canvas = canvasRef.current;
    const stroke_weight = document.querySelector('.stroke-weight');
    const color_picker = document.querySelector('.color-picker');
    const context = canvas.getContext("2d");

    context.strokeStyle = color_picker.value;
    context.lineWidth = stroke_weight.value;
    contextRef.current = context;
  })

// di accronym for drawing input
  const diStart = ({nativeEvent})  => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }
  const diStop = () => {
    contextRef.current.closePath()
    setIsDrawing(false)

  }
  const drawing = ({nativeEvent}) => {
    if(isDrawing){
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }
  function clearCanvas () {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  
  // TODO: Add eraser button functionality for .eraser
  return (
    <canvas
      onMouseDown = {diStart}
      onMouseUp = {diStop}
      onMouseMove = {drawing}
      ref={canvasRef}
    />
   );
  

}

export default App;

