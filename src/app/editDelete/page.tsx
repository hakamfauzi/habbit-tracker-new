'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const EditHabitPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<number | null>(null);

  const [habit, setHabit] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#EADBFF',
    goal: 1,
    frequency: 'daily',
    timeOfDay: 'all',
    reminder: false,
  });

  const habitId = searchParams.get('habitId');
  // const userId = 1;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id); // ✅ Access id after parsing
      }
  }, [])

  useEffect(() => {
    if (!userId || !habitId) return;
    const fetchHabit = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}/habits`);
        const data = await res.json();
        const targetHabit = data.find((h: any) => String(h.id) === habitId);
        if (targetHabit) {
          setHabit(targetHabit);
        }
      } catch (error) {
        console.error('Error fetching habit:', error);
      }
    };

    if (habitId) {
      fetchHabit();
    }
  }, [userId, habitId]);

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name || '',
        icon: habit.icon_default || '',
        color: habit.color || '#EADBFF',
        goal: habit.goal || 1,
        frequency: habit.frequency || 'daily',
        timeOfDay: habit.time_of_day || 'all',
        reminder: habit.reminder || false,
      });
    }
  }, [habit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
  };

   const mapTimeOfDay = (time: string): number => {
        const mapping: { [key: string]: number } = {
            all: 0,
            morning: 1,
            afternoon: 2,
            evening: 3,
        };
        return mapping[time] ?? 0;
    };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Habit</h1>

      {/* Name */}
      <div className="mb-6">
        <p className="font-semibold mb-1">Name</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="bg-[#EADBFF] px-4 py-2 rounded-md w-full"
        />
      </div>

      {/* Icon and Color */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Icon and color</p>
        <div className="flex gap-4">
          {/* Icon */}
          <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center gap-2">
            <span className="text-2xl">{formData.icon}</span>
            <span className="font-medium">Icon</span>
          </div>

          {/* Color */}
          <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: formData.color }}
            ></div>
            <span className="font-medium">Color</span>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Goal</p>
        <div className="bg-[#EADBFF] rounded-xl p-4 relative">
          <button
            onClick={() => router.push('/add?step=3')}
            className="absolute top-2 right-2 bg-[#D3BAFF] px-3 py-1 text-sm rounded-full font-medium"
          >
            Change
          </button>

          <div className="mb-3">
            <p className="text-lg font-semibold">{formData.goal} time</p>
            <p className="text-sm text-gray-600">or more per day</p>
          </div>

          <div className="bg-purple-300 px-4 py-2 rounded-lg inline-flex items-center gap-2 w-fit capitalize">
            <Image src="/tabler_refresh.png" width={20} height={20} alt="refresh" />
            {formData.frequency}
          </div>
        </div>
      </div>

      {/* During */}
      <div className="mb-6">
        <p className="font-semibold mb-2">During</p>
        <div className="grid grid-cols-2 gap-4">
          {['all', 'morning', 'afternoon', 'evening'].map((time) => (
            <div
              key={time}
              className={`px-4 py-4 rounded-xl text-center capitalize ${
                formData.timeOfDay === time
                  ? 'bg-[#EADBFF] font-semibold text-black'
                  : 'bg-gray-100 text-gray-400'
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, timeOfDay: time }))}
            >
              {time === 'all' ? (
                <>
                  <span className="text-2xl">🌈</span>
                  <br />
                  All
                </>
              ) : (
                <>
                  <img src={`/${time}.png`} alt={time} className="w-6 h-6 mx-auto mb-1" />
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="mb-6">
        <p className="font-semibold mb-1">Reminder</p>
        <p className="text-sm text-gray-500 mb-2">
          Set up reminders to help you crush your new habit goals
        </p>
        <div className="bg-[#EADBFF] px-4 py-2 rounded-md flex items-center justify-between">
          <span>Set reminder</span>
          <input
            type="checkbox"
            name="reminder"
            checked={formData.reminder}
            onChange={handleCheckboxChange}
            className="form-checkbox w-5 h-5"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
            <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        onClick={async () => {
            if (!habitId) return;

            const confirmed = window.confirm('Are you sure you want to delete this habit?');
            if (!confirmed) return;

            try {
            const res = await fetch(`http://localhost:8000/api/habits/${habitId}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            alert('Habit deleted successfully!');
            router.push('/dashboard'); // Redirect after deletion
            } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete the habit.');
            }
        }}
        >
        Delete Habit
        </button>

        <button
          className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-md"
         onClick={async () => {
            if (!habitId) return;

            try {
                const res = await fetch(`http://localhost:8000/api/habits/${habitId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    icon_default: formData.icon,
                    goal_time: formData.goal.toString(),
                    color: formData.color,
                    time_options: mapTimeOfDay(formData.timeOfDay),
                    user_id: userId,
                }),
                });

                if (!res.ok) throw new Error('Failed to update habit');

                alert('Habit updated successfully!');
                router.push('/dashboard'); // Redirect to homepage or habit list
            } catch (error) {
                console.error('Update failed:', error);
                alert('Failed to update habit.');
            }
            }}

        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditHabitPage;
