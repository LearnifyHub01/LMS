'use client'
import { redirect } from "next/navigation";
import userAuth from "./useAuth";
import React from "react";

interface ProtectedProps {
  children: React.ReactNode; // Correct spelling of 'children'
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect('/');
}
