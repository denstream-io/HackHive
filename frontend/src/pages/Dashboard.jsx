import PropTypes from 'prop-types';
import useUserStore from '../../stores/useUserStore';

const Dashboard = () => {
  const { user, githubData: data } = useUserStore();
  if (!user) {
    return (
      <div className="text-white h-screen text-center flex items-center justify-center">
        Please log in to see your dashboard.
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {data?.name || user.displayName}!
      </h1>
      <p className="mb-4">Here’s your GitHub profile data:</p>
      <ul>
        <li>Username: {data?.username}</li>
        <li>Email: {data?.email}</li>
        <li>Followers: {data?.followers}</li>
        <li>Following: {data?.following}</li>
        <li>Public Repos: {data?.public_repos}</li>
        <li>Total Stars: {data?.total_stars}</li>
      </ul>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object,
  data: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
    public_repos: PropTypes.number,
    total_stars: PropTypes.number,
  }),
};

export default Dashboard;
