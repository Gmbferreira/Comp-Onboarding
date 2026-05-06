import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  

  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value; 

 
  if (url.pathname === '/') {
    
    if (!token) {
      url.pathname = '/usuario-login';
      return NextResponse.redirect(url);
    }


    if (userRole === 'ADMIN') {
      url.pathname = '/lista-produtos';
    } else {
      url.pathname = '/landing-page';
    }
    
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/'],
};