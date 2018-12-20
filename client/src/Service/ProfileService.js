import axios from 'axios';
class ProfileService{
    constructor(){
        this.serviceprofile=axios.create({
            baseURL:'http://localhost:5000/api/profile/',
            withCredentials:true
        })
    }

    profile =(user)=>{
        const formData = new FormData();
        
        return this.serviceprofile.post('',user)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }

    post=()=>{
        return this.serviceprofile.get('')
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }
    Photo = (photo) => {
        // axios.post("http://localhost:5000/api/auth/signup", {user}, {withCredentials: true})
        const formData = new FormData();
        console.log(photo)
        Object.keys(photo).forEach(key => formData.append(key, photo[key]));
        // formData.append("photo", photo.photo[0])
        console.log(formData)
        return this.serviceprofile.post('', formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
        })
        .then(response => response.data)
      }
      photoAlbum=()=>{
        this.serviceprofile.photoAlbum()
        .then(photo=>this.setState({...this.state,photo:photo.events},() => {
          console.log(this.state)
        }))
      }
      Random= (num=4)=>{
          console.log("entrasss")
          return this.serviceprofile.get(`randomphoto/${num}`)
          .then(res=>{
              console.log(res);
              return res.data})
          .catch(err=>console.log(err.response))
      }

}

export default ProfileService;