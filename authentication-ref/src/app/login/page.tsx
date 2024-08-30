import RedirectErrorDisplay from "@/components/RedirectError";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RedirectIfAuthenticated } from "@/server_actions/navigation";
import Link from "next/link";

export default async function LoginPage() {

    await RedirectIfAuthenticated();

	return (
		<div className="flex justify-center items-center h-screen">
            <form action={"/auth/login"} method="post">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your username below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                name="username"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" type="password" required />
                        </div>
                        <RedirectErrorDisplay />
                    </CardContent>
                    <CardFooter className="flex-col">
                        <Button type="submit" className="w-full">Sign in</Button>
                        <CardDescription className="mt-2">{"Don't have an account?"}<Link className="ml-1 hover:underline" href={'/signup'}>Sign up</Link></CardDescription>
                    </CardFooter>
                </Card>
            </form>
		</div>
	);
}