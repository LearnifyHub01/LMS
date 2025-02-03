"use client";
import { redirect } from "next/navigation";
import useAuth from "./useAuth";
import React from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    redirect("/");
    return null; // Avoid rendering anything while redirecting
  }

  return <>{children}</>;
}

