"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "@/graphql/query";
import { useForm } from "react-hook-form";
import { UPDATE_USER_ROLE } from "@/graphql/mutation";

export default function UserList() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const { register, handleSubmit } = useForm();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSubmit = async (formData) => {
    await updateUserRole({
      variables: { id: formData.id, role: formData.role },
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" value={user.id} {...register("id")} />
              <select {...register("role")}>
                <option value="admin">Admin</option>
                <option value="customer_support">Customer Support</option>
                <option value="user">User</option>
              </select>
              <button type="submit">Update Role</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
