import UserProfile from '@/componensts/users/profile';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/db';
const ProfilePage = props => {
  return <UserProfile user={props.user} />;
}

export const getServerSideProps = async context => {
  const session = await getSession({req: context.req});
    console.log(session);
  const client = await connectToDatabase();

  const db = client.db();

  const currentUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  const user = {
    id: currentUser._id.toString(),
    ...currentUser
  }
  delete user._id;

  client.close();
  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session, user }
  }
}

export default ProfilePage;
