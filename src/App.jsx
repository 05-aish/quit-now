import { useState, useEffect, use } from 'react'
import GoodBad from './components/GoodBad';
import LogForm from './components/LogForm';
import Toast from './components/Toast';
import FeedbackMsg from './components/FeedbackMsg';
import Entries from './components/Entries';
import Loading from './components/Loading';
import Streak from './components/Streak';
import BottomButtons from './components/BottomButtons';
import Achievements from './components/Achievements';
import Confetti from "react-confetti";
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import { supabase } from './supabaseClient';

function App() {

  const [loadingSession, setLoadingSession] = useState(true);

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session)
      setLoadingSession(false);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        setLoadingSession(false);
        setHabit(null);
        setStreakCount(0);
        setEntries([]);
        setLastEntryDate(null);
        setAchievements([]);
      }
    })
  }, [])
  
  

  //good or bad (response 1)
  const [userInput, setUserInput] = useState(false);

  //clicked any good or bad button state
  const [clicked, setClicked] = useState(false);

  //submit button state
  const [submitted, setSubmitted] = useState(false);

  //state for last entry date taken from user_meta table
  const [lastEntryDate, setLastEntryDate] = useState(null);

  //streak state
  const [streakCount, setStreakCount] = useState(0);
  //habit state
  const [habit, setHabit] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  //fetch user meta table containing streakcount and lastentry date
  const fetchUserMeta = async () => {

    if (!session) {
      setLoadingUserData(false)
      return;
    }

    const { data, error } = await supabase.from('user_meta').select('*').eq('user_id', session.user.id);
    
    if (!error && data.length > 0) {
        setStreakCount(data[0].streak_count)
        setLastEntryDate(data[0].last_entry_date)
        setHabit(data[0].habit)
    }
    setLoadingUserData(false);
    
  }

  //handling write to database when streakcount or last entry date chnages, called in handle submit
  
  const updateUserMeta = async (newStreak, newLastEntryDate) => {
    const { data, error } = await supabase.from('user_meta').upsert({
      user_id: session.user.id,
      streak_count: newStreak,
      last_entry_date: newLastEntryDate
    },
    { onConflict: 'user_id' })
  }

  //state of input field
  const [textFieldInput, setTextFieldInput] = useState('');

  //log entries in local storage
  const [entries, setEntries] = useState([]);

  //fetch data
  const fetchEntries = async () => {
      if (!session) return
      const { data, error } = await supabase.from('entries').select('*').eq('user_id', session.user.id)

      if (!error) setEntries(data)
  }

  useEffect(() => {
    fetchEntries()
    fetchUserMeta()
    fetchAchievements()
  }, [session])


  //show toast after entry
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  
  const triggerToast = (msg) => {
    setMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3 seconds
  };

  //adding an entry
  const addEntry = async (newEntry) => {

    triggerToast("Saving entry...");
    const { data, error } = await supabase.from('entries').insert({ ...newEntry, user_id: session.user.id });
    if (!error) {
      fetchEntries()
      triggerToast("Saved!")
    }
  }


  //deleting an entry
  const deleteEntry = async (id) => {
    const { data, error } = await supabase.from('entries').delete().eq('id', id).eq('user_id', session.user.id);

    if (!error) fetchEntries()
  }

  //feedback message after submission.
   const feedbackMessages = {
    good: ["Great job! Keep it up! 🌟", "Awesome! You're doing amazing!", "Fantastic! Keep the momentum going!"],
    bad: ["Don't worry, tomorrow is a new day!", "It's okay to have bad days, keep pushing forward!", "Every day is a fresh start, stay positive! 🌞"]
  };

  const [feedback, setFeedback] = useState('');
  function getRandomFeedback(response) {
    const messages = response ? feedbackMessages.good : feedbackMessages.bad;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setFeedback(randomMessage);
  }

  //streak logic helper functions to allow only one entry per day.
  const isSameDay = (date1, date2) => {
    return new Date(date1).toDateString() === new Date(date2).toDateString();
  }
  const isYesterday = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    
    const yesterday = new Date(date2);
    yesterday.setDate(date2.getDate() - 1);

    return date1.toDateString() === yesterday.toDateString();
  };
  

  const canSelectResponse = !lastEntryDate || !isSameDay(lastEntryDate, new Date());

  //check daily or manual log.
  const [isDailyLog, setIsDailyLog] = useState(false);

  //if handleResponse is called, it means user has selected good/bad, thus it is a daily log.
  // i need to figure out how to let user Cross out the modal without triggering submission.

  const handleResponse = (response) => {
    setUserInput(response);
    console.log("GOOD/BAD CLICKED", response);
    setClicked(true);
    setIsDailyLog(true);
    setFeedback('');
  };

  //if its manual log, dont increase streak as well as dont show feedback message, also allow user to close the input field without submission, REGISTER IT AS THE SAME GOOD/BAD DAY ENTRY AS CHOSEN IN THE DAILY LOG.
  const handleManualLog = () => {
    setClicked(true);
    setIsDailyLog(false);
    setSubmitted(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent the default form submission behavior
    console.log('Form submitted with input:', textFieldInput);
    //set submitted to true to show feedback message and then reset after 5 seconds
    setSubmitted(true);
     setTimeout(() => {
      setSubmitted(false);
    }, 5000); // 5 seconds
    setClicked(false);

    //object to store in storage.
    const newEntry = {
    id: Date.now(),
    date: new Date().toDateString(),
    response: userInput,
    log: textFieldInput
    }

    //update streak count
    let newStreak = streakCount;
    if(isDailyLog){
      const now = Date.now();

      if (!userInput) {
        newStreak = 0;
        triggerToast("Streak reset. Don't give up💪");
      }
      else if (!lastEntryDate) {
        newStreak = 1;
      }
      else if (isSameDay(lastEntryDate, now)) {
        //same day entry, do not update streak
        return;
      }
      else if (isYesterday(lastEntryDate, now)) {
        newStreak = streakCount + 1;
      }
      else {
        newStreak = 1; //missed more than a day, reset to 1 if today is good, otherwise 0
      }

      setStreakCount(newStreak);
      setLastEntryDate(now); 
      updateUserMeta(newStreak, now);
    }

    addEntry(newEntry);
    getRandomFeedback(userInput);

    // Reset the input field after submission
    setTextFieldInput('');
  }

  //achievement panel.
  const [achievementClick, setAchievementClick] = useState(false);
  
  const handleAchievements = () => {
    console.log("Panel visible:", achievementClick);
    setAchievementClick(prev => !prev);
  }

  //streak achievements logic.
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    if (!session) return
      const { data, error } = await supabase.from('achievements').select('*').eq('user_id', session.user.id)

    if (!error) setAchievements(data)
  }

  useEffect(() => {
  if (streakCount === 0 || streakCount % 5 !== 0) return;

  const milestone = `D${streakCount}`;

  const alreadyAchieved = achievements.some(a => a.milestone === milestone);

  if (!alreadyAchieved) {
    const achievementUpdate = async () => await supabase.from('achievements').insert({
      date: new Date().toDateString(),
      milestone,
      user_id: session.user.id
    })
  achievementUpdate();
  fetchAchievements();
  
  //Trigger confetti only when new achievement added
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);

  }
}, [streakCount, achievements]);
   
  console.log('session:', session?.user?.id, 'habit:', habit, 'loadingUserData:', loadingUserData);

  if (loadingSession || loadingUserData) return <Loading />

  if(!session) return <Auth/>
  
  if(!habit) { 
    return <Onboarding session={session} onHabitSet={setHabit} />
  }

  return (

    <div className="h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex justify-center">
        <div className="w-full max-w-xl flex flex-col">
    
        <header className="px-6 pt-6 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Quit Now
            </h1>

            <button 
              onClick={() => supabase.auth.signOut()} 
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Sign out
            </button>
          </div>

          <Streak streakCount={streakCount} habit={habit}/>

          <div className="mt-4">
            <GoodBad 
              onResponse={handleResponse} 
              canSelectResponse={canSelectResponse} 
              submitted={submitted}
            />
          </div>

          <FeedbackMsg message={feedback} submitted={submitted}/>

        </header>

        {clicked && (
          <LogForm
          textFieldInput={textFieldInput}
          setTextFieldInput={setTextFieldInput}
          userInput={userInput}
          clicked={clicked}
          handleSubmit={handleSubmit}
          submitted={submitted}
          onToggle={() => setClicked(false)}
          />
        )}
        

        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <Entries entries={entries} deleteEntry={deleteEntry}/>
        </main>

      <footer className="bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2">
        <BottomButtons onResponseTwo={handleAchievements} onAddClick={handleManualLog} onRuinedDay={() => handleResponse(false)}/>
      </footer>

    {achievementClick && (
          <Achievements achievements={achievements} onResponseTwo={() => setAchievementClick(prev => !prev)} />
        )}
    </div>
    {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
    <Toast message={message} showToast={showToast}/>
  </div>
)}
export default App;
//Lorem ipsum dolor sit amet, consectetur.