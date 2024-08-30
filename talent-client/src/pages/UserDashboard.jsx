import React from "react";
import { UsersList } from "../components/UsersList";

function UserDashboard() {
  return (
    <>
    <div>
      <h1>This is the about page</h1>
    </div>
    <table class="table table-striped table-hover">
      <UsersList users={users_data}/>
    </table>
    </>
  );
}

export default UserDashboard;
