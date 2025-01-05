import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../stores/useUserStore';
import { IoSend } from 'react-icons/io5';

function RoomPage() {
  const { roomId } = useParams(); // Get the roomId from the URL
  const { githubData } = useUserStore();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch room details
    async function fetchRoomData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`
        );
        setRoom(res.data);
        setMembers(res.data.members || []); // Assuming room has members
        setMessages(res.data.messages || []); // Assuming room has messages
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    }
    fetchRoomData();
  }, [roomId]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!message) return;

    const isAskAI = message.startsWith('/askai');
    let newMessage = {
      text: message,
      userId: githubData.username, // Use actual user ID (githubData.username)
      timestamp: new Date(),
    };

    if (isAskAI) {
      const aiResponse = await getAIResponse(message.substring(7).trim()); // Get AI response (remove "/askai" part)
      newMessage = {
        text: aiResponse,
        userId: 'AI', // Mark AI as the user
        timestamp: new Date(),
      };
    }

    // Update messages in state
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear input field
    setMessage('');
  };

  const getAIResponse = async (question) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ask-ai`,
        { message: question }
      );
      return response.data.answer || 'Sorry, I could not answer that.';
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'An error occurred while fetching the AI response.';
    }
  };

  return (
    <div className="text-white z-20 flex flex-col items-center justify-center mt-14 max-w-6xl mx-auto w-full">
      {room ? (
        <>
          <div className="flex gap-8 w-full mb-8">
            {/* Room Information and Members */}
            <div className="flex flex-col w-1/3 bg-gray-800 p-6 rounded-lg h-[500px] overflow-y-auto shadow-lg border border-gray-700">
              <h1 className="text-3xl font-semibold mb-6">{room.name} Room</h1>

              <h2 className="text-xl font-semibold mb-4">Room Members</h2>
              <div className="flex flex-wrap gap-4">
                {members.map((member) => (
                  <div
                    key={member.githubID}
                    className="bg-gray-700 p-4 rounded-lg flex flex-col items-center gap-2 transition-transform transform hover:scale-105 hover:bg-gray-600"
                  >
                    <img
                      src={member.profilePicture || '/default-avatar.png'}
                      alt={member.name}
                      className="h-[60px] w-[60px] rounded-full border-2 border-yellow-500"
                    />
                    <h3 className="text-lg text-center">{member.name}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col w-2/3 bg-gray-800 p-6 rounded-lg h-[500px] flex-1 shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                Chat with AI and team mates 🤖
              </h2>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 mb-4 ${
                      msg.userId === githubData.username
                        ? 'justify-end' // Align the current user's messages to the right
                        : 'justify-start' // Align other users' messages to the left
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-[80%] break-words shadow-md ${
                        msg.userId === githubData.username
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <div className="text-sm font-semibold">{msg.userId}</div>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input (Always at the bottom) */}
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-700 p-2 rounded-md text-white w-full outline-none border focus:border-yellow-500"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="bg-yellow-700 flex items-center text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors transform hover:scale-105"
                >
                  Send
                  <IoSend className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl">Loading room...</h2>
        </div>
      )}
    </div>
  );
}

export default RoomPage;
