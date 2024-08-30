import { User } from "./User"

export const UsersList = ({ users }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => <User 
                                user={u} 
                                key={u.id} 
                                />)}
            </tbody>
        </>
    )
}