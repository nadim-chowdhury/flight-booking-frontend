"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log("userInfo:", userInfo);
  console.log("isAuthenticated:", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return redirect("/register");
    }
  }, [isAuthenticated]);

  return children;
}
