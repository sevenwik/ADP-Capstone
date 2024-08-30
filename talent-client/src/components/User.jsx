export const User = ({ user }) => {

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.password}</td>
        </tr>
    )
}