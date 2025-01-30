import { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/api";
import { User } from "../types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">
            <p className="font-bold">Username: {user.username}</p>
            {user.created_at && (
              <p className="text-sm text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
