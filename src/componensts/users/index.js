import { userAgent } from "next/server";
import classes from './index.module.css';
import UserCard from "../UI/user-card";

const AllUsers = (props) => {
  const { user, users } = props;
  
  return (
    <>
      <h1>All users</h1>
      <ul className={classes['users-list']}>
        {users.map((u) => (
            <li key={user.id} className={classes['user-item']}><UserCard user={u} /></li>
        
        ))}
      </ul>
    </>
  );
};

export default AllUsers;
