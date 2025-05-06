// Typing Mind Custom Theme - Modern Dark Blue with Pink Accents
// Designed to reduce eye strain with comfortable contrast levels

function applyCustomTheme() {
  // Create style element for our custom CSS
  const styleEl = document.createElement('style');
  
  // Define our custom theme
  styleEl.textContent = `
    /* Main Background Colors - Dark blue theme with reduced brightness */
    body, .dark {
      --tm-bg-primary: #1a1a2e !important;
      --tm-bg-secondary: #16213e !important;
      --tm-bg-tertiary: #0f3460 !important;
    }
    
    /* Accent Colors - Soft pink that's easy on the eyes */
    body, .dark {
      --tm-accent-primary: #e94560 !important;
      --tm-accent-secondary: #ff647c !important;
    }
    
    /* Text Colors - Softer whites for reduced eye strain */
    body, .dark {
      --tm-text-primary: rgba(255, 255, 255, 0.9) !important;
      --tm-text-secondary: rgba(255, 255, 255, 0.7) !important;
      --tm-text-tertiary: rgba(255, 255, 255, 0.5) !important;
    }
    
    /* Improved Typography */
    body, input, textarea, button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      font-size: 15px !important;
      line-height: 1.6 !important;
    }
    
    /* Sidebar Styling - Gradient background for modern look */
    [data-element-id="side-bar"] {
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%) !important;
      border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    
    /* Buttons - Rounded with subtle hover effects */
    button, .button {
      border-radius: 8px !important;
      transition: all 0.2s ease-in-out !important;
    }
    
    button:hover, .button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Chat Bubbles - Softer, more modern styling */
    .ai-message-container {
      background-color: rgba(15, 52, 96, 0.5) !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      margin-bottom: 16px !important;
      padding: 16px !important;
    }
    
    .user-message-container {
      background-color: rgba(233, 69, 96, 0.1) !important;
      border-radius: 12px !important;
      margin-bottom: 16px !important;
      padding: 16px !important;
    }
    
    /* Input Area - Cleaner, more modern look */
    textarea, input[type="text"] {
      background-color: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 8px !important;
      padding: 12px !important;
    }
    
    /* Custom Header - Add your name */
    [data-element-id="header-container"]::before {
      content: "Claudet's Workspace";
      display: inline-block;
      margin-right: 15px;
      font-weight: bold;
      color: var(--tm-accent-primary);
    }
    
    /* Custom Scrollbar for modern look */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--tm-bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--tm-accent-primary);
      border-radius: 4px;
    }
    
    /* Smooth transitions for all elements */
    * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
  `;
  
  // Add style to document
  document.head.appendChild(styleEl);
  
  // Update UI text elements for more modern feel
  setTimeout(() => {
    // Change "New Chat" button text
    const newChatButton = document.querySelector('[data-element-id="new-chat-button-in-side-bar"]');
    if (newChatButton && newChatButton.childNodes.length > 1) {
      newChatButton.childNodes[1].textContent = "New Conversation";
    }
    
    console.log("✨ Custom theme applied successfully!");
  }, 1000); // Small delay to ensure elements are loaded
}

// Apply the theme when page loads
window.addEventListener('load', applyCustomTheme);

// Re-apply theme when navigating between chats
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(applyCustomTheme, 500);
  }
});
