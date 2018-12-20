import axios from 'axios';
class EventService{
    constructor(){
        this.eventservice= axios.create({
            baseURL:'http://localhost:5000/api/event',
            withCredentials: true
        })
    }
    event = (event)=>{
        return this.eventservice.post('/',event)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    showevent = () => {
        return this.eventservice.get('/showevent')
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    showeventid=(id)=>{
        return this.eventservice.get(`/showevent/${id}`)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    joinevent=(eventid)=>{
        return this.eventservice.get(`/join/${eventid}`)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    deleteevent=(id)=>{
        return this.eventservice.get(`/deleteevent/${id}`)
        .then(res=>res.data)
        .catch(error=>(console.log(error)))
    }
    random = (num = 3) => {
        return this.eventservice.get(`/random/${num}`)
        .then(res=>res.data)
        .catch(err => console.log(err.response.data.msg))
    }

}

export default EventService;