import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
        alt="Mansão de Luxo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 text-center px-4 max-w-4xl">
        <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
          Curadoria Exclusiva OmniReal
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter drop-shadow-lg">
          O Futuro de Morar Bem
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-zinc-100 font-light leading-relaxed drop-shadow-md">
          Arquitetura inteligente, luxo futurista e conforto inigualável em cada detalhe.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
            <button className="border border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">Explorar Catálogo</button>
            <button className="border border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">Simular Financiamento</button>
        </div>
      </div>
    </section>
  );
};
