import axios from "axios";

const axiosInstace = axios.create({
      baseURL:"https://coffeewebapi.barecms.com/api",
    headers: {
        "Content-Type" : "application/json", 
    },
    withCredentials:true
})

export default axiosInstace