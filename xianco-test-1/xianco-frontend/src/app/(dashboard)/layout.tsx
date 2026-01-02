"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Home, Users, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { isAuthenticated, removeSession } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { getUserProfile } from "../_action/authAction"
import { User } from "@/lib/types/Response"

type Props = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        async function checkSession() {
            const authenticate = await isAuthenticated();
            if (!authenticate) {
                router.push("/login");
            } else {
                const profile = await getUserProfile();
                setUser(profile?.data as unknown as User);
            }

        }

        checkSession();
    }, [router]);

    async function Logout() {
        await removeSession('token')
        router.replace('/login')
    }
    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <>
            <SidebarProvider defaultOpen>
                <div className="flex min-h-screen w-full bg-background text-foreground">
                    <Sidebar collapsible="icon">
                        <SidebarHeader className="px-3 py-4">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <div className="rounded-md bg-primary p-2 text-primary-foreground">
                                    <LayoutDashboard className="size-5" />
                                </div>
                                <span className="font-semibold">Admin</span>
                            </Link>
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/dashboard" className="flex items-center gap-2">
                                            <Home className="size-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/order" className="flex items-center gap-2">
                                            <Settings className="size-4" />
                                            <span>Pembelian</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/product" className="flex items-center gap-2">
                                            <Users className="size-4" />
                                            <span>Product</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>
                        </SidebarContent>

                        <SidebarFooter>
                            <Card className="w-full">
                                <CardContent className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://avatar.iran.liara.run/public/boy?username=Scott" alt="User avatar" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{user ? user.fullname : ""}</div>
                                        <div className="text-xs text-muted-foreground">{user ? user.email : ""}</div>
                                    </div>
                                    <Button variant="ghost" size="icon" aria-label="Sign out" onClick={Logout}>
                                        <LogOut className="size-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </SidebarFooter>
                    </Sidebar>

                    <SidebarInset>
                        <div className="flex min-h-screen w-full flex-col">
                            <header className="flex items-center justify-between border-b px-6 py-4">
                                <div>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Overview</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>

                            <main className="flex-1 overflow-auto p-6">{children}</main>
                        </div>
                    </SidebarInset>
                </div>


            </SidebarProvider>
        </>
    )
}