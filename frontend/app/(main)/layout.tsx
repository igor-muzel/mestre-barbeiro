import { AppSidebar } from "@/components/Sidebar/AppSidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden mt-4">
        {/* A Sidebar agora fica no Layout e NUNCA desaparece ao navegar entre páginas! */}
        <AppSidebar />
        
        {/* Aqui é onde a página atual (Dashboard, Cliente, Agenda, etc) vai ser injetada */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

