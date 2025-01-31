import { useState } from 'react';
import { Category } from '../types';

interface CategoryFormProps {
  noteId: number;
  categories: Category[];
  onAddCategory: (noteId: number, categoryId: number) => void;
}

const CategoryForm = ({ noteId, categories, onAddCategory }: CategoryFormProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategoryId) {
      onAddCategory(noteId, selectedCategoryId);
      setSelectedCategoryId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;