import { ALL_CATEGORIES, products } from '../data/products.js';

const countOf = (category) =>
  category === ALL_CATEGORIES ? products.length : products.filter((p) => p.category === category).length;

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Kategori">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className="chip"
          aria-pressed={category === active}
          onClick={() => onChange(category)}
        >
          {category}
          <small>{countOf(category)}</small>
        </button>
      ))}
    </div>
  );
}
