// CalendarGrid.jsx (Main Component)
'use client';

import { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGridComponent from './CalendarGridComponent';
import EventPopup from './EventPopup';

export default function CalendarGrid({ initialEvents = [] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState('1day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cellHeight, setCellHeight] = useState(40);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [slideDirection, setSlideDirection] = useState('');
  const [events] = useState(initialEvents);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && (view === '3day' || view === 'weekly')) {
        setView('1day');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [view]);

  useEffect(() => {
    const updateCellHeight = () => {
      const width = window.innerWidth;
      setCellHeight(width < 768 ? 40 : 48);
    };
    updateCellHeight();
    window.addEventListener('resize', updateCellHeight);
    return () => window.removeEventListener('resize', updateCellHeight);
  }, []);

  // Generate time slots from 00:00 to 23:00
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Get days to display based on view
  const getDaysToDisplay = () => {
    const days = [];
    const baseDate = new Date(currentDate);

    const count =
      view === '1day' ? 1 :
      view === '2day' ? 2 :
      view === '3day' ? 3 : 7;

    for (let i = 0; i < count; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);

      days.push({
        date: d.toISOString().split('T')[0],
        name: d.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    return days;
  };

  const daysToDisplay = getDaysToDisplay();

  // Navigation functions
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    const step =
      view === '1day' ? 1 :
      view === '2day' ? 2 :
      view === '3day' ? 3 : 7;
    newDate.setDate(newDate.getDate() + direction * step);
    setSlideDirection(direction > 0 ? 'slide-left' : 'slide-right');
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex flex-col px-4 md:px-6 pt-6 pb-35 bg-gray-50 min-h-screen">
      <CalendarHeader 
        view={view}
        setView={setView}
        isMobile={isMobile}
        onNavigate={navigateDate}
        onToday={goToToday}
      />

      <div className="overflow-hidden">
        <CalendarGridComponent 
          daysToDisplay={daysToDisplay}
          timeSlots={timeSlots}
          events={events}
          cellHeight={cellHeight}
          onEventClick={setSelectedEvent}
          slideDirection={slideDirection}
        />
      </div>

      <EventPopup 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}