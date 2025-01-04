import axios from 'axios';
import { useEffect, useState } from 'react';

function Search() {
  const [users, setUsers] = useState([]);

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

  return <div className=""></div>;
}

export default Search;
