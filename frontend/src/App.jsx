import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth, githubProvider, signInWithPopup } from '../firebase';
import { GithubAuthProvider } from 'firebase/auth';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; // A new page for user dashboard
import Home from './pages/Home'; // Home page where the login and features will be displayed
import useUserStore from '../stores/useUserStore';
import Teams from './pages/Teams';
import Search from './pages/Search';
import { Toaster } from 'react-hot-toast';
import RoomPage from './pages/RoomPage';

function App() {
  const { user, setUser } = useUserStore();

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('github_token', token);
      // console.log('GitHub token:', token);
      const tempUser = result.user;
      setUser(tempUser);
    } catch (error) {
      console.error('GitHub Login Failed:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout Failed:', error.message);
    }
  };

  return (
    <Router>
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center relative overflow-auto">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-96 h-96 bg-purple-700 blur-3xl opacity-30 rounded-full absolute top-10 left-10"></div>
          <div className="w-96 h-96 bg-blue-500 blur-3xl opacity-30 rounded-full absolute bottom-10 right-10"></div>
        </div>

        <Navbar
          user={user}
          handleGithubLogin={handleGithubLogin}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/rooms/:roomId" element={<RoomPage />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
