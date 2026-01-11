"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
      }
    }, [router])

    return <Component {...props} />
  }
}
