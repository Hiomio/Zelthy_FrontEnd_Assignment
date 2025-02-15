const HomePage = () => {
  // Function to navigate to the dashboard
  const handleGetStarted = () => {
    window.location.href = '/dashboard'; // This will take the user to the dashboard URL
  };

  return (
    <div className="HomePage" style={{ fontFamily: 'Poppins, sans-serif', color: '#003366' }}>
      {/* Description */}
      <p className="description" style={{
        fontWeight: 'bolder', 
        fontStyle: 'italic', 
        fontSize: '26px',
        background: 'linear-gradient(45deg, #6C8EBF, #A1C6FF)',  // Soft gradient colors
        WebkitBackgroundClip: 'text', 
        color: 'transparent', 
        textShadow: '0px 2px 8px rgba(255, 255, 255, 0.6)' // Softer, more subtle white shadow
      }}>
        Our Slot Management system helps you efficiently book, edit, and manage your slots with ease. Follow these simple steps to get started:
      </p>

      {/* Steps Section */}
      <div className="steps">
        <h2 style={{
          fontWeight: 'bolder', 
          fontStyle: 'italic', 
          fontSize: '32px', 
          background: 'linear-gradient(45deg, #6C8EBF, #A1C6FF)',  // Soft gradient for title
          WebkitBackgroundClip: 'text', 
          color: 'transparent', 
          textShadow: '0px 2px 8px rgba(255, 255, 255, 0.6)', // Subtle shadow effect
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = '#A1C6FF'}  // Light color on hover
        onMouseLeave={(e) => e.target.style.color = 'transparent'}
        >
          How to Use:
        </h2>
        <ol style={{ fontSize: '22px' }}>
          <li style={{
            fontWeight: 'bolder', 
            fontStyle: 'italic',
            transition: 'color 0.3s ease'
          }}>
            Click on <span className="font-bold" style={{ fontWeight: 'bolder', color: '#003366' }}>Dashboard</span> to view the Available slots.<span className="emoji animated">🏠</span>
          </li>
    <li style={{
    fontWeight: 'bolder', 
    fontStyle: 'italic',
    transition: 'color 0.3s ease'
  }}>
    Click on an available slot and book your slot easily. <span className="emoji animated">📅</span>
  </li>

          <li style={{
            fontWeight: 'bolder', 
            fontStyle: 'italic',
            transition: 'color 0.3s ease'
          }}>
            Navigate through available slots and manage them efficiently. <span className="emoji animated">🔄</span>
          </li>
          <li style={{
            fontWeight: 'bolder', 
            fontStyle: 'italic',
            transition: 'color 0.3s ease'
          }}>
            Use the navigation bar to explore different sections. <span className="emoji animated">🧭</span>
          </li>
        </ol>
      </div>

      {/* Let's Get Started Button */}
      <button 
        onClick={handleGetStarted} 
        style={{
          fontSize: '20px', 
          fontWeight: 'bolder', 
          fontStyle: 'italic', 
          backgroundColor: '#4F6D92',  // Muted color for the button background
          color: '#fff', 
          padding: '10px 20px', 
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          textShadow: '0px 2px 8px rgba(255, 255, 255, 0.6)', // Softer white shadow on button
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#A1C6FF'}  // Lighten on hover
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4F6D92'}
      >
        <span style={{ marginRight: '10px' }}>🎉</span> Let's Get Started
      </button>
    </div>
  );
};

export default HomePage;
