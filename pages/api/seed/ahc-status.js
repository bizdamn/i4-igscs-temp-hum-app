import nc from 'next-connect';
import AHCStatusEntries from '../../../models/AHCStatusEntries';
import db from '../../../utils/db';
import data from '../../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await AHCStatusEntries.deleteMany();
  await AHCStatusEntries.insertMany(data.ahcStatusCollection);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;