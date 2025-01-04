import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  githubData: null,
  setUser: (user) => set({ user }),
  setGithubData: (data) => set({ githubData: data }),
  clearState: () => set({ user: null, githubData: null }),
}));

onAuthStateChanged(auth, async (firebaseUser) => {
  const store = useUserStore.getState();

  if (firebaseUser) {
    store.setUser(firebaseUser);

    const token = localStorage.getItem('github_token');
    if (token) {
      try {
        const userData = await fetchGitHubUserData(token);
        if (userData) {
          store.setGithubData(userData);
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/update-rating`,
            {
              githubID: userData.username,
              username: userData.name || firebaseUser.displayName,
              email: userData.email || firebaseUser.email,
              profilePicture: userData.avatar_url || firebaseUser.photoURL,
              contributions: userData.followers,
              pullRequests: userData.following,
              starsReceived: userData.total_stars,
              followers: userData.followers,
              publicRepos: userData.public_repos,
            }
          );
          console.log('User rating updated:', response.data);
        } else {
          store.clearState();
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
        store.clearState();
      }
    } else {
      store.clearState();
    }
  } else {
    store.clearState();
  }
});

// Function to fetch GitHub data
const fetchGitHubUserData = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const userResponse = await fetch('https://api.github.com/user', {
      headers,
    });
    const user = await userResponse.json();

    const reposResponse = await fetch(user.repos_url, { headers });
    const repos = await reposResponse.json();

    const stars = repos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    return {
      username: user.login,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      total_stars: stars,
      repos: repos.map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
      })),
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    return null;
  }
};

export default useUserStore;
