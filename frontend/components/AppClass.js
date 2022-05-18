import React from 'react'
import axios from 'axios'






//coordinates : "(2,2)",
//board: [null,null,null,null,null,null,null,null,null,],
//message: "",

const URL = "http://localhost:9000/api/result"
/*
const [x, y] = getCoordinates(grid)
console.log(`(${x}, ${y})`)
*/
export default class AppClass extends React.Component {
constructor(){
  super()
this.state= {
 coordinatesX: 2,
 coordinatesY: 2,
 totalMoves:0,
 board: ["","","","","B","","","","",],
 message:"",
 email:"",
}
}

 handleUp =()=>{
  if(this.state.coordinatesY === 1){
    this.setState({
      ...this.state,
      message:"You can't go up"
    })
  }else{
    this.setState({
      ...this.state,
      coordinatesY: this.state.coordinatesY-1,
      totalMoves: this.state.totalMoves +1,
      board:this.mapCoordinatesWithPosition(this.state.coordinatesX, this.state.coordinatesY -1)
    })
  }
}
 handleDown =()=>{
  if(this.state.coordinatesY === 3){
    this.setState({
      ...this.state,
      message:"You can't go down"
    })
  }else{
    this.setState({
      ...this.state,
      coordinatesY: this.state.coordinatesY +1,
      totalMoves: this.state.totalMoves +1,
      board: this.mapCoordinatesWithPosition(this.state.coordinatesX, this.state.coordinatesY +1)
    })
  }
}
handleRight = ()=>{
  if(this.state.coordinatesX === 3){
    this.setState({
      ...this.state,
      message:"You can't go right"
    })
  }else {
    this.setState({
      ...this.state,
      coordinatesX: this.state.coordinatesX +1,
      totalMoves: this.state.totalMoves +1,
      board: this.mapCoordinatesWithPosition( this.state.coordinatesX +1,this.state.coordinatesY)

    });
  }
}
 handleLeft = ()=>{
  if(this.state.coordinatesX === 1){
    this.setState({
      ...this.state,
      message: "You can't go left"
    })
  }else{
    this.setState({
      ...this.state,
      coordinatesX: this.state.coordinatesX -1,
      totalMoves: this.state.totalMoves +1,
      board: this.mapCoordinatesWithPosition(this.state.coordinatesX -1,this.state.coordinatesY)
    })
  }
}

mapCoordinatesWithPosition = (X,Y)=>{
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


 reset = () =>{
  this.setState({
    ...this.state,
    coordinatesX:2,
    coordinatesY: 2,
    totalMoves:0,
    message: "",
    email: "",
    board: ["","","","","B","","","","",],
   
  })
}

onEmailChange = evt =>{
 this.setState({
   ...this.state,
   email:evt.target.value
 })
}
 handleSubmit = (event)=>{
   event.preventDefault();
   const payload ={
     "x":this.state.coordinatesX,
     "y": this.state.coordinatesY,
    "steps": this.state.totalMoves,
    "email": this.state.email
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
  this.setState({
    ...this.state,
    message: err.response.data.message,
  

  })
  })
}


 



//if the current value X == 1 && y===1 return coordinates: "(1,1)"
//make the function click on the div which will make the div active 
//this displays the current co-ordinates 

//after you get the co-ordinates, it should chanel each div 




  render() {
    const { className } = this.props
 
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.coordinatesX},{this.state.coordinatesY})</h3>
          {
            (this.state.totalMoves === 1 ) 
            ?<h3 id="steps">You moved {this.state.totalMoves} time</h3>
            : <h3 id="steps">You moved {this.state.totalMoves} times</h3>
             
           }
        </div>
        <div id="grid">

          {this.state.board.map((value,index)=>{
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
            
              
     

         {/* <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        <div className="square"></div>  */}
        

        
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
         {/*When buttons are clicked we need the div to become active 
         */}
          <button id="left" onClick={this.handleLeft}>LEFT</button>
          <button id="up" onClick={this.handleUp} >UP</button>
          <button id="right" onClick = {this.handleRight} >RIGHT</button>
          <button id="down" onClick={this.handleDown}>DOWN</button>
          <button id="reset" onClick = {this.reset}>reset</button>
        </div>
        <form onSubmit = {this.handleSubmit} >
          <input
          
          value = {this.state.email} 
          onChange = {this.onEmailChange} 
          id="email"
          type="email"
         placeholder="type email"
           >  
           </input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}