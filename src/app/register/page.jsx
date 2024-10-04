"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          fullName,
          email,
          password,
        }
      );
      console.log("response:", response);
      toast.success("Registration successful! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] md:min-h-[90vh] grid md:grid-cols-2 grid-cols-1">
      {/* Left Image Section */}
      <div className="hidden md:block h-full">
        <Image
          src="https://images.unsplash.com/photo-1534775053122-dcd28a281520?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Register Background"
          width={1280}
          height={720}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Registration Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 px-6 md:px-12 py-12"
      >
        <h1 className="text-3xl font-semibold text-sky-600 uppercase">
          Register
        </h1>

        <div className="w-full">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 p-3 border rounded-md bg-slate-100"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-3 border rounded-md bg-slate-100"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-3 border rounded-md bg-slate-100"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md"
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        {error && <p className="text-rose-500 mt-2">Error: {error}</p>}

        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-sky-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
