
import { auth } from 'auth';
import { NextResponse } from 'next/server';
const protectedRoutes = ["/vendor", "/admin",'/cart'];
const adminprotectedRoutes = ["/vendor", "/admin"];
const unProtectedRoutes = ["/register", "/login","/reset-password"];

export default  async function middleware(request){
const session = await auth();
const isProtected= protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
const isAdminProtected= adminprotectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
const isUnProtected= unProtectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
if(!session && isProtected){
    const absoluteRoute = new URL("/",request.nextUrl.origin);
    return NextResponse.redirect(absoluteRoute.toString())
}
else if(session && !session.user.admin && isAdminProtected){
    const absoluteRoute = new URL("/",request.nextUrl.origin);
    return NextResponse.redirect(absoluteRoute.toString())
}
 else if(session && isUnProtected){
    const absoluteRoute = new URL("/",request.nextUrl.origin);
    return NextResponse.redirect(absoluteRoute.toString())
}
return NextResponse.next();
}