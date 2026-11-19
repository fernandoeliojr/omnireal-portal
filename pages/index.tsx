import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { PropertyCard } from "@/components/PropertyCard";
import { Hero } from "@/components/Hero";
import { Simulator } from "@/components/Simulator";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export async function getServerSideProps() {
  const { data: properties, error } = await supabase.from("properties").select("*");

  return {
    props: {
      properties: properties || [],
    },
  };
}

export default function Home({ properties }: { properties: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [limitVenda, setLimitVenda] = useState(6);
  const [limitAluguel, setLimitAluguel] = useState(6);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesType = typeFilter === "all" || p.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, categoryFilter, typeFilter, properties]);

  const vendaList = useMemo(() => filteredProperties.filter(p => p.category === 'compra'), [filteredProperties]);
  const aluguelList = useMemo(() => filteredProperties.filter(p => p.category === 'aluguel'), [filteredProperties]);

  return (
    <div className="min-h-screen bg-canvas">
      <Hero />

      <div className="max-w-[1200px] mx-auto p-4 md:p-8">
        {/* Barra de Busca Aprimorada */}
        <section className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-4 items-center">
            <input type="text" placeholder="O que você procura?"
                className="flex-grow p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none w-full"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            <select className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none w-full md:w-auto pr-10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_1rem_center] bg-no-repeat"
                value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">Compra / Aluguel</option>
                <option value="compra">Comprar</option>
                <option value="aluguel">Alugar</option>
            </select>

            <select className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none w-full md:w-auto pr-10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_1rem_center] bg-no-repeat"
                value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">Tipo</option>
                <option value="casa">Casa</option>
                <option value="apto">Apartamento</option>
            </select>

            <button onClick={() => window.location.href = `/imoveis?categoria=${categoryFilter || 'all'}&search=${searchQuery}&type=${typeFilter}`} className="bg-accent text-white px-8 py-4 rounded-xl font-bold shadow-md hover:bg-blue-900 transition w-full md:w-auto">
                Pesquisar
            </button>
        </section>

        <main className="py-12">
          {/* Seção Comprar */}
          {categoryFilter !== 'aluguel' && (
            <section>
                <h2 className="text-4xl font-extrabold tracking-tighter text-ink">Imóveis para Comprar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {vendaList.slice(0, limitVenda).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
                </div>
                {limitVenda < vendaList.length && (
                    <a href="/imoveis?categoria=compra" className="mt-8 block text-center w-full py-4 rounded-xl border border-zinc-200 font-bold hover:bg-zinc-50 transition">Ver mais</a>
                )}
            </section>
          )}

          {/* Seção Alugar */}
          {categoryFilter !== 'compra' && (
            <section className="mt-20">
                <h2 className="text-4xl font-extrabold tracking-tighter text-ink">Imóveis para Alugar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {aluguelList.slice(0, limitAluguel).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
                </div>
                {limitAluguel < aluguelList.length && (
                    <a href="/imoveis?categoria=aluguel" className="mt-8 block text-center w-full py-4 rounded-xl border border-zinc-200 font-bold hover:bg-zinc-50 transition">Ver mais</a>
                )}
            </section>
          )}

          <div className="mt-20">
            <Simulator />
          </div>
          <div className="mt-20">
            <ContactForm />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
