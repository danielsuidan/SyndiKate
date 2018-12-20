import React, { Component } from 'react'
import './Album.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ProfileService from '../../Service/ProfileService';


export default class Album extends Component {
  constructor(){
    super()
    this.state={
      photo:[],
      newphoto:{
        title:"",
        description:""
      }
    }
    this.ProfileService=new ProfileService();
  }
  showphoto=()=>{
    this.ProfileService.post()
    .then(photo=>this.setState({...this.state,photo:photo.posts},() => {
      console.log(this.state)
    }))

  }
 updatePhoto = (e) => {
  e.preventDefault();
  this.ProfileService.Photo(this.state.newphoto)
  .then(()=>{
    const _photo = [...this.state.photo]
     _photo.push(this.state.newphoto)
   //  let tempState = {...this.state}
   //   tempState.post.push(newPost)

     this.setState({...this.state, photo:_photo, newphoto:{title:""}})
   })
   .catch(error=>(console.log(error)))
 }
ChangeFile = (tar) => {
  const {name, files} = tar.target;
  console.log(name, files)
  const _state = {...this.state}
  _state.newphoto[name] = files[0]
  this.setState(_state)

} 
onChangeInput = (input) => {
  const { name, value} = input.target;
  const _newphoto = {...this.state.newphoto}
  _newphoto[name] = value
  this.setState({...this.state, newphoto:_newphoto}, () => {
  })

}
componentDidMount(){
  this.showphoto()
  // this.ChangeFile()
}


  

  render() {
    return (
      <div>
        <form onSubmit={this.updatePhoto}>
          <input name="photo" type="file" onChange={this.ChangeFile}/>
          <input name="text" type="text" onChange={this.onChangeInput}/>
          <input name="coments" type="text" onChange={this.onChangeInput}/>
          <p>PEPE</p>
          <button>Clika</button>
          <input type="Submit"/>
        </form>
        {Array.isArray(this.state.photo) ? this.state.photo.map((event,index) => 
        
        <div>
        <img src={event.picture}></img>
        <p key={index}>{event.text}</p>
        <p key={index}>{event.coments}</p>
        </div>) : <p>loading</p>}
      </div>
    )
  }
}
