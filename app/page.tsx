import SignIn from '@/components/sign-in';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <SignIn />
    </div>
  );
}
