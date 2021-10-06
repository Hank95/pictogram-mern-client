import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StyleBar from "./StyleBar";
const SketchPad = ({ handleSave }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState([]);
  const [pathAry, setPathAry] = useState([]);

  const [formData, setFormData] = useState({
    color: "black",
    stroke: 3,
  });

  const handleData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const newCanvas = canvasRef.current;
    newCanvas.width = 500;
    newCanvas.height = 500;
    newCanvas.style.width = `${500}px`;
    newCanvas.style.height = `${500}px`;
    newCanvas.style.border = "3px solid black";
    newCanvas.fillStyle = "white";
    setCanvas(newCanvas);
  }, []);
  useEffect(() => {
    if (canvas) {
      const context = canvas.getContext("2d");
      context.scale(1, 1);
      context.lineCap = "round";
      context.strokeStyle = formData.color;
      context.lineWidth = formData.stroke;
      context.fillStyle = "white";
      contextRef.current = context;
    }
  }, [canvas, formData.color, formData.stroke]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setPoints([]);
  };
  const endDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setPathAry((prevState) => [...prevState, points]);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // setPoints([...points, { offsetX, offsetY, formData }]);
    setPoints((prevState) => [...prevState, { offsetX, offsetY, formData }]);
  };

  const drawPaths = (newPathAry) => {
    // delete everything
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    // draw all the paths in the paths array
    newPathAry.forEach((path) => {
      contextRef.current.beginPath();
      contextRef.current.moveTo(path[0].offsetX, path[0].offsetY);
      for (let i = 1; i < path.length; i++) {
        contextRef.current.strokeStyle = path[i].formData.color;
        contextRef.current.lineWidth = path[i].formData.stroke;

        contextRef.current.lineTo(path[i].offsetX, path[i].offsetY);
      }
      contextRef.current.stroke();
    });
    contextRef.current.strokeStyle = formData.color;
    contextRef.current.lineWidth = formData.stroke;
  };

  useEffect(() => {}, [pathAry]);

  useEffect(() => {}, [formData]);

  const Undo = () => {
    // remove the last path from the paths array

    const newPathAry = pathAry.slice(0, -1);
    setPathAry(newPathAry);
    // draw all the paths in the paths array
    drawPaths(newPathAry);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Sketch>
      <StyleBar handleData={handleData} formData={formData} />
      <Container>
        <canvas
          // className="canvas"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
        <div>
          <Title className="title" htmlFor="title">
            Title:
          </Title>
          <InputField
            className="inputField"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Your Masterpiece"
          />
          <Button onClick={(e) => handleSave(e, title)}>Save</Button>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button onClick={Undo}>Undo</Button>
        </div>
      </Container>
    </Sketch>
  );
};

const Sketch = styled.div`
  /* align-items: center;
  text-align: center; */
  background-color: rgb(244, 247, 246);
`;
const Container = styled.div`
  right: 150px;
  width: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.label`
  font-size: 20px;
  text-emphasis: bold;
`;
const InputField = styled.input`
  border-radius: 5px;
  border: solid, 3px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 20px;
  border: solid, 3px;
  margin: 1px;
  &:hover {
    color: orangered;
  }
`;

export default SketchPad;
