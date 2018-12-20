import React, { Component } from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import './main.css'
import './event.css'
import './Post.css'
import EventService from '../../Service/EventService';

export default class Post extends Component {
  constructor(){
    super();
    this.state={
      post:[],
      newEvent:{
        title:"",
        description:"",
        place:"",
        date:"",
        time:""

      }
    }
    this.EventService= new EventService();
  }
  showevent=()=>{
    this.EventService.showevent()
    .then(post=>this.setState({...this.state,post:post.events},() => {
      console.log(this.state)
    }))

  }
  event=(e)=>{
    e.preventDefault();
    this.EventService.event(this.state.newEvent)
    .then(()=>{
     const _post = [...this.state.post]
     console.log(this.state.newEvent)
      _post.push(this.state.newEvent)
    //  let tempState = {...this.state}
    //   tempState.post.push(newPost)

      this.setState({...this.state, post:_post, newEvent:{title:""}})
    })
    .catch(error=>(console.log(error)))
  }
  //todo: consider squashing functions
  // operateEvent(id, action) {
  //   this.EventService[action]()
  //   .then(post=>this.setState({...this.state,post}))
  //   .catch(error=>(console.log(error)))
  // }
  showeventid=(id)=>{
    this.EventService.showeventid()
    .then(post=>this.setState({...this.state,post}))
    .catch(error=>(console.log(error)))
  }
  joinevent=(eventid)=>{
    return this.EventService.joinevent()
    .then(post=>this.setState({...this.state,post}))
    .catch(error=>(console.log(error)))
  }
  deleteevent=(id)=>{
    return EventService.deleteevent()
    .then(post=>this.setState({...this.state,post}))
    .catch(error=>(console.log(error)))

  }
  onChangeInput = (input) => {
    const { name, value} = input.target;
    const _newEvent = {...this.state.newEvent}
    _newEvent[name] = value
    console.log(_newEvent)
    this.setState({...this.state, newEvent:_newEvent}, () => {
        console.log(this.state)
    })

}
componentDidMount(){
  this.showevent();
  // this.event();
  // this.showevent();
  // this.joinevent();
  // this.deleteevent();
}
  render() {
    console.log(this.state.post)
    return (
      <div>
        <div className="bgGreen">
    <div className="contEvents mgin2 padd1 bgWhite">
        <div className="contEvents_title">
            <h1>Eventos</h1>
        </div>
        {this.state.post.length ? this.state.post.map((event,index) => 
        <div className="contEvents_all radius8 padd1">
            <div className="contEvents_event bder-btm">
                <div className="contEvents_colorBox padd05 radius8"></div>
                <div className="flex space-btw">
                    <div className="contEvents_left padd1">
                    
                            <h2 className="contEvents_titleEvent fsize14" key={index}>{event.title}</h2>
                            <p className="contEvents_descriptEvent"key={index}>{event.description} </p>
                    </div>
                    <div className="contEvents_right t-alignR padd1">
                        <p className="contEvents_placeEvent fw600"key={index}>{event.place}</p>
                        <p className="contEvents_dateEvent"key={index}>{event.date}</p>
                        <p className="contEvents_timeEvent"key={index}>{event.time}</p>
                    </div>
                </div> 
            </div>
        </div>) :  <p>Loading...</p>}
    </div>
    {/* <div className="contEvents mgin2 padd1 bgWhite">
        <div className="contEvents_all radius8 padd1">
            <div className="contEvents_event bder-btm">
                <div className="contEvents_colorBox padd05 radius8"></div>
                <div className="flex space-btw">
                    <div className="contEvents_left padd1">
                            <h2 className="contEvents_titleEvent fsize14">Quedada skate</h2>
                            <p className="contEvents_descriptEvent">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                Praesentium pariatur minus sit cumque pers.
                            </p>
                    </div>
                    <div className="contEvents_right t-alignR padd1">
                        <p className="contEvents_placeEvent fw600">Madrid</p>
                        <p className="contEvents_dateEvent">21/12/2018</p>
                        <p className="contEvents_timeEvent">17:00</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>  */}
    {/* <div className="contEvents mgin2 padd1 bgWhite">
        <div className="contEvents_all radius8 padd1">
            <div className="contEvents_event bder-btm">
                <div className="contEvents_colorBox padd05 radius8"></div>
                <div className="flex space-btw">
                    <div className="contEvents_left padd1">
                            <h2 className="contEvents_titleEvent fsize14">Quedada skate</h2>
                            <p className="contEvents_descriptEvent">Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                Praesentium pariatur minus sit cumque pers.
                            </p>
                    </div>
                    <div className="contEvents_right t-alignR padd1">
                        <p className="contEvents_placeEvent fw600">Madrid</p>
                        <p className="contEvents_dateEvent">21/12/2018</p>
                        <p className="contEvents_timeEvent">17:00</p>
                    </div>
                </div> 
            </div>
        </div>
    </div> */}
</div>
        {/* //  <div className="box-allEvent">
        //   {this.state.post.length ? this.state.post.map((event,index) => <div className="box-event"><p key={index}>{event.title}</p></div>) : <p>Loading...</p>}
        // </div>         */}
        <div className="container_createEvent">
          <form onSubmit={this.event}>
          <label for="Title">Title</label>
          <input type="text" id="" name="title" placeholder="Title event" onChange={this.onChangeInput} value={this.state.newEvent.title}/>
          <label for="Title">Description</label>
          <input type="text" id="" name="description" placeholder="Description event" onChange={this.onChangeInput} value={this.state.newEvent.description}/>
          <label for="Title">Place</label>
          <input type="text" id="" name="place" placeholder="Place event" onChange={this.onChangeInput} value={this.state.newEvent.place}/>
          <label for="Title">Date</label>
          <input type="text" id="" name="date" placeholder="date event" onChange={this.onChangeInput} value={this.state.newEvent.date}/>
          <label for="Title">Time</label>
          <input type="text" id="" name="time" placeholder="time event" onChange={this.onChangeInput} value={this.state.newEvent.time}/>
          <button>clika</button>
          </form>
        </div> 
      </div>
    )
  }
}
