import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "PUT") return;
  const { user, options } = req.body;
  const objectId = new ObjectId(user.id);

  let client = await connectToDatabase();
  let db = client.db();

 const profile = {
    name: options.name || user.profile.name,
    about: options.about || user.profile.about,
    sex: options.sex || user.profile.sex,
    birthdate: options.birthdate || user.profile.birthdate,
    images: options.images || user.profile.images,
    likes: options.likes || user.profile.likes,
    likedMe: options.likedMe || user.profile.likedMe
 }

  const response = await db
    .collection("users")
    .updateOne({ _id: objectId }, { $set: { profile }});

  client.close();
  res.status(201).json({message: 'Bruker profilen ble oppdatert!'})
};

export default handler;
