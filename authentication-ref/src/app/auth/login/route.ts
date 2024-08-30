import { passwordMatch } from "@/services/authenticator";
import UserManager from "@/services/userManager";
import { NextResponse } from "next/server";
import * as jose from 'jose';

export async function POST(request: Request) {
    const baseUrl = request.headers.get('origin');
    const formData = await request.formData();
    const userManager = new UserManager();
    
    const username = formData.get('username')!.toString();
    const password = formData.get('password')!.toString();
    const user = await userManager.findUserByEmail(username);

    if (!!user && await passwordMatch(password, user)) {

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const algo = 'HS256';
        const token = await new jose.SignJWT({ user: user.email, role: user.role.toString() })
            .setProtectedHeader({ alg: algo })
            .setIssuedAt()
            .setIssuer(process.env.ISSUER!)
            .setAudience(process.env.AUDIENCE!)
            .setExpirationTime(process.env.JWT_EXPIRY!)
            .sign(secret);
        
        const headers = new Headers(request.headers);
        headers.set("Set-Cookie", `token=${token}; Path=/; HttpOnly`);
    
        return NextResponse.redirect(baseUrl!, { status: 303, headers: headers });
    }

    const headers = new Headers(request.headers);
    headers.set("Set-Cookie", "redirect_error=Username or password invalid. Please try again.; Path=/login;");
    
    return NextResponse.redirect(`${baseUrl}`, { status: 303, headers: headers });
}