import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Onboarding({ session, onHabitSet }) {
    const [selectedHabit, setSelectedHabit] = useState('');
    const [customHabit, setCustomHabit] = useState('');

    const handleHabitSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.from('user_meta').upsert({
            user_id: session.user.id,
            habit: selectedHabit === 'other' ? customHabit : selectedHabit
        });
        if (error) {
            console.error('Error saving habit:', error);
        } else {
            onHabitSet(selectedHabit === 'other' ? customHabit : selectedHabit);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50">
            
            <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Welcome!<br />What are you trying to quit?</h2>

                <form className="flex flex-col gap-4 w-full" onSubmit={handleHabitSubmit}>
                    <select
                        value={selectedHabit}
                        onChange={(e) => setSelectedHabit(e.target.value)}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full"
                    >
                        <option value="" disabled>Select a habit</option>
                        <option value="smoking">Smoking</option>
                        <option value="junk_food">Junk Food</option>
                        <option value="social_media">Social Media</option>
                        <option value="other">Other</option>
                    </select>
                    {selectedHabit === 'other' && (
                        <input
                            type="text"
                            required
                            placeholder="Enter your habit"
                            value={customHabit}
                            onChange={(e) => setCustomHabit(e.target.value)}
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                        />
                    )}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-400 to-blue-300 text-white font-semibold py-2 rounded-lg mt-2  w-full"
                    >
                        Set Habit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Onboarding;