import "./About.css";

const AboutUs = () => {
  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-8 justify-center mt-8">
        <div className="bg-green-100 p-8 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
          <h2
            className="text-5xl font-bold text-gray-700 text-center mb-6" // Increased font size for the title
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for title
            }}
          >
            Slot Management Made Simple <span className="text-7xl">📅</span> {/* Increased emoji size */}
          </h2>
          <p
            className="text-gray-600 text-xl leading-8 text-justify" // Increased font size for the paragraph
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for description
            }}
          >
            This is a Slot Management application that helps users manage their availability efficiently.
            The platform allows users to create, update, and view their available time slots, ensuring better scheduling and resource allocation. 
            <span className="text-6xl">🗓️</span> {/* Increased emoji size */}
          </p>
        </div>

        <div className="bg-yellow-100 p-8 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
          <h2
            className="text-5xl font-bold text-gray-700 text-center mb-6" // Increased font size for the title
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for title
            }}
          >
            Seamless Integration <span className="text-7xl">🔗</span> {/* Increased emoji size */}
          </h2>
          <p
            className="text-gray-600 text-xl leading-8 text-justify" // Increased font size for the paragraph
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for description
            }}
          >
            With its intuitive interface, users can seamlessly set their preferences and avoid conflicts in their calendars. 
            It integrates with popular calendar systems, making it easier to sync your availability across platforms. 
            <span className="text-6xl">🔄</span> {/* Increased emoji size */}
          </p>
        </div>

        <div className="bg-purple-100 p-8 rounded-lg shadow-md transform transition-all hover:scale-105 hover:shadow-lg">
          <h2
            className="text-5xl font-bold text-gray-700 text-center mb-6" // Increased font size for the title
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for title
            }}
          >
            Never Miss an Appointment <span className="text-7xl">⏰</span> {/* Increased emoji size */}
          </h2>
          <p
            className="text-gray-600 text-xl leading-8 text-justify" // Increased font size for the paragraph
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Larger text shadow for description
            }}
          >
            Additionally, the application provides notifications to remind users of upcoming slots and potential conflicts, ensuring they stay on top of their schedule. 
            <span className="text-6xl">📲</span> {/* Increased emoji size */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
