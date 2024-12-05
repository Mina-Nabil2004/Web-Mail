import React from 'react';
import Sidebar1 from './Sidebar1';
import Sidebar2 from './Sidebar2';
import App from './App';
import './Mail.css';  // Import the CSS for the layout

function Mail() {
  return (
    <main>
    <div className="mail-container">
      {/* Left Sidebar */}

      {/* Main Content */}
      <div className="main-content">
        <App />
      </div>

      
    </div>
    </main>
  );
}

export default Mail;
