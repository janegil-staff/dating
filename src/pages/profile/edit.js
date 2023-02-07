import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/db';
import EditProfile from '@/componensts/users/profile/edit';
const ProfilePage = props => {
  return <EditProfile user={props.user} />;
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

  client.close();
  return {
    props: { session, user }
  }
}

export default ProfilePage;
