import { ObjectId } from "mongodb";
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/db';
import DisplayedUser from "@/componensts/users/user";
const ShowProfile = props => {
  const {user, displayedUser} = props;
  return <>
    <DisplayedUser user={user} displayedUser={displayedUser} />
  </>;
}


export const getServerSideProps = async context => {
  const session = await getSession({req: context.req});

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  const client = await connectToDatabase();
  const db = client.db();

  const user = await db.collection("users").findOneAndUpdate({
    email: session.user.email,
  }, { $set: { lastActive: new Date().toString() } }).then(data => {
    return data.value;
  });
  
  user._id = user._id.toString();

  const userId = new ObjectId(context.query.userId);
  
  const displayedUser = await db.collection('users').findOne({_id: userId});
  displayedUser._id = displayedUser._id.toString();
  client.close();
  return {
    props: { session, user, displayedUser }
  }
}

export default ShowProfile;
