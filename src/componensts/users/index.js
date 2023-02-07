import { userAgent } from "next/server";

const AllUsers = (props) => {
  const { user, users } = props;
  console.log(users);
  return (
    <>
      <h1>All users</h1>
      {users.map((u) => (
        <p>{u.profile.name}</p>
      ))}
    </>
  );
};

export default AllUsers;
