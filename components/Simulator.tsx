import React, { useState } from 'react';

export const Simulator: React.FC = () => {
  const [valor, setValor] = useState(800000);
  const [entrada, setEntrada] = useState(160000);
  const [taxa, setTaxa] = useState(0.9);
  const [prazo, setPrazo] = useState(240);
  const [resultado, setResultado] = useState<string | null>(null);

  const calcularParcela = () => {
    const i = taxa / 100;
    const saldo = valor - entrada;
    const parcela = (saldo * i) / (1 - Math.pow(1 + i, -prazo));

    setResultado(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parcela));
  };

  return (
    <section className="bg-card p-10 rounded-2xl border border-zinc-100 shadow-sm">
      <h2 className="text-3xl font-extrabold text-ink tracking-tighter">Simulador de Financiamento</h2>
      <p className="text-zinc-500 mt-2">Calcule suas parcelas de forma simples e transparente.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[
            { label: 'Valor do Imóvel (R$)', value: valor, setter: setValor },
            { label: 'Entrada (R$)', value: entrada, setter: setEntrada },
            { label: 'Taxa de Juros Mensal (%)', value: taxa, setter: setTaxa },
        ].map((input) => (
            <div key={input.label} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-600">{input.label}</label>
                <input
                    type="number"
                    value={input.value}
                    onChange={(e) => input.setter(Number(e.target.value))}
                    className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-accent outline-none transition"
                />
            </div>
        ))}

        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-600">Prazo</label>
            <select
                value={prazo}
                onChange={(e) => setPrazo(Number(e.target.value))}
                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-accent outline-none transition"
            >
                <option value="120">120 parcelas (10 anos)</option>
                <option value="240">240 parcelas (20 anos)</option>
                <option value="360">360 parcelas (30 anos)</option>
            </select>
        </div>

        <button
            onClick={calcularParcela}
            className="bg-accent text-white py-4 rounded-full font-bold hover:bg-blue-900 transition col-span-full mt-4 shadow-md"
        >
            Calcular Parcelas
        </button>
      </div>

      {resultado && (
        <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/10">
            <p className="text-sm text-accent font-bold uppercase tracking-widest">Resultado</p>
            <p className="text-4xl font-extrabold text-ink mt-2">Parcela: {resultado}</p>
        </div>
      )}
    </section>
  );
};
