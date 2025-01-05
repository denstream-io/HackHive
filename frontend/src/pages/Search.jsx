import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoPersonAdd } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import useUserStore from '../../stores/useUserStore';
import toast from 'react-hot-toast';

function Search() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { githubData } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  // console.log('user:', user);
  // console.log('githubData:', githubData);
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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRoom = () => {
    setIsModalOpen(true); // Open modal when "Add" button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
    setRoomCode('');
    setRoomName('');
    setRoomDescription('');
  };

  const handleJoinRoom = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/join`, {
        roomCode,
        userId: githubData._id,
      });
      alert('Successfully joined the room');
      handleModalClose();
    } catch (error) {
      alert('Error joining room: ' + error.message);
    }
  };

  const handleCreateRoomSubmit = async () => {
    try {
      const userToAdd = filteredUsers.find(
        (user) => user.githubID !== githubData?.username
      );

      if (!userToAdd) {
        toast.error('User not found');
        return;
      }

      // Using Promise.all to fetch both user data concurrently
      const [userData, userToAddData] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${githubData.username}`
        ),
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userToAdd.githubID}`
        ),
      ]);

      console.log('userData:', userData.data);
      console.log('userToAddData:', userToAddData.data);

      // Generate a unique joinCode
      const generateJoinCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters[randomIndex];
        }
        return code;
      };

      const joinCode = generateJoinCode(); // Generate the code

      // Proceed with room creation
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
        joinCode,
        name: roomName,
        description: roomDescription,
        members: [userData.data._id, userToAddData.data._id], // Use `userToAdd` for member
      });

      toast.success('Room created successfully');
      handleModalClose();
    } catch (error) {
      toast.error('Error creating room: ' + error.message);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center max-w-5xl w-full mx-auto z-20">
      <div className="w-full mx-auto flex items-center justify-center mb-8">
        <div className="flex items-center border shadow-sm rounded-md p-2 max-w-md w-full bg-transparent">
          <CiSearch className="h-6 w-6 text-white" />
          <input
            type="text"
            placeholder="Search for a user..."
            className="border-none outline-none bg-transparent px-2 py-1 rounded-md w-full text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl z-20 flex flex-col items-center justify-center gap-1">
        {filteredUsers.map(
          (user) =>
            user.githubID !== githubData?.username && (
              <div
                key={user._id}
                className="flex w-full items-center justify-between border shadow-sm rounded-md p-2 my-2 hover:scale-105 duration-200 cursor-pointer hover:shadow-md hover:shadow-slate-400 bg-opacity-40"
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
                      <div className="flex">{renderStars(user.rating)}</div>
                    </div>
                    <h2 className="text-md font-light text-gray-300">
                      ID: {user.githubID}
                    </h2>
                    <p className="text-gray-300">{user.email}</p>
                  </div>
                </div>

                <button
                  className="text-white p-4 hover:text-green-600 duration-150 rounded-md flex items-center gap-1"
                  onClick={() => handleCreateRoom(user)}
                >
                  <IoPersonAdd className="h-6 w-6" />
                </button>
              </div>
            )
        )}
      </div>

      {/* Modal for Join or Create Room */}
      {isModalOpen && (
        <div className="z-40 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-md w-96 shadow-lg shadow-gray-500 text-white">
            <h3 className="text-xl font-semibold mb-4 ">
              Do you want to join / create a room?
            </h3>
            <div className="flex gap-4 mb-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={() => setIsJoiningRoom(true)}
              >
                Join Room
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={() => setIsJoiningRoom(false)}
              >
                Create Room
              </button>
            </div>

            {isJoiningRoom ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter Room Code"
                  className="border p-2 rounded-md w-full mb-4 bg-transparent"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-md w-full"
                  onClick={handleJoinRoom}
                >
                  Join Room
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter Room Name"
                  className="border p-2 rounded-md w-full mb-4 bg-transparent"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <textarea
                  placeholder="Enter Room Description"
                  className="border p-2 rounded-md w-full mb-4 bg-transparent"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white p-2 rounded-md w-full"
                  onClick={handleCreateRoomSubmit}
                >
                  Create Room
                </button>
              </div>
            )}
            <button
              className="bg-red-500 text-white p-2 rounded-md w-full mt-4"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
