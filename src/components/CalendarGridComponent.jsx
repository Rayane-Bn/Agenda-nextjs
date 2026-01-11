// CalendarGridComponent.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarGridComponent({ 
  daysToDisplay, 
  timeSlots, 
  events, 
  cellHeight, 
  onEventClick,
  slideDirection = ''
}) {
  // Get current time indicator position
  const getCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const top = (totalMinutes / 60) * cellHeight;
    return top;
  };

  // Check if a day is today
  const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  // Calculate event position
  const getEventStyle = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startInMinutes = startHour * 60 + startMin;
    const endInMinutes = endHour * 60 + endMin;
    const durationInMinutes = endInMinutes - startInMinutes;
    const top = (startInMinutes / 60) * cellHeight;
    const height = (durationInMinutes / 60) * cellHeight;
    return { top: `${top}px`, height: `${height}px` };
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction === 'slide-left' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'slide-left' ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
        <motion.div
          key={daysToDisplay.map(d => d.date).join('-')}
          custom={slideDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="rounded-lg overflow-hidden flex flex-col gap-1 w-full"
        >
      {/* Header Row - Days */}
      <div className="flex">
        {/* Empty cell for time column */}
        <div className="w-9 md:w-11 h-10 md:h-12" />
        
        {/* Day headers */}
        <div className="flex flex-1">
          {daysToDisplay.map((day, index) => (
            <div
              key={`header-${day.date}-${index}`}
              className="h-10 md:h-12 flex items-end justify-center text-gray-700 text-xs md:text-sm flex-1"
            >
              {day.name}
            </div>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="flex gap-2">
        {/* Time column */}
        <div>
          {timeSlots.map((time) => (
            <div key={time} className="h-10 md:h-12 text-gray-700 text-xs md:text-sm flex items-start justify-end">
              {time}
            </div>
          ))}
        </div>

        {/* Days columns with events */}
        <div className="flex flex-1">
          {daysToDisplay.map((day, dayIndex) => (
            <div key={`day-${day.date}-${dayIndex}`} className="flex-1 relative">
              {/* Time cells for this day */}
              {timeSlots.map((time, timeIndex) => (
                <div
                  key={`cell-${day.date}-${dayIndex}-${timeIndex}`}
                  className="h-10 md:h-12 border bg-white border-[#E8E8E8]"
                />
              ))}
              
              {/* Events overlay for this day */}
              {events
                .filter(event => event.date === day.date)
                .map((event, eventIndex) => {
                  const style = getEventStyle(event.startTime, event.endTime);
                  return (
                    <div
                      key={`event-${eventIndex}`}
                      onClick={() => onEventClick(event)}
                      className="absolute left-0 right-0 bg-[#B2E3FF] border border-[#86d2fd] rounded px-2 py-1 text-xs overflow-hidden z-10 cursor-pointer hover:bg-[#86d2fd] transition-colors"
                      style={style}
                    >
                      <div className="font-medium text-gray-800">{event.name}</div>
                    </div>
                  );
                })}
              
              {/* Current time indicator - only show on today */}
              {isToday(day.date) && (
                <div 
                  className="absolute left-0 right-0 z-20 flex items-center"
                  style={{ top: `${getCurrentTimePosition()}px` }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full -ml-1" />
                  <div className="flex-1 h-0.5 bg-red-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
}