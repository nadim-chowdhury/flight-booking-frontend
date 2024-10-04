"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromCookies } from "../redux/slices/userSlice";

export default function CookieProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromCookies());
  }, [dispatch]);

  return children;
}
