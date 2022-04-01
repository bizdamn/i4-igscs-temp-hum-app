import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// components
import Link from "next/link"
import db from '../utils/db';
import Devices from '../models/Devices';
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import { useRouter } from 'next/router';
export default function DevicePage({devices}) {
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');

    }
  }, [userInfo, router]);
  console.log(devices)
  return (
    <Layout>
      <Typography sx={{ mb: 3 }} variant="h4"  >Devices</Typography>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ overflowX: 'scroll' }}
      >
        <table className="table table-striped  table-hover">
          <thead style={{ backgroundColor: '#38B6FF', fontSize: '1.3rem', color: '#fff' }}>
            <tr>
              <th>Device Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((element) => {
            
              return (
                <tr key={element.deviceName}>
                  <td>
                    <Link href={`/device-info/${element.deviceName}`} style={{ color: 'black' }}><a>
                      {element.deviceName}
                    </a></Link>
                  </td>
                  <td>
                    <Link href={`/device-info/${element.deviceName}`} style={{ color: 'black' }}><a>
                      {element.type}
                    </a></Link>
                  </td>
                </tr>

              );
            })}

          </tbody>
        </table>

      </Grid>
    </Layout>
  );
}



export async function getServerSideProps() {
  await db.connect();
  const devices = await Devices.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  await db.disconnect();
  return {
    props: {
      devices: devices.map(db.convertDocToObj),
    },
  };
}
