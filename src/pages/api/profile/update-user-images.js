import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {

  if (req.method !== "PUT") return;

  const { user, imageUrl, type } = req.body;
  const objectId = new ObjectId(user.id);

  let client = await connectToDatabase();
  let db = client.db();

  if(type === 'PUSH') {
    await db
    .collection("users")
    .updateOne(
      { _id: objectId },
      {
        $push: {
          'profile.images': {
            url: imageUrl
          },
        },
      }
    );
  } else if(type === 'PULL') {
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection('users').updateOne( { _id: objectId },  { $pull: { 'profile.images': { url: imageUrl } } } );
  }
  
  client.close();
  res.status(201).json({ message: 'Image is updated' });
};

export default handler;
