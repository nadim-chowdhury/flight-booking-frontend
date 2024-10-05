"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!isAuthenticated) {
      return redirect("/login");
    }
  }, [isAuthenticated]);

  return children;
}
