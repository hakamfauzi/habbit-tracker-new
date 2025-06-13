import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-4">
      <Image
        src="/logoStart.png" 
        alt='logo'// Pastikan logo.png ada di public folder
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold text-purple-600 mt-4">Habbit Tracker</h1>
      <p className="text-gray-600 mt-2">
        Easily track your daily habits and see real progress over time.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/login">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Login
          </button>
        </Link>
        <Link href="/regist">
          <button className="text-purple-600 font-semibold  py-2 hover:text-black">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
