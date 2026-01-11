// EventPopup.jsx
export default function EventPopup({ event, onClose }) {
  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 fade-in zoom-in-95 duration-500"
      onClick={onClose}
    >
      <div 
        className=" bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{event.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Day:</span>
            <span className="text-gray-800">{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Time:</span>
            <span className="text-gray-800">
              {event.startTime} - {event.endTime}
            </span>
          </div>

          {event.description && (
            <div className="flex gap-2">
              <span className="text-gray-600 font-medium">Description:</span>
              <span className="text-gray-800">{event.description}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#B2E3FF] text-gray-700 rounded-4xl hover:bg-[#86d2fd] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}