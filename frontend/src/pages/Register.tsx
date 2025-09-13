import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  interface User {
    username: string;
    email: string;
    password: string;
  }

  async function createUser(user: User) {
    const res = await fetch('http://localhost:5000/api/auth/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || 'Something went wrong!');
    }

    return data;
  }

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // clear any old error

    const username = usernameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const data = await createUser({ username, email, password });
      console.log('User created:', data);
      localStorage.setItem('authToken', data.token);

      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Create a new Keepmybill account</title>
      </Helmet>
      <main className="flex">
        <div className="h-screen w-1/2 flex items-center justify-center">
          <div className="flex items-center justify-between flex-col h-[75vh] w-[80%]">
            {/* Top */}
            <div className="flex flex-col items-center justify-center">
              <div className="logo">Logo</div>
              <h1 className="text-3xl font-bold">Welcome to KeepMyBill!</h1>
              <p className="text-sm mt-2 mb-2">
                Sign up and start to save up your receipt.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col w-9/10 gap-2 mb-2">
              <input
                ref={usernameRef}
                placeholder="Enter your username"
                className="bg-white py-3 px-2 border border-gray-400 rounded-md focus:outline-blue-600"
                type="text"
              />
              <input
                ref={emailRef}
                placeholder="Enter your email address"
                className="bg-white py-3 px-2 border border-gray-400 rounded-md focus:outline-blue-600"
                type="email"
              />
              <input
                ref={passwordRef}
                placeholder="Enter your password"
                className="bg-white py-3 px-2 border border-gray-400 rounded-md focus:outline-blue-600"
                type="password"
              />
              <button
                className="px-10 py-3 bg-[#CCCCCC] text-white rounded-md text-semibold active:scale-99"
                onClick={handleSubmitClick}
              >
                Continue
              </button>

              {/* Error message */}
              {error && (
                <p className="text-red-500 mt-1 text-center">{error}</p>
              )}
            </form>

            {/* Or separator */}
            <div className="flex items-center w-9/10">
              <hr className="flex-grow border-gray-400" />
              <span className="mx-2 text-gray-600">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            {/* Social buttons */}
            <div className="w-full flex items-center justify-center gap-4">
              <button className="flex items-center gap-3 rounded-lg px-6 py-2 bg-white shadow-md cursor-pointer hover:shadow-lg transition">
                <FaGoogle size={16} className="text-black" />
                <span className="text-gray-700 font-medium">
                  Continue with Google
                </span>
              </button>

              <button className="flex items-center gap-3 rounded-lg px-6 py-2 bg-white shadow-md cursor-pointer hover:shadow-lg transition">
                <FaApple size={20} className="text-black" />
                <span className="text-gray-700 font-medium">
                  Continue with Apple
                </span>
              </button>
            </div>

            {/* Terms */}
            <div className="text-center text-xs w-3/4">
              By creating an account, you are agreeing to our{' '}
              <span className="text-blue-700 underline font-bold cursor-pointer">
                Terms of Service
              </span>{' '}
              and acknowledging receipt of our{' '}
              <span className="text-blue-700 underline font-bold cursor-pointer">
                Privacy Policy
              </span>
              .
            </div>

            {/* Login redirect */}
            <div className="text-base">
              Already have an account?{' '}
              <span
                className="text-blue-700 underline font-bold cursor-pointer"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log in
              </span>
            </div>
          </div>
        </div>
        <div className="h-screen w-1/2 bg-red-900">div2</div>
      </main>
    </React.Fragment>
  );
};

export default Register;
