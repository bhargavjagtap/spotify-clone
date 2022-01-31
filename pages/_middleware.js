import {getToken} from 'next-auth/jwt'
import {NextResponse} from 'next/server'

export async function middleware(req, res, next) {
    //Token will exist if user is logged in
    const token = await getToken({req, secret:process.env.JWT_SECRET});

    const {pathname} = req.nextUrl
    //ALlow the requests if the following is true...
    //1) Its a request for next-auth sessoin & provider 
    //2) the token exists and is valid
    if(pathname.includes('api/auth') || token){
        return NextResponse.next();
    }

    //Redirect them to login if they don't have a valid token and are requesting a protected route'
    if(!token && pathname !== '/login'){
        return NextResponse.redirect('/login');
    }   
}

