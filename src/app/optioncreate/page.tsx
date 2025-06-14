"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ For routing

export default function OptionCreate() {
  const [habits, setHabits] = useState<any[]>([]);
  const router = useRouter();
  // const userId = 1; // Replace with dynamic user ID from auth if needed
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch user-specific habits
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id); // ✅ Access id after parsing
    }
    const fetchHabits = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}/habits`);
        if (!res.ok) throw new Error("Failed to fetch habits");
        const data = await res.json();
        setHabits(data);
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };

    fetchHabits();
  }, [userId]);

  const popularHabits = [
    {
      id: 1,
      name: "Workout",
      description: "Hit the gym hard or take your energy outdoors for a run — you've got this!",
      icon: "💪",
    },
    {
      id: 2,
      name: "Drink water",
      description: "Keep your body and mind clear by drinking water throughout the day.",
      icon: "💧",
    },
    {
      id: 3,
      name: "Read",
      description: "Take a moment to unwind with a good book and some tea.",
      icon: "📖",
    },
    {
      id: 4,
      name: "Meditate",
      description: "Ease and cope with stress by centering yourself.",
      icon: "🧘‍♀️",
    },
  ];

  const healthHabits = [
    {
      id: 1,
      name: "Steps",
      description: "Keep moving and aim for more steps during the day.",
      icon: "🚶‍♂️",
    },
    {
      id: 2,
      name: "Exercise",
      description: "Treat your body kindly with some exercise.",
      icon: "🏃‍♂️",
    },
  ];

  return (
    <>
      <Head>
        <title>Add New Habit</title>
      </Head>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-center text-2xl font-bold mb-4">Add New Habit</h1>

          {/* Create Custom Habit Button */}
          <Link href="/add">
            <button className="w-full bg-purple-200 hover:bg-purple-300 text-white font-semibold py-2 px-4 rounded mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create custom habit
            </button>
          </Link>

          {/* User Habits */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Your Habits</h2>
            <p className="text-gray-500 mb-2">Adjust your habits.</p>
            {habits.length === 0 ? (
              <p className="text-gray-400 italic">No habits found.</p>
            ) : (
              habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => {
                    console.log("Clicked habit ID:", habit.id); // ✅ Console log
                    router.push(`/editDelete?habitId=${habit.id}`);
                  }}
                  className="bg-purple-200 rounded-md p-4 mb-2 cursor-pointer hover:bg-purple-300 transition"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon_default || "📝"}</span>
                    <h3 className="font-medium">{habit.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Popular Habits */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Popular Habits</h2>
            <p className="text-gray-500 mb-2">Just starting out or want to try something new? These habits are for you!</p>
            {popularHabits.map((habit) => (
              <div key={habit.id} className="bg-purple-200 rounded-md p-4 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{habit.icon}</span>
                  <h3 className="font-medium">{habit.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{habit.description}</p>
              </div>
            ))}
          </div>

          {/* Health Habits */}
          <div>
            <h2 className="text-xl font-bold mb-2">Health Habits</h2>
            <p className="text-gray-500 mb-2">Just starting out or want to try something new? These habits are for you!</p>
            {healthHabits.map((habit) => (
              <div key={habit.id} className="bg-purple-200 rounded-md p-4 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{habit.icon}</span>
                  <h3 className="font-medium">{habit.name}</h3>
                </div>
                <p className="text-sm text-gray-500">{habit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
