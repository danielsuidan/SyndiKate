import React, { Component } from 'react'
import './Signup.css';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state= {
        }
        this.props = props
    }
    onChangeInput = (input) => {
        const { name, value} = input.target;
        this.setState({...this.state, [name]:value}, () => {
            console.log(this.state)
        })

    }
    singup = (e) => {
        e.preventDefault();
        const user = {...this.state};
        this.props.authSignup(user)
    }
    login=(e)=>{
        e.preventDefault();
        const user ={...this.state};
        this.props.authLogin(user)
    }
  render() {
      console.log(window.innerHeight)
    return (
      <div>
        <div className="bg-body">
            <div className="flex flex-col maxW600 mg-auto">
            <div className="">
            <div className="flex space-btw paddTB1-EW2">
                <div className="logo-box">
                <img className="logo" src="../../images/logo.png" alt=""/>
                </div>
                <div className="title-box">
                    <h1 className="title whiteC">Syndikate</h1>
                </div>
            </div>
            <form id="loginForm" className="flex flex-col  maxW600 mg-auto"onSubmit={this.login}>
                <div className="bg-white paddTB1-EW2">
                <div className="login-box">
                    <label for="mail"></label>
                    <input type="email" id="mail" name="email" className="mginTB06 fw500" placeholder="Email ID" onChange={this.onChangeInput}/>
                    
                    <label for="pwd"></label>
                    <input type="password" id="pwd" name="password" className="mginTB06 fw500" placeholder="Password" onChange={this.onChangeInput}/>
                    <button>Entrar</button>
                </div>
                </div>
                <div className="pwdForgor-box padd05">
                </div>
                <div className="register-box bg-white paddTB1-EW2">
                <a href="" className="register-btn whiteC">REGISTER NOW</a>
                </div>
            </form>
            <form id="loginForm" className="flex flex-col  maxW600 mg-auto" onSubmit={this.singup}>
                <div className="bg-white paddTB1-EW2">
                <div className="login-box">
                    <label for="mail"></label>
                    <input type="text" id="mail" name="username" className="mginTB06 fw500" placeholder="User Name" onChange={this.onChangeInput}/>
                    <input type="email" id="mail" name="email" className="mginTB06 fw500" placeholder="Email ID"/>
                    <label for="pwd"></label>
                    <input type="password" id="pwd" name="password" className="mginTB06 fw500" placeholder="Password" onChange={this.onChangeInput}/>
                    <input type="password" id="pwd" name="confpass" className="mginTB06 fw500" placeholder="Confirm Password" onChange={this.onChangeInput}/>
                    <button>Sign Up</button>
                </div>
                </div>
                <div className="pwdForgor-box padd05">
                <p onClick={() => {this.props.authGoogle();this.props.logout()}}>Login Con Google</p>
                </div>

            </form>
            </div>
        </div>
        </div>        
      </div>
    )
  }
}


