export interface ClienteDTO{
    id: number;
    name: string;
    email: string;
    telefone: string;
    
}

export interface ExcluirUsuarioRequest{
    id: number;
}

export interface ExcluirUsuarioResponse{
    mensagem: string;
    sucesso: boolean;
}