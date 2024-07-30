"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/mutation";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await register({ variables: { username, email, password } });
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
