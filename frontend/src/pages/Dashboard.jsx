import PropTypes from 'prop-types';
import useUserStore from '../../stores/useUserStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillStar, AiOutlineStar, AiOutlineTeam } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, githubData: data } = useUserStore();
  const [stars, setStars] = useState(0);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate(); // Add the useNavigate hook

  useEffect(() => {
    async function fetchData() {
      if (user && data) {
        const [res1, res2] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${data.username}`
          ),
        ]);

        const userTeams = res1.data.filter((team) =>
          team.members.map((member) => member.githubID == data.githubID)
        );

        setTeams(userTeams);
        setStars(res2.data.rating);
      }
    }
    fetchData();
  }, [data, user]);

  if (!user) {
    return (
      <div className="text-white h-screen text-center flex items-center justify-center">
        Please log in to see your dashboard.
      </div>
    );
  }

  const renderStars = (rating) => {
    const maxRating = 5;
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-yellow-400" />
        ) : (
          <AiOutlineStar key={i} className="text-gray-400" />
        )
      );
    }
    return stars;
  };

  const handleEnterTeam = (roomId) => {
    // Navigate to the specific team room using the roomId
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="text-white z-20 flex flex-col items-center justify-center mt-14 max-w-4xl mx-auto w-full">
      <div className="flex gap-4 justify-start w-full">
        <img
          src={data?.avatar_url}
          alt="profile pic"
          className="border hover:rotate-[20deg] duration-150 h-[200px] w-[200px] rounded-md cursor-pointer"
        />
        <div className="flex">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">
              Welcome, {data?.name || user.displayName}!
            </h1>
            <div className="flex gap-2">{renderStars(stars)}</div>
            <h1 className="text-lg ">Username: {data?.username}</h1>
            <h1 className="text-lg">Email: {data?.email || user.email}</h1>
            <h1 className="text-lg max-w-lg">
              Bio: {data?.bio || 'No bio provided by the user.'}
            </h1>
          </div>
        </div>
      </div>
      {teams.length > 0 ? (
        <div className="mt-8 w-full">
          <h1 className="text-2xl font-semibold">Your Teams</h1>
          <div className="flex gap-8 mt-8 flex-wrap justify-start">
            {teams.map((team) => (
              <div
                key={team._id}
                className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 w-[350px] h-[250px] border border-gray-600 hover:border-yellow-400 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <AiOutlineTeam className="text-4xl text-gray-400" />
                  <h1 className="text-xl font-semibold">{team.name}</h1>
                </div>
                <h2 className="text-md text-gray-300">{team.description}</h2>
                <h3 className="text-sm text-gray-500">
                  Join Code: {team.joinCode}
                </h3>
                <button
                  className="bg-yellow-400 text-black py-2 px-4 rounded-md mt-auto hover:bg-yellow-500 transition-colors duration-200"
                  onClick={() => handleEnterTeam(team._id)} // Pass team ID to navigate
                >
                  Enter Team
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Your Teams</h1>
          <h1 className="text-lg">You are not a part of any team yet.</h1>
        </div>
      )}
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
