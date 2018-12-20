import axios from 'axios';
class AuthService{
    constructor(){
        this.service = axios.create({
            baseURL:'http://localhost:5000/api/auth/',
            withCredentials: true

        })
    }
    ProfileActive=(user)=>{
        return this.service.get('login',user)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    login=(user)=>{
        return this.service.post('login',user)
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }

    singup = (user)=> { 
        return this.service.post('signup', user)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    confirm=(confpass)=>{
        return this.service.get(`confirm/${confpass}`)
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }
    logout=()=>{
        return this.service.get('logout')
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    loggedIn=()=>{
        return this.service.get('loggedin')
        .then(res => res.data)
        .catch(err => console.log(err.response.data.msg))
    }
}


export default AuthService;