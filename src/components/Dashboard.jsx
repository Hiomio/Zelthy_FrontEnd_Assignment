import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import './Dashboard.css'

const Dashboard = () => {
  const currentUser = "You"; // Simulating logged-in user
  const [users, setUsers] = useState(["You", "Alice", "Bob"]);
  const [selectedUser, setSelectedUser] = useState("You");
  const [userSlots, setUserSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [pendingSlot, setPendingSlot] = useState(null);
  const [showSlots, setShowSlots] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false); // For controlling prompt visibility
  const [bookedSlots, setBookedSlots] = useState([]); // To
  const [timezone, setTimezone] = useState("UTC");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAvailableSlots, setEditAvailableSlots] = useState([]);
  const [copiedAvailability, setCopiedAvailability] = useState(null);

  // Load Initial Data (preloaded slots for users)
  useEffect(() => {
    const nextTwoWeeks = new Date();
    nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14); // Two weeks from today

    const formatDate = (date) => date.toISOString().split("T")[0]; // Format date to 'YYYY-MM-DD'

    // Pre-define some booked slots for Alice and Bob with specific dates and times
    setUserSlots({
      You: {
        [formatDate(nextTwoWeeks)]: [{ date: formatDate(nextTwoWeeks), time: "10:00 AM - 11:00 AM" }],
      },
      Alice: {
        "2025-02-27": [
          { date: "2025-02-27", time: "9:00 AM - 10:00 AM", status: "booked 🗓️" },
          { date: "2025-02-27", time: "11:00 AM - 12:00 PM", status: "booked 🗓️" },
        ],
        "2025-02-28": [
          { date: "2025-02-28", time: "1:00 PM - 2:00 PM", status: "booked 🗓️" },
          { date: "2025-02-28", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
        "2025-02-25": [
          { date: "2025-02-25", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
        "2025-02-24": [
          { date: "2025-02-24", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
      },
      Bob: {
        "2025-02-28": [
          { date: "2025-02-28", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
        "2025-03-06": [
          { date: "2025-03-06", time: "9:00 AM - 10:00 AM", status: "booked 🗓️" },
        ],
        "2025-03-07": [
          { date: "2025-03-07", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
        "2025-03-04": [
          { date: "2025-03-04", time: "11:00 AM - 12:00 AM", status: "booked 🗓️" },
        ],
        "2025-03-06": [
          { date: "2025-03-06", time: "3:00 PM - 4:00 PM", status: "booked 🗓️" },
        ],
        "2025-02-26": [
          { date: "2025-02-26", time: "2:00 PM - 3:00 PM", status: "booked 🗓️" },
        ],
      },
    });
  }, []);

  // Check if a slot is available for the selected day
  const isSlotAvailable = (date, time) => {
    return !Object.values(userSlots).some((user) =>
      Object.keys(user).includes(date) &&
      user[date].some((slot) => slot.time === time)
    );
  };

  // Get Available Time Slots for the Selected Date
  const fetchAvailableTimeSlots = (date) => {
    const availableSlots = [];
    const allTimeSlots = [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "1:00 PM - 2:00 PM",
      "3:00 PM - 4:00 PM",
    ];

    const formattedDate = date.toISOString().split("T")[0];
    const userBookedSlots = userSlots[selectedUser]?.[formattedDate] || [];

    // Filter out the slots already taken by Alice and Bob for the selected date
    allTimeSlots.forEach((time) => {
      if (isSlotAvailable(formattedDate, time)) {
        availableSlots.push(time);
      }
    });

    setAvailableTimeSlots(availableSlots);
  };

  // Handle Slot Booking
  const bookSlot = () => {
    if (!pendingSlot) return;

    const formattedDate = pendingSlot.date.toISOString().split("T")[0];

    // Update user slots
    setUserSlots((prevSlots) => {
      const updatedUserSlots = { ...prevSlots };
      updatedUserSlots[currentUser] = {
        ...updatedUserSlots[currentUser],
        [formattedDate]: [
          ...(updatedUserSlots[currentUser]?.[formattedDate] || []),
          { date: formattedDate, time: pendingSlot.time },
        ],
      };
      return updatedUserSlots;
    });

    // Add booked slot to bookedSlots state
    setBookedSlots((prevBookedSlots) => [
      ...prevBookedSlots,
      { date: pendingSlot.date.toDateString(), time: pendingSlot.time },
    ]);

    // Remove the booked slot from available slots
    setAvailableTimeSlots((prevAvailableSlots) =>
      prevAvailableSlots.filter((slot) => slot !== pendingSlot.time)
    );

    // Reset pending slot and show success
    setPendingSlot(null);
    alert("🎉 Slot confirmed successfully!");
    setShowPrompt(false); // Hide the prompt after booking
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
    // Here you would typically convert slot times to the selected timezone
  };

  const copyAvailability = () => {
    if (!selectedDate || availableTimeSlots.length === 0) {
      alert("No availability to copy for this day.");
      return;
    }
  
    setCopiedAvailability({
      date: selectedDate,
      slots: [...availableTimeSlots],
    });
  
    console.log(`Availability copied for ${selectedDate.toDateString()}`, copiedAvailability);
    alert(`Availability for ${selectedDate.toDateString()} copied!`);
  };
  
  const pasteAvailability = () => {
    if (!copiedAvailability || !selectedDate) {
      alert("No copied availability to paste.");
      return;
    }
  
    if (selectedDate.toDateString() === copiedAvailability.date.toDateString()) {
      alert("Cannot paste to the same day.");
      return;
    }
  
    setAvailableTimeSlots([...copiedAvailability.slots]);
    alert(`Availability pasted for ${selectedDate.toDateString()}!`);
  
    console.log(`Pasted availability to ${selectedDate.toDateString()}`, availableTimeSlots);
  };
  

  const updateSlot = (index) => {
    const formattedDate = bookedSlots[index].date;
    const previousTime = bookedSlots[index].time;
  
    // Get available slots for the selected date, excluding the booked slot
    const availableSlotsForEdit = availableTimeSlots.filter((slot) => slot !== previousTime);
  
    setEditingIndex(index); // Set the slot being edited
    setEditAvailableSlots(availableSlotsForEdit); // Update available slots
  };
  
  const confirmUpdateSlot = (newTime) => {
    if (editingIndex === null) return;
  
    const previousTime = bookedSlots[editingIndex].time;
  
    setBookedSlots((prev) =>
      prev.map((slot, i) => (i === editingIndex ? { ...slot, time: newTime } : slot))
    );
  
    // Update available slots: Remove new selection, add back old slot
    setAvailableTimeSlots((prev) =>
      prev.filter((slot) => slot !== newTime).concat(previousTime)
    );
  
    setEditingIndex(null); // Reset editing index
    setEditAvailableSlots([]); // Clear available slots
  
    alert("✅ Slot updated successfully!");
  };
  
  
  const deleteSlot = (index) => {
    const deletedSlotTime = bookedSlots[index].time;
    
    setBookedSlots((prev) => prev.filter((_, i) => i !== index));
  
    // Return the deleted slot to available slots
    setAvailableTimeSlots((prev) => [...prev, deletedSlotTime]);
  
    alert("🗑️ Slot deleted successfully!");
  };
  

  // Handle Date Change from Calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    fetchAvailableTimeSlots(date);
  };

  // Show prompt when user clicks "Book Slot"
  const handleBookSlotClick = (time) => {
    setPendingSlot({ date: selectedDate, time });
    setShowPrompt(true); // Show the prompt when a user selects a slot
  };

  const closePrompt = () => setShowPrompt(false);

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">📊 Slot Management Dashboard</h1>
  
      {/* Calendar and All Components inside this container */}
      <div className="calendar-container flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="calendar-box bg-white p-6 rounded-2xl shadow-xl transition-transform duration-300 transform hover:scale-105 w-[400px]">
          
          {/* User Selection */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Select User:</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Select Timezone:</label>
            <select className="w-full p-2 border rounded-md" value={timezone} onChange={handleTimezoneChange}>
              <option value="UTC">UTC</option>
              <option value="IST">IST</option>
              <option value="EST">EST</option>
            </select>
          </div>
  
          {/* Calendar for Date Selection */}
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()} // Disable past dates
            className="w-full p-4 rounded-lg shadow-md"
          />
  
          {/* Toggle Slots Visibility */}
          <button
            onClick={() => setShowSlots(!showSlots)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition"
          >
            {showSlots ? "👀 Hide Slots" : "✅ View Available Slots"}
          </button>
  
          {/* Slots Display for the Selected Day */}
          {showSlots && (
            <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-600">
                Slots for {selectedDate.toDateString()}:
              </h2>
              <ul className="mt-4">
                <h3 className="font-semibold mt-4">Available Time Slots:</h3>
                {availableTimeSlots.length === 0 ? (
                  <p>No available time slots for this date.</p>
                ) : (
                  availableTimeSlots.map((time, idx) => (
                    <li key={idx} className="my-2 flex justify-between items-center">
                      <span>{time}</span>
                      {selectedUser === currentUser && (
                        <button
                          onClick={() => handleBookSlotClick(time)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition"
                        >
                          📅 Book Slot
                        </button>
                      )}
                    </li>
                  ))
                )}
              </ul>
              <button
              onClick={copyAvailability}
              className="mt-4 bg-green-500 text-white px-4 py-2 w-full rounded-md hover:bg-green-600 transition"
              >
              📋 Copy Availability
               </button>

               <button
  onClick={pasteAvailability}
  className="mt-4 bg-purple-500 text-white px-4 py-2 w-full rounded-md hover:bg-purple-600 transition"
>
  📌 Paste Availability
</button>
</div>

          )}
  
          {/* Confirmation Prompt */}
          {showPrompt && (
            <div className="mt-4 bg-blue-600 text-white p-4 rounded-md shadow-lg w-full">
              <span>
                You are about to book the slot: <strong>{pendingSlot?.time}</strong> on{" "}
                {pendingSlot?.date.toDateString()}.
              </span>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={bookSlot}
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-600 transition"
                >
                  ✅ Confirm
                </button>
                <button
                  onClick={closePrompt}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-gray-600 transition"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
  
          {/* Booked Slots Section */}
          <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-600">Your Booked Slots:</h2>
            {bookedSlots.length === 0 ? (
              <p>No booked slots.</p>
            ) : (
              bookedSlots.map((slot, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-200 p-2 my-2 rounded-md">
                  <span>{slot.date} - {slot.time}</span>
                  <div>
                    <button onClick={() => updateSlot(index)} className="bg-yellow-500 text-white px-2 py-1 rounded-md mx-2">
                      ✏️ Edit
                    </button>
                    <button onClick={() => deleteSlot(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
  
          {/* Slot Editing */}
          {editingIndex !== null && (
            <div className="mt-4 bg-blue-600 text-white p-4 rounded-md shadow-lg">
              <h2 className="text-xl font-semibold">Select a new time slot:</h2>
              {editAvailableSlots.length > 0 ? (
                editAvailableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => confirmUpdateSlot(slot)}
                    className="bg-green-500 text-white px-4 py-2 my-2 mx-2 rounded-md"
                  >
                    ⏳ {slot}
                  </button>
                ))
              ) : (
                <p>No available slots for this day.</p>
              )}
            </div>
          )}
  
        </div>
      </div>
    </div>
  );
  
};
export default Dashboard;