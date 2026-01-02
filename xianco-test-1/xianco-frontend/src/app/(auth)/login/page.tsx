"use client"

import { useActionState } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations/login"
import { siginAction } from "@/app/_action/authAction"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { isAuthenticated } from "@/lib/auth"

export default function LoginPage() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    });
    const [state, formAction, isPending] = useActionState(siginAction, null);

    useEffect(() => {
        async function checkSession() {
            const authenticate = await isAuthenticated();
            if (authenticate) {
                router.push("/dashboard");
            }
        }
        checkSession();
    }, [router]);
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            router.push("/dashboard");
        }
        if (state?.error) {
            toast.error(state.message);
            router.refresh();
        }
    }, [state, router]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form action={formAction} className="space-y-4">
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder="your_username"
                                                required
                                                aria-required
                                                className="mt-2"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>)} />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                                aria-required
                                                className="mt-2"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>)} />


                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? "Mengirim..." : "Masuk"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>

            </Card>
        </main>
    )
}