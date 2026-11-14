import axios from "axios";

export default async function getAllData(){
    try{
        const response = await axios.get("/api/appointments");
        return response.data
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.log({status: error.response?.status});
        }
    }
}