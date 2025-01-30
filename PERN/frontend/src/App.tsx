import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            Notes App
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;