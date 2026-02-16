import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { BookingData } from '../hooks/useGoogleSheets';

interface CalendarProps {
  bookingsData: BookingData[];
}

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'confirmed' | 'cancelled' | 'rescheduled';
  customerName: string;
  serviceType: string;
}

export function Calendar({ bookingsData }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 11)); // February 11, 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Convert booking data to calendar events
  const events = useMemo(() => {
    const eventsByDay: Record<number, CalendarEvent[]> = {};
    
    bookingsData.forEach((booking, index) => {
      // Parse the date - handle both formats: "1/1/2026" or "2026-01-01"
      let year, month, day;
      
      if (booking.callDate.includes('/')) {
        // Format: "1/1/2026" or "01/01/2026"
        const dateParts = booking.callDate.split('/');
        if (dateParts.length === 3) {
          month = parseInt(dateParts[0]) - 1; // JS months are 0-indexed
          day = parseInt(dateParts[1]);
          year = parseInt(dateParts[2]);
        }
      } else if (booking.callDate.includes('-')) {
        // Format: "2026-01-01"
        const dateParts = booking.callDate.split('-');
        if (dateParts.length === 3) {
          year = parseInt(dateParts[0]);
          month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
          day = parseInt(dateParts[2]);
        }
      }
      
      // Only show events for the currently displayed month/year
      if (year !== undefined && month !== undefined && day !== undefined) {
        if (year === currentDate.getFullYear() && month === currentDate.getMonth()) {
          if (!eventsByDay[day]) {
            eventsByDay[day] = [];
          }
          
          // Determine event type based on booking status
          let eventType: 'confirmed' | 'cancelled' | 'rescheduled' = 'confirmed';
          if (booking.bookingStatus) {
            const status = booking.bookingStatus.toLowerCase();
            if (status.includes('cancel')) {
              eventType = 'cancelled';
            } else if (status.includes('update') || status.includes('reschedule')) {
              eventType = 'rescheduled';
            }
          }
          
          eventsByDay[day].push({
            id: `${booking.email}-${index}`,
            title: `${booking.name} - ${booking.serviceType || 'Appointment'}`,
            time: booking.callTime,
            type: eventType,
            customerName: booking.name,
            serviceType: booking.serviceType || 'Appointment',
          });
        }
      }
    });
    
    return eventsByDay;
  }, [bookingsData, currentDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'rescheduled':
        return 'bg-amber-500';
      default:
        return 'bg-blue-500';
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Get upcoming events (all future events sorted by date)
  const upcomingEvents = useMemo(() => {
    const allEvents: Array<{ day: number; event: CalendarEvent }> = [];
    
    Object.entries(events).forEach(([day, dayEvents]) => {
      const dayNum = parseInt(day);
      const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
      
      // Include events from today onwards
      if (eventDate >= new Date(todayYear, todayMonth, todayDay)) {
        dayEvents.forEach(event => {
          allEvents.push({ day: dayNum, event });
        });
      }
    });
    
    // Sort by day
    allEvents.sort((a, b) => a.day - b.day);
    
    return allEvents.slice(0, 5); // Show up to 5 upcoming events
  }, [events, currentDate, todayDay, todayMonth, todayYear]);

  // Check if a day is today
  const isToday = (day: number) => {
    return day === todayDay && 
           currentDate.getMonth() === todayMonth && 
           currentDate.getFullYear() === todayYear;
  };

  return (
    <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">Calendar</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-blue-400" />
          </button>
          <span className="text-white font-medium px-4">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all"
          >
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-gray-400 font-medium py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const hasEvent = events[day];
            const isTodayDay = isToday(day);
            const isSelected = selectedDay === day;
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-400 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
                    : isTodayDay
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 shadow-lg shadow-blue-500/30'
                    : hasEvent
                    ? 'bg-blue-600/10 border-blue-500/30 hover:bg-blue-600/20'
                    : 'bg-[#121633]/30 border-blue-500/10 hover:border-blue-500/20 hover:bg-[#121633]/50'
                }`}
              >
                <span className={`text-sm font-medium ${isTodayDay || isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {day}
                </span>
                {hasEvent && (
                  <div className="flex gap-0.5 mt-1 flex-wrap justify-center max-w-[80%]">
                    {hasEvent.slice(0, 3).map((event) => (
                      <div key={event.id} className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`} />
                    ))}
                    {hasEvent.length > 3 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs text-gray-400">Rescheduled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs text-gray-400">Cancelled</span>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-400">
            {selectedDay 
              ? `${monthNames[currentDate.getMonth()]} ${selectedDay} Bookings` 
              : 'Upcoming Bookings'}
          </h4>
          {selectedDay && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {selectedDay && events[selectedDay] ? (
          events[selectedDay].map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-600/10 border border-purple-500/30 hover:border-purple-500/50 transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{event.customerName}</p>
                <p className="text-gray-400 text-xs truncate">{event.serviceType}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {event.time} • {event.type}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : selectedDay && !events[selectedDay] ? (
          <p className="text-gray-500 text-sm italic text-center py-4">No bookings on this date</p>
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map(({ day, event }) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#121633]/50 border border-blue-500/10 hover:border-blue-500/30 transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{event.customerName}</p>
                <p className="text-gray-400 text-xs truncate">{event.serviceType}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {monthNames[currentDate.getMonth()]} {day} • {event.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic text-center py-4">No upcoming bookings</p>
        )}
      </div>
    </div>
  );
}