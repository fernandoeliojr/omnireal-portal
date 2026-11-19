import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { PropertyCard } from "@/components/PropertyCard";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const { data: properties, error } = await supabase.from("properties").select("*");
  return {
    props: {
      properties: properties || [],
    },
  };
}

export default function Catalog({ properties }: { properties: any[] }) {
  const router = useRouter();
  const { categoria, search: initialSearch, type: initialType } = router.query;

  const [search, setSearch] = useState((initialSearch as string) || "");
  const [filterType, setFilterType] = useState((initialType as string) || "all");
  const [filterBairro, setFilterBairro] = useState("all");
  const [filterPrecoMin, setFilterPrecoMin] = useState("");
  const [filterPrecoMax, setFilterPrecoMax] = useState("");
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const bairros = useMemo(() => {
    const set = new Set(properties.map(p => p.neighborhood).filter(Boolean));
    return Array.from(set) as string[];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const catMatch = categoria ? p.category === categoria : true;
      const searchMatch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
      const typeMatch = filterType === "all" || p.type === filterType;
      const bairroMatch = filterBairro === "all" || p.neighborhood === filterBairro;
      const minMatch = !filterPrecoMin || p.price >= Number(filterPrecoMin);
      const maxMatch = !filterPrecoMax || p.price <= Number(filterPrecoMax);
      return catMatch && searchMatch && typeMatch && bairroMatch && minMatch && maxMatch;
    });
  }, [properties, categoria, search, filterType, filterBairro, filterPrecoMin, filterPrecoMax]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-[1200px] mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-extrabold text-ink mt-8">Imóveis {categoria === 'compra' ? 'para Comprar' : categoria === 'aluguel' ? 'para Alugar' : 'Disponíveis'}</h1>

        {/* Filtros Horizontais */}
        <section className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex flex-wrap gap-4 items-center">
            <input type="text" placeholder="Buscar por título ou cidade..."
                className="flex-grow p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none"
                value={search} onChange={e => setSearch(e.target.value)} />

            <select className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none"
                value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="all">Todos os tipos</option>
                <option value="casa">Casas</option>
                <option value="apto">Apartamentos</option>
            </select>

            <select className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none"
                value={filterBairro} onChange={e => setFilterBairro(e.target.value)}>
                <option value="all">Todos os bairros</option>
                {bairros.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <input type="number" placeholder="Preço Mínimo" className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none" value={filterPrecoMin} onChange={e => setFilterPrecoMin(e.target.value)} />
            <input type="number" placeholder="Preço Máximo" className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 outline-none" value={filterPrecoMax} onChange={e => setFilterPrecoMax(e.target.value)} />
        </section>

        {/* Catalog */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <p className="text-zinc-500">{filteredProperties.length} imóveis encontrados</p>
            <div className="flex gap-2">
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-accent text-white' : 'bg-zinc-100'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-accent text-white' : 'bg-zinc-100'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>

          <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
            {paginatedProperties.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-accent text-white' : 'bg-zinc-100'}`}>
                    {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
