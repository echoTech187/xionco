"use client";
import { useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    async function checkSession() {
      const authenticate = await isAuthenticated();
      if (!authenticate) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    }
    checkSession();
  });


}
