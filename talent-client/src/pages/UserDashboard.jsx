import React from "react";
import { UsersList } from "../components/UsersList";

function UserDashboard({ users }) {
  return (
    <>
      <div>
        <h1>This is the user page</h1>
      </div>
      <table className="table table-striped table-hover">
        <UsersList users={users} />
      </table>
    </>
  );
}

export default UserDashboard;
