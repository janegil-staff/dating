
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/db';
import AllUsers from '@/componensts/users';
const Users = props => {
  return <AllUsers user={props.user} users={props.users} />;
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


  const AllUsersOfOppositeGender = await db.collection('users').find({'profile.sex': user.profile.sex === 'male' ? 'female' : 'male'});

  const usersArray = await AllUsersOfOppositeGender.toArray();

  const users = [];
  for(let i = 0; i < usersArray.length; i++) {
    const u = {
        id: usersArray[i]._id.toString(),
        ...usersArray[i]
      }
      delete u._id;
      users.push(u);
  }

  client.close();
  return {
    props: { session, user, users }
  }
}

export default Users;
