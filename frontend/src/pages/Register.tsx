import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../components/ui/Inputs/UserInput';
import SocialButton from '../components/ui/Buttons/SocialButton';
import PageTitle from '../components/ui/Helmets/PageTitle';
import AuthFooter from '../components/ui/Footer/AuthFooter';

const Register = () => {
  const navigate = useNavigate();
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleInput = () => {
      const username = usernameRef.current?.value || '';
      const email = emailRef.current?.value || '';
      const password = passwordRef.current?.value || '';

      if (username.length >= 5 && email.length >= 5 && password.length >= 5) {
        setSubmitEnabled(true);
      } else {
        setSubmitEnabled(false);
      }
    };

    const usernameEl = usernameRef.current;
    const emailEl = emailRef.current;
    const passwordEl = passwordRef.current;

    usernameEl?.addEventListener('input', handleInput);
    emailEl?.addEventListener('input', handleInput);
    passwordEl?.addEventListener('input', handleInput);

    // cleanup
    return () => {
      usernameEl?.removeEventListener('input', handleInput);
      emailEl?.removeEventListener('input', handleInput);
      passwordEl?.removeEventListener('input', handleInput);
    };
  }, []);

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
      <PageTitle title={'Create a new Keepmybill account'} />

      <main className="flex">
        <div className="h-screen w-1/2 flex items-center justify-center">
          <div className="flex items-center justify-between flex-col h-[75vh] w-[80%]">
            {/* Top */}
            <div className="flex flex-col items-center justify-center">
              <div className="logo">Logo</div>
              <h1 className="text-3xl font-bold">Welcome to KeepMyBill!</h1>
              <h4 className="text-sm mt-2 mb-2">
                Sign up and start to save up your receipt.
              </h4>
            </div>

            {/* Form */}
            <form className="flex flex-col w-9/10 gap-2 mb-2">
              <UserInput
                ref={usernameRef}
                placeholder="Enter your username"
                type="text"
              />
              <UserInput
                ref={emailRef}
                placeholder="Enter your email address"
                type="email"
              />
              <UserInput
                ref={passwordRef}
                placeholder="Enter your password"
                type="password"
              />
              <button
                className={`px-10 py-3  text-white rounded-md text-semibold ${
                  submitEnabled
                    ? 'active:scale-99 bg-[#50A2FF]'
                    : 'cursor-not-allowed bg-[#CCCCCC]'
                }`}
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
              <SocialButton label="google"></SocialButton>
              <SocialButton label="apple"></SocialButton>
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
        <div className="h-screen w-1/2 bg-red-900">
          <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* Shapes */}
            <div className="flex gap-20 mb-8">
              <div className="w-25 h-25 bg-orange-500 rotate-45"></div>
              <div className="w-20 h-20 bg-green-400 rounded-b-full"></div>
              <div className="w-14 h-14 bg-green-600 rotate-20 rounded-t-full"></div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-serif text-center">
              Scan. Save. Track <br />
              <span className="font-bold">Remember everything</span>
            </h1>

            {/* Bottom shapes */}
            <div className="flex gap-30 mt-12">
              <div className="w-30 h-30 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-30 h-20 bg-green-800 rotate-10 rounded-lg"></div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <AuthFooter />
      </main>
    </React.Fragment>
  );
};

export default Register;
