import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://janstovr:fooBar83@cluster0.lapq6je.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};
