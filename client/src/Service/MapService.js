import axios from 'axios';
class MapService {
    constructor(){
        this.mapservice=axios.post({
            baseURL:'http://localhost:5000/api/map/',
            withCredentials:true
        })
    }
    map=()=>{
        return this.mapservice.post('map',)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
}

export default MapService;