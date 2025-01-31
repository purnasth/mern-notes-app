import { Link } from 'react-router-dom';
import { Category } from '../types';

interface NavbarProps {
  username: string;
  onLogout: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedCategory: number | null;
  onCategoryChange: (value: number | null) => void;
  categories: Category[];
}

const Navbar = ({
  username,
  onLogout,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: NavbarProps) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-xl font-bold">
            Notes App
          </Link>
          <span className="text-white">Welcome, {username}</span>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sort by</option>
            <option value="title">Title (A-Z)</option>
            <option value="created_at">Date (Newest First)</option>
          </select>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(Number(e.target.value) || null)}
            className="w-full p-2 border rounded"
          >
            <option value="">Filter by category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={onLogout} className="w-full p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;