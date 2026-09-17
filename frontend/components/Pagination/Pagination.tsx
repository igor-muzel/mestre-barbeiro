import React from 'react';

interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  itensPorPagina: number;
  mudarPagina: (novaPagina: number) => void; 
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  totalItens,
  itensPorPagina,
  mudarPagina
}: PaginationProps) {
  
  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;

  if (totalItens === 0) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-[#121212]">
      
      <span className="text-sm text-gray-400">
        Mostrando {indicePrimeiroItem + 1} a {Math.min(indiceUltimoItem, totalItens)} de {totalItens} itens
      </span>
      
      <div className="flex gap-2">
        <button 
          onClick={() => mudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="px-4 py-2 rounded-lg bg-[#181818] text-gray-300 border border-neutral-700 hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer"
        >
          Anterior
        </button>
        
        <button 
          onClick={() => mudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="px-4 py-2 rounded-lg bg-[#181818] text-gray-300 border border-neutral-700 hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

