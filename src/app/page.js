// Example usage of CalendarGrid component

import CalendarGrid from '../components/CalendarGrid';

const sampleEvents = [
  { 
    date: '2026-01-08', 
    startTime: '02:00', 
    endTime: '04:00', 
    name: 'Midnight Break', 
    description: 'Late night break session' 
  },
  { 
    date: '2026-01-09', 
    startTime: '07:00', 
    endTime: '09:00', 
    name: 'Breakfast', 
    description: 'Morning breakfast' 
  },
  { 
    date: '2026-01-09', 
    startTime: '10:00', 
    endTime: '11:00', 
    name: 'Workshop 02', 
    description: 'Technical workshop session' 
  }, 
  { 
    date: '2026-01-10', 
    startTime: '15:00', 
    endTime: '17:00', 
    name: 'Network session', 
    description: 'Networking event' 
  }
];

export default function App() {
  return <CalendarGrid initialEvents={sampleEvents} />;
}

// Event object structure:
// {
//   date: 'YYYY-MM-DD',        // Required: ISO date format
//   startTime: 'HH:MM',        // Required: 24-hour format
//   endTime: 'HH:MM',          // Required: 24-hour format
//   name: 'Event Name',        // Required: Display name
//   description: 'Details...' // Optional: Event description
// }