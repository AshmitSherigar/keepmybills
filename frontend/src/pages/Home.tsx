import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  interface IUser {
    id: string;
    username: string;
    email: string;
  }
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:5000/api/protected', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!res.ok) {
          navigate('/login');
          return;
        }

        const data = await res.json();

        setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        navigate('/register');
      }
    }

    fetchUser();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <Helmet>
        <title>Home - KeepMyBills</title>
      </Helmet>
      <Sidebar user={user} />

      <h1>Home</h1>
    </React.Fragment>
  );
};

export default Home;
