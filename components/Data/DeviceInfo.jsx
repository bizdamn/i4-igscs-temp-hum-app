import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
export default function DeviceInfo(props) {
  const [DeviceInfo, setDeviceInfo] = useState({
    devEUI: null,
    applicationID: null,
    variables: null,
    tags: null,
    description: null,
    deviceProfileID: null,
    isDisabled: null,
    referenceAltitude: null,
    name: null,
    skipFCntCheck: null,
    lastSeenAt: null,
    location: null,
    deviceStatusMargin: null,
    deviceStatusBattery: null,
  });



  var date = new Date(DeviceInfo.lastSeenAt);
  var formattted_last_seen = date.toLocaleString()

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper sx={{padding:3}}>
       <table className="table table-striped  table-hover">
       <thead >
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
        
            <tr>
              <td>Device Name</td>
              <td>{DeviceInfo.name}</td>
            </tr>
           
          </tbody>
        </table></Paper>
      </Grid>
    </>
  );
}
