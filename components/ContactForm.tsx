import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contato" className="bg-card p-10 rounded-2xl border border-zinc-100 shadow-sm">
      <h2 className="text-3xl font-extrabold text-ink tracking-tighter">Fale com um Consultor</h2>
      <p className="text-zinc-500 mt-2">Nossa equipe está pronta para te atender.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Seu Nome" required className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-accent outline-none transition" />
          <input type="email" placeholder="Seu E-mail" required className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-accent outline-none transition" />
        </div>
        <textarea placeholder="Como podemos ajudar?" rows={4} required className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-accent outline-none transition"></textarea>

        <button type="submit" disabled={status === 'submitting'} className="bg-accent text-white py-4 rounded-full font-bold hover:bg-blue-900 transition shadow-md">
          {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-medium">
          ✅ Mensagem enviada com sucesso! Retornaremos em breve.
        </p>
      )}
    </section>
  );
};
