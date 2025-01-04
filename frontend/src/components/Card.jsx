import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Card = ({ icon: Icon, title, description, iconColor }) => {
  useEffect(() => {
    gsap.fromTo(
      '.glass-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.3 }
    );
  }, []);
  return (
    <div className="glass-card p-6 rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-lg flex flex-col items-center text-center">
      <Icon className={`text-4xl ${iconColor} mb-4`} />
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
};

export default Card;
