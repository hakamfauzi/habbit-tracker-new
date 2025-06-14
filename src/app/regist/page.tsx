"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully. You can now login.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/dashboard");
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
      <div className="w-1/2 bg-gradient-to-br from-purple-400 to-purple-600 flex flex-col justify-center items-center rounded-r-full">
        <Image src="/logo1.png" alt="Logo" width={250} height={250} className="mb-4" />
        <Image src="/ilustrasi.png" alt="Illustration" width={350} height={350} className="rounded-lg" />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <h2 className="text-3xl font-bold text-purple-600">Create Account</h2>
        <p className="text-gray-500 my-2">Create an account so you can explore all the existing jobs</p>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <form onSubmit={handleRegister} className="w-full max-w-sm mt-4 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-md border border-purple-300 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <Link href="/login" className="mt-4 text-gray-500">Already have an account</Link>
        <div className="mt-4 text-purple-500">Or continue with</div>

        <div className="mt-4 flex gap-2">
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/google.png" alt="Google" width={20} height={20} />
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
          </button>
          <button className="p-2 rounded-md border hover:bg-gray-50">
            <Image src="/apple.png" alt="Apple" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
