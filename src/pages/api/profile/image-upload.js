import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.S3_BUCKET },
  region: process.env.S3_REGION,
});

const createBufferFromBase64Image = (base64Image) => {
  let buf = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  return buf;
};

const generateKey = (userId) => {
  let timestamp = new Date().getTime();
  let key = userId + "-" + timestamp;

  return key;
};
const handler = async (req, res) => {
  console.log("ENTERING METHOD");

  if (req.method !== "POST") {
    return;
  }
  const { user, base64Image } = req.body;

  let key = generateKey(user.id);
  let buf = createBufferFromBase64Image(base64Image);

  const params = {
    ACL: "public-read",
    Body: buf,
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (event) => {
      setUploadingProgress(Math.round((event.loaded / event.total) * 100));
    })
    .send((err) => {
      if (err) {
        res.status(400).json({message: 'Error uploading file'});
        return;
      }
    });

  let imageUrl = process.env.S3_ROOT_URL + '/' + key;

  res.status(200).json({ message: imageUrl });
};

export default handler;
