// // backend/config/db.js
// const mongoose = require('mongoose');

// const DEFAULT_MONGO_URI = 'mongodb+srv://naveenkumart906_db_user:JrY0q4QoPtIhGRfz@nk.wpf1cvv.mongodb.net/SRI?retryWrites=true&w=majority&appName=NK';

// async function connectDB(uri) {
//   const MONGO_URI = uri || process.env.MONGO_URI || DEFAULT_MONGO_URI;
//   mongoose.set('strictQuery', false);
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ Connected to MongoDB');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     throw err;
//   }
// }

// module.exports = { connectDB };




// config/db.js
const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb+srv://naveenkumart906_db_user:JrY0q4QoPtIhGRfz@nk.wpf1cvv.mongodb.net/SRI?retryWrites=true&w=majority&appName=NK';

async function connectDB(uri) {
  const MONGO_URI = uri || process.env.MONGO_URI || DEFAULT_MONGO_URI;
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = { connectDB };
