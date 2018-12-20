import React, { Component } from 'react';
import firebase from'firebase'
import {Route, Switch, Link, Redirect} from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import NavBar from './Components/Nav-bar/Nav-bar';
import Post from './Components/Post/Post'
import Profile from './Components/Profile/Profile'
import AuthService from './Service/Authservice'
import Album from './Components/Album/Album'


class App extends Component {
  constructor(){
    super();
    this.state={
      user:null,
      redirect : false,
      Google:false
    }
    this.auth = new AuthService();
    this.handleAuth=this.handleAuth.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    this.renderLoginButton=this.renderLoginButton.bind(this)
    this.isLoggedIn()

  }
  signup = (user) =>{
    console.log(AuthService)
    this.auth.singup(user)
    .then(user => this.setState({...this.state, user, redirect:true}))
  }
  login=(user)=>{
    this.auth.login(user)
    .then(user=>this.setState({...this.state,user, redirect:true}))
  }
  logout=()=>{
    return this.auth.logout()
    .then(() => {this.setState({...this.state,user:null, redirect:true})
    })
  }
  isLoggedIn = () => {
    console.log("entra")
    this.auth.loggedIn()
    .then(user => this.setState({...this.state, user:user.user}))
    .catch(() => console.log("NO USER"))
  }


  componentWillMount(){
    if(this.state.user)
      firebase.auth().onAuthStateChanged(user=>{
        this.setState({ user });
      });
  }
  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log("entra")
    firebase.auth().signInWithPopup(provider)
    .then(result=> {this.setState({...this.state, user:true});console.log(`${result.user.email} ha iniciado sesion`)})
    .catch(error=>console.log(`Error ${error.code}: ${error.message}`));
  }
  handleLogout(){
    if(firebase.auth().signOut())
    firebase.auth().signOut()
    .then(result=> console.log(`${result ? result.user.email: null} ha cerrado sesion`))
    .catch(error=>console.log(`Error ${error.code}: ${error.message}`));
  }
  renderLoginButton(){
     //if user is logged 
     if(this.state.user){
      return(
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName || this.state.user.username }</p>
          <button onClick={this.handleLogout}>Cerrar Sesion</button>
        </div>
      )
     }else{
      return  (
        <div>
        <Signup authGoogle={this.handleAuth} authSignup={this.signup} authLogin={this.login} logout={this.logout} />
        </div>
      )
     }
  }
   

  
  

  render() {
    console.log(this.state.user)
    const redirect = () => {
    if(this.state.redirect)
      return <Redirect to="/myprofile"/>}
    return (
      <div>
        {redirect()}
          <Switch>
          <Route exact path="/login" render={() => this.renderLoginButton()}/>
          <Route exact path="/event" render={() => <Post/>}/>
          <Route exact path="/myprofile" render = {() => <Profile logout={this.logout} loggedIn={this.isLoggedIn} user={this.state.user} Google={this.state.Google}/>}/>
          <Route exact path="/Album" render = {() => <Album/>}/>

          </Switch>
          <Link to='/myprofile'>Home</Link>
          <Link to='/event'>Event</Link>
    
      </div>
    );
  }
}

export default App;
