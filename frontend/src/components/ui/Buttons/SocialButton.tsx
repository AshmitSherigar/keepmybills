
import { FaGoogle, FaApple } from 'react-icons/fa';

interface SocialButtonProps {
  label?: 'google' | 'apple'; 
}

const providers = {
  google: {
    icon: <FaGoogle size={16} className="text-black" />,
    text: 'Continue with Google',
  },
  apple: {
    icon: <FaApple size={16} className="text-black" />,
    text: 'Continue with Apple',
  },
};

const SocialButton = ({ label }: SocialButtonProps) => {
  const provider = label ? providers[label] : null;

  return (
    <button
      className="flex items-center gap-3 rounded-lg px-6 py-2 bg-white shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => alert('This feature is yet to be added')}
    >
      {provider && (
        <>
          {provider.icon}
          <span className="text-gray-700 font-medium">{provider.text}</span>
        </>
      )}
    </button>
  );
};

export default SocialButton;
