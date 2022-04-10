import os
from flask_cors import CORS, cross_origin
from flask import Flask, request, Response,jsonify
import pandas as pd
import moment
from datetime import datetime 
from bson import ObjectId
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import pymongo
import time
import json
myclient = pymongo.MongoClient("mongodb://igscs:IGSCS041173WelcomeChirpstack@167.71.225.42:27017/energy-meter-demo?authSource=admin&readPreference=primary&directConnection=true&ssl=false")
mydb = myclient["i4-igscs"]
entriesCollection = mydb["temp-humidity-entries"]

zero_timestamp = time.time()
ist_timestamp = zero_timestamp + 5*60*60+30*60
offset = datetime.fromtimestamp(ist_timestamp) - datetime.utcfromtimestamp(zero_timestamp)

    
def Average(lst):
    return sum(lst) / len(lst)


# def filterAHCStatusfunc(e):
#     statusArr = getStatusHour(e.name,e.timestamp,e.status)
#     return statusArr
# def getStatusHour(name,time,status):
#     hr = time.hour
#     return {'name':name,'time': int(hr),'status': status }



def filterTempfunc(e):
    temperatureArr = getTempHour(e.temperature, e.timestamp)
    return temperatureArr
def getTempHour(temp, time):
    hr = time.hour
    return { 'time': int(hr),'temperature': float(temp) }



def filterHumfunc(e):
    humidityArr = getHumHour(e.humidity, e.timestamp)
    return humidityArr
def getHumHour(hum, time):
    hr = time.hour
    return { 'time': int(hr),'humidity': float(hum) }


def GetTempHourlyData(e):
    tempDF=pd.DataFrame(e)
    ret = []
    for hcounter in range(24):
        df_query=tempDF[(tempDF.time==hcounter)]
        hdata = df_query['temperature']
        if(len(df_query.index)==0):
          ret.append({
          "hour": hcounter, "min": None,
          "max": None, "avg": None})
          continue
        ret.append({
        "hour": hcounter, "min":"{:.2f}".format(min(hdata)),
        "max":"{:.2f}".format(max(hdata)), "avg":"{:.2f}".format(Average(hdata))
        })
    ret_df=pd.DataFrame(ret)
    minArray=ret_df['min'].to_numpy().tolist()
    maxArray=ret_df['max'].to_numpy().tolist()
    avgArray=ret_df['avg'].to_numpy().tolist()

    return {'minArray':minArray, 'maxArray':maxArray,'avgArray':avgArray}


def GetHumHourlyData(e):
    humDF=pd.DataFrame(e)
    ret = []
    for hcounter in range(24):
        df_query=humDF[(humDF.time==hcounter)]
        hdata = df_query['humidity']
        if(len(df_query.index)==0):
          ret.append({
          "hour": hcounter, "min": None,
          "max": None, "avg": None})
          continue
        ret.append({
        "hour": hcounter, "min":"{:.2f}".format(min(hdata)),
        "max":"{:.2f}".format(max(hdata)), "avg":"{:.2f}".format(Average(hdata))
        })
    ret_df=pd.DataFrame(ret)
    minArray=ret_df['min'].to_numpy().tolist()
    maxArray=ret_df['max'].to_numpy().tolist()
    avgArray=ret_df['avg'].to_numpy().tolist()
    return {'minArray':minArray, 'maxArray':maxArray,'avgArray':avgArray}


def GetStatusHourlyData(e):
    statusDF=pd.DataFrame(e)
    ret = []
    for hcounter in range(24):
        df_query=statusDF[(statusDF.time==hcounter)]
        hdata = df_query['status']
        if(len(df_query.index)==0):
          ret.append({"hour": hcounter, "data": None})
          continue
        if(hdata.values[-1]==False):
          ret.append({"hour": hcounter, "data": None})
          continue
        ret.append({"hour": hcounter,"data":str(30)})
        # ret.append({"hour": hcounter,"data":str(hdata.values[-1])})
    ret_df=pd.DataFrame(ret)
    mainArray=ret_df['data'].to_numpy().tolist()
    return {'mainArray':mainArray}



@app.route("/",methods=['POST'])
def hello_world():
    entries_object=list(entriesCollection.find({'deviceName':request.json['deviceName']}))
    df=pd.DataFrame(entries_object)
    df['timestamp'] = df['timestamp'].apply(lambda x: x+offset)
    df_query=df[(df.timestamp >= datetime(int(request.json['start_date'][:4]),int(request.json['start_date'][5:7]),int(request.json['start_date'][8:10]))) & (df.timestamp <= datetime(int(request.json['end_date'][:4]),int(request.json['end_date'][5:7]),int(request.json['end_date'][8:10])))]
    
    tempArr  = df_query.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArr  = df_query.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    if(len(humArr)>0 and len(tempArr)>0):
        hourlyTempData=GetTempHourlyData(tempArr)
        hourlyHumData=GetHumHourlyData(humArr)  
    else:
        hourlyTempData=[]
        hourlyHumData=[]

    return jsonify({"tempData": hourlyTempData,"humData": hourlyHumData}), 200



