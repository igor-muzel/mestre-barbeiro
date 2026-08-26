import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. O Next.js tenta encontrar o cookie chamado "token"
  const token = request.cookies.get('token')?.value;

  // 2. Pegamos qual página o usuário está tentando acessar (ex: /dashboard)
  const urlAtual = request.nextUrl.pathname;

  // 3. Se a rota for o dashboard E o usuário não tiver o token...
  if (urlAtual.startsWith('/dashboard') && !token) {
    // Mandamos ele de volta para a tela de login imediatamente!
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se a rota for o login E o usuário JÁ TIVER o token...
  if (urlAtual.startsWith('/login') && token) {
     // Mandamos ele direto pro dashboard (afinal, ele já está logado)
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Se estiver tudo certo, permite que a página carregue normalmente
  return NextResponse.next();
}

// 5. Configuração: Aqui dizemos ao Middleware quais rotas ele deve "vigiar"
export const config = {
  matcher: ['/dashboard/:path*', '/login'], 
};