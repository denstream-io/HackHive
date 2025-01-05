import PropTypes from 'prop-types';
import useUserStore from '../../stores/useUserStore';

const Dashboard = () => {
  const { user, githubData: data } = useUserStore();
  console.log(data);
  if (!user) {
    return (
      <div className="text-white h-screen text-center flex items-center justify-center">
        Please log in to see your dashboard.
      </div>
    );
  }

  return (
    <div className="text-white z-20 flex flex-col items-center justify-center mt-14 max-w-4xl mx-auto w-full">
      <div className="flex gap-4 justify-start w-full">
        <img
          src={data?.avatar_url}
          alt="profile pic"
          className="border hover:rotate-[20deg] duration-150 h-[200px] w-[200] rounded-md cursor-pointer"
        />
        <div className="flex">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">
              Welcome, {data?.name || user.displayName}!
            </h1>
            <h1 className="text-lg ">Username: {data?.username}</h1>
            <h1 className="text-lg">Email: {data?.email || user.email}</h1>
            <h1 className="text-lg max-w-lg">
              Bio: {data?.bio || 'No bio provided by the user.'}
            </h1>
          </div>
        </div>
      </div>
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

// <div className="p-6 text-white">
//   <h1 className="text-3xl font-bold mb-4">
//     Welcome, {data?.name || user.displayName}!
//   </h1>
//   <p className="mb-4">Here’s your GitHub profile data:</p>
//   <ul>
//     <li>Username: {data?.username}</li>
//     <li>Email: {data?.email}</li>
//     <li>Followers: {data?.followers}</li>
//     <li>Following: {data?.following}</li>
//     <li>Public Repos: {data?.public_repos}</li>
//     <li>Total Stars: {data?.total_stars}</li>
//   </ul>
// </div>;
