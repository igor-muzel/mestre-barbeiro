import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Busca o cookie
    const token = request.cookies.get('token')?.value;
    
    // Pega a URL exata (ex: "/dashboard" ou "/agende")
    const urlAtual = request.nextUrl.pathname;

    // 1. Nossa Lista VIP de rotas que NÃO precisam de login
    const rotasPublicas = ['/', '/login', '/cadastro'];

    // 2. Verifica se a rota que o usuário digitou está na lista VIP
    const ehRotaPublica = rotasPublicas.includes(urlAtual);

    // 3. REGRA DE BLOQUEIO: Se a rota NÃO é pública e ele NÃO tem token...
    if (!ehRotaPublica && !token) {
        // Redireciona pro login. 
        // Qualquer pasta nova que você criar dentro de (main) já cai aqui!
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. REGRA DE CONFORTO: Se ele tem token e tentou acessar login/cadastro...
    if (token && (urlAtual === '/login' || urlAtual === '/cadastro')) {
        // Joga ele de volta para o dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 5. Se estiver tudo ok, libera a passagem
    return NextResponse.next();
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)'],
};