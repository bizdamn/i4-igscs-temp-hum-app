import nc from 'next-connect';
import DeviceCalibration from '../../../models/DeviceCalibration';
import db from '../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  await db.connect();
  const findResult = await DeviceCalibration.find({ deviceName: req.body.deviceName })
  findResult[0].temperature_calibration = req.body.temperatureCalibration
  findResult[0].humidity_calibration = req.body.humidityCalibration
  // console.log(findResult)
  await findResult[0].save();
  await db.disconnect();
  
  res.send({ message: 'User Updated Successfully' });

});

export default handler;
