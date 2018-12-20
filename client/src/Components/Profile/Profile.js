import React, { Component } from 'react'
import './Profile.css'
import ProfileService from '../../Service/ProfileService';
import UserService from '../../Service/UserService';
import EventService from '../../Service/EventService';
import {Link} from 'react-router-dom'
export default class Profile extends Component {
  constructor(){
    super();
    this.state={
      profile:null,
      album:[],
      photo:[],
      photoback:[],
      post:[],
      background:{},
      newphoto:{
      }

    }
    this.ProfileService= new ProfileService;
    this.UserService = new UserService(); 
    this.eventService = new EventService();
    
  }
  showphoto=()=>{
   return this.UserService.userimage()
    .then(photo=>this.setState({...this.state,photo:photo},() => {
      console.log(this.state)
      console.log(this.props)
    }))

  }
  showphotoBack=()=>{
    return this.UserService.userimageBack()
     .then(photoback=>this.setState({...this.state,photoback:photoback},() => {
       console.log(this.state)
       console.log(this.props)
     }))
 
   }
    updateBackgroundPhoto=(e)=>{
        e.preventDefault();
        this.UserService.userAddPhoto(this.state.background)
        .then((user)=>{
            this.props.loggedIn()
        })
        .catch(error=>(console.log(error)))
    }
    ChangeFileBack = (tar) => {
        const {name, files} = tar.target;
        const _state = {...this.state}
        _state.background[name] = files[0]
        this.setState(_state)
      
      } 
      changePhotoBack=(tar)=>{
        const {name, files} = tar.target;
        const _state = {...this.state}
        _state.background[name] = files[0]
        this.setState(_state)
      
      }

    updateProfilePhotos=(e)=>{
        e.preventDefault();
        this.UserService.user(this.state.newphoto)
        .then((user)=>{
            console.log(user)
        //   const _photo = [...this.state.photo]
        //    _photo.push(this.state.newphoto)
         //  let tempState = {...this.state}
         //   tempState.post.push(newPost)
            this.props.loggedIn()
        //    this.setState({...this.state, user, newphoto:{title:""}}, () => this.props.loggedIn())
         })
         .catch(error=>(console.log(error)))
       }
    changePhoto=(tar)=>{
        const {name, files} = tar.target;
        const _state = {...this.state}
        _state.newphoto[name] = files[0]
        this.setState(_state)
      
      }
      ChangeFile = (tar) => {
        const {name, files} = tar.target;
        const _state = {...this.state}
        _state.newphoto[name] = files[0]
        this.setState(_state)
      
      } 
      random =() => {
          this.eventService.random()
          .then(events =>this.setState({...this.state,post:events.events},()=>console.log(this.state.post)))
          .catch(err=>(console.log('ERROR')))
      }
      Random=()=>{
          this.ProfileService.Random()
          .then(RanPhotos=>{
            console.log(RanPhotos)  
            this.setState({...this.state,album:RanPhotos.RandomPhoto})})
        .catch(console.log)
      }

      componentDidMount(){
          this.showphotoBack()
          this.showphoto()
          .then(()=>this.random())
          this.Random();
      }

  render() {
    if(this.props.user)  
     console.log(this.props.user)
    return (
      <div>
    <div className="main">
    <div className="maxW mAuto">
            <section className="first-section">
                <div className="flex space-ar maxW50 paddEW4">
                    <div className="logo-box">
                        <img className="logo" src="./images/logo.png" alt=""/>
                    </div>
                    <div className="title-box">
                        <h1 className="title">Syndikate</h1>
                    </div>
                </div>
            </section> 
            {this.props.user ? <section className="section-two paddTB4" style={{"backgroundImage":`url(${this.props.user.pictureBack}`}}>
               <div className="profile-box mginEW1">
               <img className="profile-img bRadius bderW4" src={this.props.user.photoURL || this.props.user.image[0]}/>
                <div className="boxPenProf bgGrey bRadius bderW2">
                <form onSubmit={this.updateProfilePhotos}>
                    <input name="photo" type="file" className="selectImg"onChange={this.ChangeFile}/>
                    <Link to="" className="selectIcon"><img className="blackPen" src="./images/black-pen.svg" alt=""/></Link>
                    <button>Upload</button>
                    </form>      
                </div>
               </div>
               <div className="boxPenBg bgGrey bRadius bderW2">
               <form onSubmit={this.updateBackgroundPhoto}>
                <input name="photo" type="file" className="selectImg" onChange={this.ChangeFileBack}/>
                <Link to="" className="selectIcon"><img className="blackPen" src="./images/black-pen.svg" alt=""/></Link>
                <button>Upload</button>
                </form>    
                </div>
            </section> : <p>...loading </p>}
            <section className="section-three">
                <nav>
                    <ul className="flex space-btw paddTB1 mginEW4">
                        <li className="pointer"><Link to="/Album">Fotos</Link></li>
                        <li className="pointer"><Link to="">Muro</Link></li>
                        <li className="pointer"><Link to="">Mapa</Link></li>
                        <li className="pointer"><Link to="/event">Eventos</Link></li>
                        <li className="pointer"><Link to="/login">Log Out</Link></li>
                    </ul>
                </nav>
            </section>
            <section className="section-four flex space-btw">
                <div className="subS-Fotos bgWhite">
                    <div className="sectBoxTitle paddTB1 mginEW1">
                        <h2>Fotos Destacadas</h2>
                    </div>
                    
                    <div className="flex destBox wrap space-ar mginEW1">
                    {Array.isArray(this.state.album) ? this.state.album.map((event,index) =>
                        <div className="">
                            <img key={index} className="imgDest" src={event.picture} alt=""/>
                        </div> ) :  <p>Loading...</p>}

                        <div className="">
                            <img className="imgDest" src="./images/bg.jpg" alt=""/>
                        </div>
                        <div className="">
                            <img className="imgDest" src="./images/bg.jpg" alt=""/>
                        </div>
                        <div className="">
                            <img className="imgDest" src="./images/bg.jpg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="subS-Post bgWhite">
                    <div className="paddTB1 mginEW1">
                        <h2 className="">Post</h2>
                    </div>
                    {this.state.post.length ? this.state.post.map((event,index) => 
                    <div className="postBox mAuto paddTB1">
                        <p key={index}>{event.title}</p>
                    </div>) :  <p>Loading...</p>}
                    <div className="postBox mAuto paddTB1">
                            <img className="postImg" src="./images/bg.jpg" alt=""/>
                        </div>
                        <div className="postBox mAuto paddTB1">
                                <img className="postImg" src="./images/bg.jpg" alt=""/>
                            </div>
                            <div className="postBox mAuto paddTB1">
                                    <img className="postImg" src="./images/bg.jpg" alt=""/>
                                </div>
                                
                </div>
                
            </section>
        </div>
    </div>
      </div>
    )
  }
}
// style={{"backgroundImage":this.state.user.image}}