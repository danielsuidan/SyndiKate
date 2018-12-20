import axios from 'axios';
class UserService{
    constructor(){
        this.userservice=axios.create({
            baseURL:'http://localhost:5000/api/user/',
            withCredentials:true
        })
    }
    user=(user)=>{
        console.log(user)
        const formData = new FormData();
        Object.keys(user).forEach(key => formData.append(key, user[key]));
 
        // formData.append("photo", user)
        return this.userservice.post('',formData,{
            headers:{
                'content-Type':'multipart/form-data'
            }
        })
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    userAddPhoto = photo => {
        const formData = new FormData();
        Object.keys(photo).forEach(key => formData.append(key, photo[key]));
        console.log(photo)
        return this.userservice.post('userback',formData,{
            headers:{
                'content-Type':'multipart/form-data'
            }
        })
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    userimageBack=()=>{
        return this.userservice.get('userback')
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }
    userimage=()=>{
        return this.userservice.get('user')
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }

}
export default UserService;