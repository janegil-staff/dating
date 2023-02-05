import AWS from "aws-sdk";

const generateKey = (userId) => {
  let timestamp = new Date().getTime();
  let key = userId + "-" + timestamp;

  return key;
};

const handler = async (req, res) => {
  const { user, base64Image } = req.body;
  const {
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
    S3_REGION,
    S3_BUCKET,
    S3_ROOT_URL,
  } = process.env;

  AWS.config.update({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    region: S3_REGION,
  });

  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const type = base64Image.split(";")[0].split("/")[1];

  const fileName = generateKey(user.id);

  const params = {
    Bucket: S3_BUCKET,
    Key: `${fileName}.${type}`, // type is not required
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  let location = "";
  let key = "";
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong with the file upload" });
  }


  res.status(201).json({ message: location });
};

export default handler;
