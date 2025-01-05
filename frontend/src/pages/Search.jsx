import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import useUserStore from '../../stores/useUserStore';

function Search() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const { githubData } = useUserStore();
  // console.log(githubData);

  useEffect(() => {
    const findUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    findUsers();
  }, []);

  const renderStars = (rating) => {
    const maxRating = 5; // Maximum star rating
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

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-16 flex flex-col items-center justify-center max-w-5xl w-full mx-auto">
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="flex items-center border shadow-sm rounded-md p-2 max-w-md w-full">
          <CiSearch className="h-6 w-6 text-white" />
          <input
            type="text"
            placeholder="Search for a user..."
            className="border-none outline-none bg-transparent px-2 py-1 rounded-md w-full text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
      </div>
      <div className="mt-8 w-full max-w-2xl z-20 flex flex-col items-center justify-center gap-1">
        {filteredUsers.map(
          (user) =>
            user.githubID != githubData?.username && (
              <div
                key={user._id}
                className="flex w-full items-center justify-between border shadow-sm rounded-md p-2 my-2 hover:scale-105 duration-200 cursor-pointer hover:shadow-md hover:shadow-slate-400"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="rounded-md h-24 w-24"
                  />
                  <div className="flex flex-col items-start justify-center gap-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-white text-xl font-semibold">
                        {user.username}
                      </h2>
                      {/* Render dynamic star rating */}
                      <div className="flex">{renderStars(user.rating)}</div>
                    </div>
                    <h2 className="text-md font-light text-gray-300">
                      ID: {user.githubID}
                    </h2>
                    <p className="text-gray-300">{user.email}</p>
                  </div>
                </div>

                <button className="text-white p-4 hover:text-green-600 duration-150 rounded-md flex items-center gap-1">
                  <IoPersonAdd className="h-6 w-6" />
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Search;
