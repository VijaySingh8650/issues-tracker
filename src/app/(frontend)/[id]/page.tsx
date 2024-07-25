"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const HomePage = () => {
  const router = useParams();
  const id = router.id;
  const [loadStatus, setLoadStatus] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(false);
  const [order, setOrder] = useState<number | null>(null);

  const checkMachineStatus = async() => {
    
    for(let i=0; i<1; i++){
      try{   
        

        // Machine active request
        let res:any = await axios.get(`https://1388f8b1455b1c7b8ed7c3744b9214d3.balena-devices.com/isMachineActiveReq`, {timeout: 10000});
        console.log(res, "sdljljffh");
        if(res?.data?.status){

          setStatus(res?.data?.status);

        }

      }
      catch(err){

        console.log(err);

      }

      // 3 times to check whether the machine is active or not.
      
      
       
    }
    

  };

  useEffect(() => {
    checkMachineStatus();
  }, []);
  

  const  askQueueCountToMachine = async() => {
      try{
        let num:number = Math.random();
        let res:any = await axios.get(`api/machine/check-stages-4?receipe=${num}`);
        setOrder(num);
      }
      catch(err){
        console.log(err);
      }
  }
  

  return (
    <div>
      <h1>Home Page</h1>

      {
        status && <p>Machine is active</p>
      }

      {
        order && <p>Order no. - {order}</p>
      }

      <button onClick={()=> askQueueCountToMachine()}>Send Receipe</button>

      {loadStatus && "Checking Machine's status..."}

    </div>
  );
};

export default HomePage;
