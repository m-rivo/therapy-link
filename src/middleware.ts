import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// El nombre de la cookie de Payload CMS por defecto
const AUTH_COOKIE_NAME = 'payload-token'

export function middleware(request: NextRequest) {
  console.log('--- MIDDLEWARE EXECUTING ---')

  // 1. Obtener la cookie del token de autenticación
  const token = request.cookies.get(AUTH_COOKIE_NAME)

  // 2. Definir las rutas a proteger
  const protectedPaths = ['/', '/dashboard', '/calendario', '/user-profile', '/clientes']
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname === path)

  // 3. Si el usuario no tiene token y está tratando de acceder a una ruta protegida,
  //    redirigir al login.
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url)
    // Opcional: añade un parámetro para que el login sepa a dónde volver
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 4. Si el usuario tiene token y está en la página de inicio '/', redirigir al dashboard.
  if (request.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Continuar si la ruta no está protegida o el usuario está autenticado
  return NextResponse.next()
}

// 5. Configuración del matcher (rutas a las que se aplica el middleware)
export const config = {
  matcher: [
    //PÚBLICAS
    '/',
    '/create-account',
    '/forgot-password',
    '/login',
    '/password-reset',
    '/verify',
    //PRIVADAS
    '/dashboard',
    '/calendario',
    '/user-profile',
    '/clientes',
  ],
}
