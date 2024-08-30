export const User = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.type}</td>
    </tr>
  );
};