@app.route("/all-devices-comparison",methods=['POST'])
def comparison():
    entries_object=list(entriesCollection.find({}))
    df=pd.DataFrame(entries_object)
    df['timestamp'] = df['timestamp'].apply(lambda x: x+offset)
    df_query=df[(df.timestamp >= datetime(int(request.json['start_date'][:4]),int(request.json['start_date'][5:7]),int(request.json['start_date'][8:10]))) & (df.timestamp <= datetime(int(request.json['end_date'][:4]),int(request.json['end_date'][5:7]),int(request.json['end_date'][8:10])))]
    
    
    df_querydht11_01=df_query[(df_query.deviceName =='dht11_01')]
    df_querydht22_01=df_query[(df_query.deviceName =='dht22_01')]
    df_querydht22_02=df_query[(df_query.deviceName =='dht22_02')]
    df_query7a0e=df_query[(df_query.deviceName =='something')]
    df_query79f9=df_query[(df_query.deviceName =='something')]
    df_query79fe=df_query[(df_query.deviceName =='something')]
    
    tempArrdht11_01  =  df_querydht11_01.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArrdht11_01  =  df_querydht11_01.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    tempArrdht22_01  =  df_querydht22_01.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArrdht22_01  =  df_querydht22_01.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    tempArrdht22_02  =  df_querydht22_02.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArrdht22_02  =  df_querydht22_02.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    tempArr7a0e  =  df_query7a0e.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArr7a0e  =  df_query7a0e.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    tempArr79f9  =  df_query79f9.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArr79f9  =  df_query79f9.apply(filterHumfunc, axis = 1).to_numpy().tolist()
    tempArr79fe  =  df_query79fe.apply(filterTempfunc, axis = 1).to_numpy().tolist()
    humArr79fe  =  df_query79fe.apply(filterHumfunc, axis = 1).to_numpy().tolist()

    if(len(humArrdht11_01)>0 and len(tempArrdht11_01)>0 and len(humArrdht22_01)>0 and len(tempArrdht22_01)>0 and len(humArrdht22_02)>0 and len(tempArrdht22_02)>0 and len(humArr7a0e)>0 and len(tempArr7a0e)>0 and len(humArr79f9)>0 and len(tempArr79f9)>0 and len(humArr79fe)>0 and len(tempArr79fe)>0 ):
        hourlyTempDatadht11_01=GetTempHourlyData(tempArrdht11_01)
        hourlyHumDatadht11_01=GetHumHourlyData(humArrdht11_01)  
        hourlyTempDatadht22_01=GetTempHourlyData(tempArrdht22_01)
        hourlyHumDatadht22_01=GetHumHourlyData(humArrdht22_01)  
        hourlyTempDatadht22_02=GetTempHourlyData(tempArrdht22_02)
        hourlyHumDatadht22_02=GetHumHourlyData(humArrdht22_02)  
        hourlyTempData7a0e=GetTempHourlyData(tempArr7a0e)
        hourlyHumData7a0e=GetHumHourlyData(humArr7a0e)  
        hourlyTempData79f9=GetTempHourlyData(tempArr79f9)
        hourlyHumData79f9=GetHumHourlyData(humArr79f9)  
        hourlyTempData79fe=GetTempHourlyData(tempArr79fe)
        hourlyHumData79fe=GetHumHourlyData(humArr79fe)  
    else:
        hourlyTempDatadht11_01=[]
        hourlyHumDatadht11_01=[] 
        hourlyTempDatadht22_01=[]
        hourlyHumDatadht22_01=[]  
        hourlyTempDatadht22_02=[]
        hourlyHumDatadht22_02=[]  
        hourlyTempData7a0e=[]
        hourlyHumData7a0e=[]  
        hourlyTempData79f9=[]
        hourlyHumData79f9=[]  
        hourlyTempData79fe=[]
        hourlyHumData79fe=[]  
    return jsonify({"tempDatadht11_01": hourlyTempDatadht11_01,"humDatadht11_01": hourlyHumDatadht11_01,"tempDatadht22_01": hourlyTempDatadht22_01,"humDatadht22_01": hourlyHumDatadht22_01,"tempDatadht22_02": hourlyTempDatadht22_02,"humDatadht22_02": hourlyHumDatadht22_02,"tempData7a0e": hourlyTempData7a0e,"humData7a0e": hourlyHumData7a0e,"tempData79f9": hourlyTempData79f9,"humData79f9": hourlyHumData79f9,"tempData79fe": hourlyTempData79fe,"humData79fe": hourlyHumData79fe}), 200






if __name__ == '__main__':
   app.run(host="0.0.0.0", port=1241)
