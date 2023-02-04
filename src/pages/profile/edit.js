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

  const currentUser = await db.collection("users").findOne({
    email: session.user.email,
  });

  const user = {
    id: currentUser._id.toString(),
    ...currentUser
  }
  delete user._id;

  client.close();
  return {
    props: { session, user }
  }
}

export default ProfilePage;
