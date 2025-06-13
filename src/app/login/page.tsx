import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: visual representation */}
      <div className="w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 flex justify-center items-center rounded-r-full flex flex-col">
        <Image
          src="/logo1.png" // pastikan gambar sesuai ditempatkan di folder public
          alt="logo"
          width={250}
          height={250}
          className="rounded-lg"
        />
        <Image
          src="/ilustrasi.png"
          alt="ils"
          width={350}
          height={350}
        />
      </div>

      {/* Right side: form login */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h2 className="text-3xl font-bold text-purple-600">Login here</h2>
        <p className="text-gray-500 my-2">Welcome back you've been missed!</p>

        <form className="w-full max-w-sm mt-4 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="text-right text-sm text-purple-600 cursor-pointer hover:underline">
            Forgot your password?
          </div>

          <Link href="/dashboard">
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>
          </Link>
        </form>

        <Link href="/regist">
          <div className="mt-4 text-gray-500">Create new account</div>
        </Link>
        <div className="mt-4 text-purple-500">Or continue with</div>

        <div className="mt-4 flex gap-2">
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/google.png" alt="g" width={20} height={20}/>
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/facebook.png" alt="f" width={20} height={20}/>
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/apple.png" alt="f" width={20} height={20}/>
          </button>
        </div>
      </div>
    </div>
  );
}