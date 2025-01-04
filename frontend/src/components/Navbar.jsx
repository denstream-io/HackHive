import { FaGithub, FaRocket } from 'react-icons/fa'; // Import the rocket icon
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ user, handleGithubLogin, handleLogout }) {
  // console.log(user);
  return (
    <nav
      className={`max-w-5xl mx-auto rounded-lg navbar w-full bg-gray-900 bg-opacity-80 py-3 px-6 flex justify-between items-center shadow-lg mt-5 transition-all duration-300 transform hover:scale-105`}
    >
      <h1 className="text-white text-2xl font-bold flex items-center gap-2">
        <FaRocket className="text-xl text-yellow-400 transition-transform transform hover:rotate-12" />{' '}
        {/* Rocket icon */}
        HackHive
      </h1>
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-white hover:text-yellow-400 transition duration-300 transform hover:scale-110"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-white hover:text-yellow-400 transition duration-300 transform hover:scale-110"
        >
          Dashboard
        </Link>
        <Link
          to="/search"
          className="text-white hover:text-yellow-400 transition duration-300 transform hover:scale-110"
        >
          Search User
        </Link>
        <Link
          to="/"
          className="text-white hover:text-yellow-400 transition duration-300 transform hover:scale-110"
        >
          Teams
        </Link>
      </div>
      <div>
        {!user ? (
          <button
            className="p-2 px-4 rounded-full bg-black text-white hover:shadow-xl hover:bg-gray-800 flex items-center gap-2 transition duration-300 transform hover:scale-105"
            aria-label="Login with GitHub"
            onClick={handleGithubLogin}
          >
            <FaGithub className="text-xl" />
            Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <img
                src={user.avatar_url || user.photoURL}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-yellow-400 transition-transform transform hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 px-4 rounded-full bg-red-500 text-white hover:shadow-xl hover:bg-red-600 flex items-center gap-2 transition duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  handleGithubLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
