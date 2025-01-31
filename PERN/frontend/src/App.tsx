import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { fetchAllCategories } from './services/api';
import { Category } from './types';

const App = () => {
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the username
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username); // Ensure the payload contains the username
    }

    // Fetch categories
    const getCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    getCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Navbar
        username={username}
        onLogout={handleLogout}
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <Outlet />
    </div>
  );
};

export default App;