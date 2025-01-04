import {
  FaGithub,
  FaBrain,
  FaUsers,
  FaProjectDiagram,
  FaComments,
  FaTrophy,
} from 'react-icons/fa';
import Card from '../components/Card';
import { useRef } from 'react';
import confetti from 'canvas-confetti';

const Home = () => {
  const iconRef = useRef(null);

  const handleHover = () => {
    const rect = iconRef.current.getBoundingClientRect();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  return (
    <div className="text-center py-14">
      <div ref={iconRef} onMouseEnter={handleHover} className="cursor-pointer">
        <h1 className="text-5xl font-bold text-white mb-4">
          Find Your Perfect Hackathon Team
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Connect with like-minded developers using GitHub ratings and skills.
          Create your dream team and win the next hackathon <span>🎉</span>!
        </p>
      </div>

      <section className="w-full max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Card
          icon={FaBrain}
          title="Skill Analysis"
          description="Analyze your skills and find teammates with complementary abilities."
          iconColor="text-purple-400"
        />
        <Card
          icon={FaGithub}
          title="GitHub Integration"
          description="Connect your GitHub profile and use your contributions to shine."
          iconColor="text-blue-400"
        />
        <Card
          icon={FaUsers}
          title="Team Recommendations"
          description="Get personalized recommendations for your perfect hackathon team."
          iconColor="text-green-400"
        />
        <Card
          icon={FaProjectDiagram}
          title="Project Management"
          description="Tools to streamline your project planning and execution."
          iconColor="text-yellow-400"
        />
        <Card
          icon={FaComments}
          title="Real-time Collaboration"
          description="Chat and collaborate with your team in real-time."
          iconColor="text-pink-400"
        />
        <Card
          icon={FaTrophy}
          title="Hackathon Insights"
          description="Stay updated on the latest hackathons and insights."
          iconColor="text-red-400"
        />
      </section>
    </div>
  );
};

export default Home;
