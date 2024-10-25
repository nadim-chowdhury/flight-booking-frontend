"use client";

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_USER_PROFILE } from "../../graphql/query";
// import { UPDATE_USER_PROFILE } from "../../graphql/mutation";
import { useSelector } from "react-redux";

export default function Profile() {
  // const { data, loading, error } = useQuery(GET_USER_PROFILE);
  // const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");

  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);

  // const router = useRouter();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // await updateProfile({ variables: { username, email } });
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Update failed", error);
  //   }
  // };

  return (
    <div>
      <h1>Profile</h1>
      {/* <form onSubmit={handleSubmit}>
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
        <button type="submit">Update</button>
      </form> */}
    </div>
  );
}

//    import ProfilePictureUpload from '../components/ProfilePictureUpload';

//    export default function Profile() {
//      // ...existing code

//      return (
//        <div>
//          <h1>Profile</h1>
//          <ProfilePictureUpload />
//          <form onSubmit={handleSubmit}>
//            {/* ...existing code */}
//          </form>
//        </div>
//      );
//    }
