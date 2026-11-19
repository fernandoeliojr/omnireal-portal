import React from 'react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

interface Property {
  id: number;
  title: string;
  price: number;
  type: string;
  m2: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image_url: string;
  location: string;
}

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <article className="bg-card rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-zinc-100">
      <img
        src={property.image_url}
        alt={property.title}
        className="w-full h-56 object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800';
        }}
      />
      <div className="p-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent/80">{property.type}</span>
        <h3 className="text-xl font-bold mt-2 text-ink">{property.title}</h3>
        <p className={`${nunito.className} text-sm text-zinc-600 mt-2 line-clamp-2`}>{property.description}</p>
        <div className="flex gap-4 mt-4 text-sm font-medium text-zinc-500">
          <span>{property.m2} m²</span>
          <span>{property.bedrooms} qtos</span>
        </div>
        <p className="text-lg font-bold mt-5 text-ink">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
        </p>
      </div>
    </article>
  );
};
