import mongoose from 'mongoose';

const entriesSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    temperature: { type: String, required: true },
    humidity: { type: String, required: true },
    timestamp: { type: Date, required: true },
  }
);

const Entries = mongoose.models.Entries || mongoose.model('Entries', entriesSchema,'temp-humidity-entries');
export default Entries;
