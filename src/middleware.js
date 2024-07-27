
import { auth } from 'auth';
import { NextResponse } from 'next/server';
const protectedRoutes = ["/vendor", "/admin"];

export default  async function middleware(request){
const session = await auth();
const isProtected= protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
if(!session && isProtected){
    const absoluteRoute = new URL("/",request.nextUrl.origin);
    return NextResponse.redirect(absoluteRoute.toString())
}
return NextResponse.next();
}