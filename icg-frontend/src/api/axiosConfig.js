import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:5000',
    //headers : {"ngrok-skip-browser-warning" : "true"} //This is for getting rid of the cors error but its done in movie controller class instead of using ngrok

})