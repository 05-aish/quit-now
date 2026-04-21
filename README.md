# Quit Now

A habit tracking app that helps users log daily progress, maintain streaks, and reflect on their behavior.

## Live Demo

https://quit-now-topaz.vercel.app/

## Features

* User authentication using Supabase
* Daily check-in system (one entry per day)
* Streak tracking with reset logic
* Manual logging for additional notes
* Habit selection during onboarding
* Basic achievement milestones
* Persistent data with Supabase
* Password visibility toggle
* Form validation and error handling

## Core Logic

* Users can log only once per day
* Streak increases only if the previous entry was yesterday
* Streak resets if a day is missed or a negative entry is logged
* Daily logs and manual logs are handled separately

## Tech Stack

* React
* Tailwind CSS
* Supabase (Auth and Database)
* Vercel (deployment)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

Run the project:

```bash
npm run dev
```

## Future Improvements

* Analytics (weekly trends, success rate)
* Better input validation
* UI refinements
* Mobile responsiveness

## Author

Your Name
https://github.com/05-aish
