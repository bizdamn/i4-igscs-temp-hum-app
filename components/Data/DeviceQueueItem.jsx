import React, {useEffect } from "react";
export default function DeviceQueueItem(props) {
    useEffect(() => {
            const requestOptions = {
              method: 'POST',
              headers: { 
                  'Grpc-Metadata-Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4'
              },
              body: JSON.stringify({
                      deviceQueueItem: { 
                        confirmed: true, 
                        data:`${props.commandInBas64}`, 
                        devEUI:`${props.devEUI}` ,  
                        fCnt: 0,  
                        fPort: 7
                      }  
              }),};
          fetch(`https://chirpstack.igscsi4server.com/api/devices/${props.devEUI}/queue`, requestOptions)
              .then(response => response.json())
              .then(data => console.log(data)).catch(function (error) {
                alert('Please Check your internet connection. Either their is no internet connection or the signals are weak');
              });
    }, [props.commandInBas64,props.devEUI])
    
    return (
        <>
       <p>EUI Number {props.devEUI} is given a command of {props.CommandName}</p>
        </>
        );}
    
