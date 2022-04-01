import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ResponsiveContainer } from "recharts";
import TempGauge from "../components/ui/LiveData/TempGauge";
import HumidityGauge from "../components/ui/LiveData/HumidityGauge";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import axios from 'axios'

export default function LiveData({ }) {
  const router = useRouter();
  const { state } = useContext(DataStore);
  const { userInfo } = state;

  const [lastEntryDHT22_01, setLastEntryDHT22_01] = useState([])
  const [lastEntryDHT22_02, setLastEntryDHT22_02] = useState([])
  const [lastEntryDHT11_01, setLastEntryDHT11_01] = useState([])
  const [lastEntry7a01, setLastEntry7a01] = useState([])
  const [lastEntry79fe, setLastEntry79fe] = useState([])
  const [lastEntry7a0a, setLastEntry7a0a] = useState([])


  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    async function fetch() {
      const { data } = await axios.get(`/api/lastEntries`);
      await setLastEntryDHT22_01(data.lastEntryDHT22_01);
      await setLastEntryDHT22_02(data.lastEntryDHT22_02);
      await setLastEntryDHT11_01(data.lastEntryDHT11_01);
      await setLastEntry7a01(data.lastEntry7a01);
      await setLastEntry79fe(data.lastEntry79fe);
      await setLastEntry7a0a(data.lastEntry7a0a);
      console.log('Latest Entries Fetched')
    }
    fetch();
  }, [userInfo, router]);



  // setInterval(function () {
  //   fetch()
  // }, 300000);
  setTimeout(function(){
    window.location.reload(1);
 },  300000);


  return (
    <Layout>
      <Grid container>
        {/* 79f9 */}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 1</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>
                  {lastEntryDHT22_01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntryDHT22_01[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT22_01[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}


                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntryDHT22_01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntryDHT22_01[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT22_01[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}



                </Grid>

              </Grid>
            </>
          </ResponsiveContainer>
        </Grid>

        {/* 79fd */}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 2</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>

                  {lastEntryDHT22_02.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntryDHT22_02[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT22_02[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}


                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntryDHT22_02.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntryDHT22_02[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT22_02[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}


                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>

        {/*   7a0e*/}
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 3</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>

                  {lastEntryDHT11_01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntryDHT11_01[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT11_01[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntryDHT11_01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntryDHT11_01[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntryDHT11_01[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}

                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 4</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>

                  {lastEntry7a0a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry7a0a[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry7a0a[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>
                  {lastEntry7a0a.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry7a0a[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry7a0a[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}
                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 5</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>

                  {lastEntry79fe.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry79fe[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry79fe[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntry79fe.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry79fe[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry79fe[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}

                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>


        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          className="p-0"
          item
          lg={4}
          md={4}
          sm={6}
          xs={12}
        >
          <ResponsiveContainer className="p-0" width="100%">
            <>
              <div
                className="p-1"
                style={{
                  backgroundColor: "#9013FE",
                  borderRadius: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <h5>Zone 6</h5>
              </div>
              <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >temperature:</Typography>

                  {lastEntry7a01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={lastEntry7a01[0].temperature} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry7a01[0].temperature).toFixed(2)} °C</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-5.4rem' }}>
                        <TempGauge value={18} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`--`} °C</Typography>
                    </>)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center" >Humidity:</Typography>

                  {lastEntry7a01.length > 0 ? (
                    <>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={lastEntry7a01[0].humidity} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{parseFloat(lastEntry7a01[0].humidity).toFixed(2)} %</Typography>
                    </>) : (<>
                      <div style={{ position: 'relative', left: '-6rem' }}>
                        <HumidityGauge value={30} />
                      </div>
                      <Typography fontWeight={800} variant="h5" align="center" >{`0`} %</Typography>
                    </>)}
                </Grid>

              </Grid>

            </>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Layout>
  );
}

