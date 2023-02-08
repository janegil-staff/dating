import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/db";
import AllUsers from "@/componensts/users";
const Users = (props) => {
  return <AllUsers user={props.user} users={props.users} />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = await connectToDatabase();
  const db = client.db();

  const user = await db.collection("users").findOneAndUpdate({
    email: session.user.email,
  }, { $set: { lastActive: new Date().toString() } }).then(data => {
    return data.value;
  });

  user._id = user._id.toString();
  
  const AllUsersOfOppositeGender = await db
    .collection("users")
    .find({ "profile.sex": user.profile.sex === "male" ? "female" : "male" });

  const users = await AllUsersOfOppositeGender.toArray();

  users.forEach(u => {
    u._id = u._id.toString();
  });

  client.close();
  return {
    props: { session, user, users },
  };
};

export default Users;
