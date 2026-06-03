import { useState,useEffect } from "react";

function Parent(){
    const[user,setUser]=useState([])
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((data)=>{
            setUser(data)
        })
    },[])
    return(
       <>
             {user.map((use)=>(
                <p>{use.name}</p>
            ))
        }
        </>
    )
  
}
export default Parent