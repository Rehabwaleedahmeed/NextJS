import mongoose from 'mongoose';

if (!global.mongooseConnection) {
  global.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  if (global.mongooseConnection.conn) {
    return global.mongooseConnection.conn;
  }

  if (!global.mongooseConnection.promise) {
    global.mongooseConnection.promise = mongoose.connect(process.env.MONGODB_URI).then((client) => client);
  }

  global.mongooseConnection.conn = await global.mongooseConnection.promise;
  return global.mongooseConnection.conn;
}