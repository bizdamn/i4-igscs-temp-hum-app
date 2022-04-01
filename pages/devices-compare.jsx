import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import moment from 'moment'
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import { ResponsiveContainer } from "recharts"
import { Line } from "react-chartjs-2";
export default function DeviceCompare() {
    const router = useRouter()
    const { state } = useContext(DataStore);
    const { userInfo } = state;
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0);
    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }
        temperatureFilter()
    }, [userInfo, router]);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [startDate, SetStartDate] = useState(moment(currentDate, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD"));
    const [endDate, SetEndDate] = useState(moment(currentDate, "YYYY-MM-DDTHH:mm:ss").add(1, 'days').format("YYYY-MM-DD"));
    const [fetchedData, SetFetchedData] = useState({ "tempData7a0a": [], "humData7a0a": [], "tempData7a01": [], "humData7a01": [], "tempDatadht22_01": [], "humDatadht22_01": [], "tempDatadht22_02": [], "humDatadht22_02": [], "tempDatadht11_01": [], "humDatadht11_01": [], "tempData79fe": [], "humData79fe": [] });



    async function temperatureFilter() {
        closeSnackbar()
        try {
            const { data } = await axios.post('https://https://i4-server-temp-hum-chart.igscsi4server.com/all-devices-comparison', {
                start_date: startDate,
                end_date: endDate
            });
            SetFetchedData(data)
            enqueueSnackbar('Filtered', { variant: 'success' });
        }
        catch (e) {
            console.log(e)
        }
    }


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const MaxHumiditydata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.humDatadht11_01.maxArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.humDatadht22_01.maxArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.humDatadht22_02.maxArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.humData7a0a.maxArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.humData79fe.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.humData7a01.maxArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };


    const MaxTemperaturedata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.tempDatadht11_01.maxArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.tempDatadht22_01.maxArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.tempDatadht22_02.maxArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.tempData7a0a.maxArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.tempData79fe.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.tempData7a01.maxArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };


    const AverageHumiditydata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.humDatadht11_01.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.humDatadht22_01.avgArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.humDatadht22_02.avgArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.humData7a0a.avgArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.humData79fe.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.humData7a01.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };


    const AverageTemperaturedata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.tempDatadht11_01.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.tempDatadht22_01.avgArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.tempDatadht22_02.avgArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.tempData7a0a.avgArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.tempData79fe.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.tempData7a01.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };


    const MinHumiditydata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.humDatadht11_01.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.humDatadht22_01.minArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.humDatadht22_02.minArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.humData7a0a.minArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.humData79fe.minArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.humData7a01.minArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };


    const MinTemperaturedata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Zone 1",
                data: fetchedData.tempDatadht11_01.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 2",
                data: fetchedData.tempDatadht22_01.minArray,
                borderColor: [
                    "green",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 3",
                data: fetchedData.tempDatadht22_02.minArray,
                borderColor: [
                    "violet",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 4",
                data: fetchedData.tempData7a0a.minArray,
                borderColor: [
                    "orange",
                ],
                borderWidth: 1,
            },
            {
                label: "Zone 5",
                data: fetchedData.tempData79fe.minArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Zone 6",
                data: fetchedData.tempData7a01.minArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            }
        ],
    };

    return (
        <Layout>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Stack direction='row'>

                    <DatePickerComponent
                        startDate={startDate}
                        SetStartDate={SetStartDate}
                        endDate={endDate}
                        SetEndDate={SetEndDate}
                    />
                    <Box >
                        <Button
                            onClick={() => temperatureFilter()}
                            variant="outlined">
                            Filter
                        </Button>
                    </Box>
                </Stack>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Average" value="1" />
                            <Tab label="Minimum" value="2" />
                            <Tab label="Maximum" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <Grid container spacing={2}>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }} >
                                    <ResponsiveContainer className="p-0" width="100%" height="100%">
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
                                                <h5>Temperature Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={AverageTemperaturedata}
                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}>
                                    <ResponsiveContainer width="100%" height="100%">
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
                                                <h5>Humidity Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={AverageHumiditydata}

                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                        </Grid>






                    </TabPanel>
                    <TabPanel value="2">

                    <Grid container spacing={2}>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }} >
                                    <ResponsiveContainer className="p-0" width="100%" height="100%">
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
                                                <h5>Temperature Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={MinTemperaturedata}
                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                                </Grid>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}>
                                    <ResponsiveContainer width="100%" height="100%">
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
                                                <h5>Humidity Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={MinHumiditydata}

                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                                </Grid>
                        </Grid>




                    </TabPanel>
                    <TabPanel value="3">

                    <Grid container spacing={2}>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }} >
                                    <ResponsiveContainer className="p-0" width="100%" height="100%">
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
                                                <h5>Temperature Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={MaxTemperaturedata}
                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                                </Grid>
                            <Grid item sm={12} lg={6}>
                                <div style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}>
                                    <ResponsiveContainer width="100%" height="100%">
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
                                                <h5>Humidity Trend</h5>
                                            </div>
                                            <div style={{ padding: "3px" }}>
                                                <Line
                                                    height={150}
                                                    data={MaxHumiditydata}

                                                />
                                            </div>
                                        </>
                                    </ResponsiveContainer>
                                </div>
                                </Grid>
                        </Grid>




                    </TabPanel>
                </TabContext>
            </Box>
        </Layout>
    );
}
