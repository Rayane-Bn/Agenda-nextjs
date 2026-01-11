import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CalendarHeader({ 
  view, 
  setView, 
  isMobile, 
  onNavigate, 
  onToday 
}) {
  return (
    
    <div className="flex flex-col gap-4 md:gap-5 mb-4">
        <div className="text-4xl md:text-5xl font-extrabold text-[#003E7C]">Agenda</div>
        <div className="flex justify-between sm:items-center">
      {/* Navigation buttons */}
      <div className="flex gap-2 items-center">
        <button
          onClick={onToday}
          className="px-4 py-2 rounded-4xl text-sm md:text-base text-gray-700 bg-[#B2E3FF] cursor-pointer active:bg-[#86d2fd] transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate(-1)}
          className="p-4 bg-transparent rounded-full active:bg-gray-200 md:hover:bg-gray-200 text-sm md:text-base transition-colors cursor-pointer"
        >
          <IoIosArrowBack />
        </button>
        
        <button
          onClick={() => onNavigate(1)}
          className="p-4 bg-transparent rounded-full active:bg-gray-200 md:hover:bg-gray-200 text-sm md:text-base transition-colors cursor-pointer"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* View mode buttons */}
      <div className="flex gap-2 items-center sm:ml-auto">
        {isMobile ? (
          <>
            <button
              onClick={() => setView('1day')}
              className={`px-4 py-2 rounded-4xl text-sm text-gray-700 cursor-pointer transition-colors ${
                view === '1day' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              1 Day
            </button>
            
            <button
              onClick={() => setView('2day')}
              className={`px-4 py-2 rounded-4xl text-sm text-gray-700 cursor-pointer transition-colors ${
                view === '2day' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              2 Days
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setView('1day')}
              className={`px-4 py-2 rounded-4xl text-sm md:text-base text-gray-700 cursor-pointer transition-colors ${
                view === '1day' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              1 Day
            </button>
            
            <button
              onClick={() => setView('2day')}
              className={`px-4 py-2 rounded-4xl text-sm md:text-base text-gray-700 cursor-pointer transition-colors ${
                view === '2day' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              2 Days
            </button>
            
            <button
              onClick={() => setView('3day')}
              className={`px-4 py-2 rounded-4xl text-sm md:text-base text-gray-700 cursor-pointer transition-colors ${
                view === '3day' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              3 Days
            </button>

            <button
              onClick={() => setView('weekly')}
              className={`px-4 py-2 rounded-4xl text-sm md:text-base text-gray-700 cursor-pointer transition-colors ${
                view === 'weekly' 
                  ? 'bg-[#B2E3FF] active:bg-[#86d2fd]' 
                  : 'bg-white active:bg-gray-100'
              }`}
            >
              Weekly
            </button>
          </>
        )}
      </div>
      </div>
    </div>
  );
}