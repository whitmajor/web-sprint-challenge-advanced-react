import React, {useState}from 'react'
import axios from "axios"

const URL = "http://localhost:9000/api/result"

export default function AppFunctional(props) {
  

 const[state, setState] = useState({

coordinatesX: 2,
 coordinatesY: 2,
 totalMoves:0,
 board: ["","","","","B","","","","",],
 message:"",
 email:""
  })
  
 const handleUp =()=>{
    if(state.coordinatesY === 1){
      setState({
        ...state,
        message:"You can't go up"
      })
    }else{
      setState({
        ...state,
        coordinatesY: state.coordinatesY-1,
        totalMoves: state.totalMoves +1,
        board:mapCoordinatesWithPosition(state.coordinatesX, state.coordinatesY -1)
      })
    }
  }
  const handleDown =()=>{
    if(state.coordinatesY === 3){
      setState({
        ...state,
        message:"You can't go down"
      })
    }else{
      setState({
        ...state,
        coordinatesY: state.coordinatesY +1,
        totalMoves: state.totalMoves +1,
        board: mapCoordinatesWithPosition(state.coordinatesX, state.coordinatesY +1)
      })
    }
  }
  const handleRight = ()=>{
    if(state.coordinatesX === 3){
      setState({
        ...state,
        message:"You can't go right"
      })
    }else {
      setState({
        ...state,
        coordinatesX: state.coordinatesX +1,
        totalMoves: state.totalMoves +1,
        board: mapCoordinatesWithPosition( state.coordinatesX +1,state.coordinatesY)
  
      });
    }
  }
   const handleLeft = ()=>{
    if(state.coordinatesX === 1){
      setState({
        ...state,
        message: "You can't go left"
      })
    }else{
      setState({
        ...state,
        coordinatesX: state.coordinatesX -1,
        totalMoves: state.totalMoves +1,
        board: mapCoordinatesWithPosition(state.coordinatesX -1,state.coordinatesY)
      })
    }
  }
 const mapCoordinatesWithPosition = (X,Y)=>{
    console.log("this is the index:",X ,Y)
  
    if(X === 2 && Y === 1){
      return ["","B","","","","","","","",]
    }
    if(X === 2 && Y === 2){
      return ["","","","","B","","","","",]
    }
    if(X === 2 && Y === 3){
      return ["","","","","","","","B","",]
    }
    if(X === 1 && Y === 1){
      return ["B","","","","","","","","",]
    }
    if(X === 1 && Y === 2){
      return ["","","","B","","","","","",]
    }
    if(X === 1 && Y === 3){
      return ["","","","","","","B","","",]
    }
    if(X === 3 && Y === 1){
      return ["","","B","","","","","","",]
    }
    if(X === 3 && Y === 2){
      return ["","","","","","B","","","",]
    }
    if(X === 3 && Y === 3){
      return ["","","","","","","","","B",]
  
      }
  }
 const reset = () =>{
    setState({
      ...state,
      coordinatesX:2,
      coordinatesY: 2,
      totalMoves:0,
      message: "",
      email: "",
      board: ["","","","","B","","","","",],
     
    })
  }
  
 const onEmailChange = evt =>{
   setState({
     ...state,
     email:evt.target.value
   })
  }
  const handleSubmit = (event)=>{
     event.preventDefault();
     const payload ={
       "x":state.coordinatesX,
       "y": state.coordinatesY,
      "steps": state.totalMoves,
      "email": state.email
     }
  
  
    axios.post(URL,payload)
    .then(res =>{
   this.setState({...this.state, 
    message: res.data.message, 
    email: ""
  })
    })
    .catch(err =>{
      console.log(err.response.data.message)
      setState({
      ...state,
      message: err.response.data.message,
    
  
    })
    })
  }

  return (
    <div id="wrapper" className={props.className}>
    <div className="info">
      <h3 id="coordinates">Coordinates ({state.coordinatesX},{state.coordinatesY})</h3>
      {
        (state.totalMoves === 1 ) 
        ?<h3 id="steps">You moved {state.totalMoves} time</h3>
        : <h3 id="steps">You moved {state.totalMoves} times</h3>
         
       }
    </div>
    <div id="grid">

      {state.board.map((value,index)=>{
           console.log("this is the value: ", index)
        if(value)
        {
          return (
            <div key = {index} className="square active" >
              B 
              </div>
          )
          }

        return (
          <div key={index} className = "square">
            {value}
          </div>
        )
      })}
        </div>
      
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = {handleLeft}>LEFT</button>
        <button id="up" onClick = {handleUp}>UP</button>
        <button id="right" onClick = {handleRight} >RIGHT</button>
        <button id="down" onClick = {handleDown}>DOWN</button>
        <button id="reset" onClick = {reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onClick = {onEmailChange}></input>
        <input id="submit" type="submit" onSubmit={handleSubmit}></input>
      </form>
    </div>
  )
}
