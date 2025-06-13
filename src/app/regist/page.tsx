"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: visual representation */}
      <div className="w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 flex flex-col justify-center items-center rounded-r-full">
        <Image
          src="/logo1.png"
          alt="Logo"
          width={250}
          height={250}
          className="mb-4"
        />
        <Image
          src="/ilustrasi.png"
          alt="ils"
          width={350}
          height={350}
          className="rounded-lg"
        />
      </div>

      {/* Right side: form signup */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h2 className="text-3xl font-bold text-purple-600">Create Account</h2>
        <p className="text-gray-500 my-2">
          Create an account so you can explore all the existing jobs
        </p>

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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <Link href="/login">
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Sign up
          </button>
          </Link>
        </form>

        <Link href="/login">
          <div className="mt-4 text-gray-500">Already have an account</div>
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