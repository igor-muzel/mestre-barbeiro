import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest){

    //busca o token no cookie que foi criado na pagina de login
    const token = request.cookies.get('token')?.value;
    //descobre a página/rota que o usuario esta tentando acessar
    const urlAtual = request.nextUrl.pathname;

    //verifica se esta tentando redirecionar para o dashboard e se existe um token 
    if(urlAtual.startsWith('/dashboard') && !token){
        //caso o usuario tente acessar a rota de dashboar e nao tiver token, ele volta para o login
        return NextResponse.redirect(new URL('/login', request.url));
    }
    //Se ele JÁ TIVER o token e tentar acessar a tela de login...
    if(urlAtual.startsWith('/login') && token){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Se as regras acima não barraram, o porteiro libera a passagem
    return NextResponse.next();

}

export const config = {
  // Isso diz ao Next.js: "Só chame o porteiro se o usuário for nessas URLs".
  // Evita que o middleware fique rodando quando o usuário carrega uma imagem, economizando bateria e servidor.
  matcher: ['/dashboard/:path*', '/login'], 
};