import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll=()=>{
    const request=axios.get(baseUrl)
    return request.then(response=>response.data)
}

const create=(newObject)=>{
    console.log("created");
    
    const request=axios.post(baseUrl,newObject)
}

const deletePerson=(id)=>{
    const request=axios.delete(baseUrl+"/"+id)
}

const updatePerson=(newObject)=>{
    const request=axios.put(baseUrl+"/"+newObject.id,newObject)
    return request.then(response=>response)
}

export default {getAll,create , deletePerson,updatePerson}