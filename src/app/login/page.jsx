import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/queries";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem("token", data.login.access_token);
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

  //  import { signIn } from 'next-auth/client';

  //  export default function Login() {
  //    // ...existing code

  //    return (
  //      <div>
  //        <h1>Login</h1>
  //        <form onSubmit={handleSubmit}>
  //          {/* ...existing code */}
  //        </form>
  //        <button onClick={() => signIn('google')}>Login with Google</button>
  //        <button onClick={() => signIn('facebook')}>Login with Facebook</button>
  //      </div>
  //    );
  //  }