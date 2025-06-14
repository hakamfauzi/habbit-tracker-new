"use client";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await res.json();
      console.log('Login success:', data); // ✅ Optional: save token if needed
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 flex justify-center items-center rounded-r-full flex-col">
        <Image src="/logo1.png" alt="logo" width={250} height={250} className="rounded-lg" />
        <Image src="/ilustrasi.png" alt="ils" width={350} height={350} />
      </div>

      {/* Right */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h2 className="text-3xl font-bold text-purple-600">Login here</h2>
        <p className="text-gray-500 my-2">Welcome back youve been missed!</p>

        <form className="w-full max-w-sm mt-4 space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right text-sm text-purple-600 cursor-pointer hover:underline">
            Forgot your password?
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <a href="/regist" className="mt-4 text-gray-500">Create new account</a>

        <div className="mt-4 text-purple-500">Or continue with</div>

        <div className="mt-4 flex gap-2">
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/google.png" alt="g" width={20} height={20} />
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/facebook.png" alt="f" width={20} height={20} />
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/apple.png" alt="f" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
