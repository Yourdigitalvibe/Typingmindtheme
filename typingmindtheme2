// TypingMind Dyslexia-Friendly Extension
// This extension makes TypingMind more accessible for dyslexic users
// with motivating colors and improved visual design

(function() {
  // Create a style element to add our custom CSS
  const styleElement = document.createElement('style');
  
  // Define our custom styles
  const customStyles = `
    /* Import OpenDyslexic font for better readability */
    @import url('https://fonts.cdnfonts.com/css/opendyslexic');
    
    /* Apply dyslexia-friendly font to all text */
    body, input, textarea, button, .ant-typography, .ant-btn, .ant-input {
      font-family: 'OpenDyslexic', sans-serif !important;
    }
    
    /* Increase spacing between lines for better readability */
    p, li, .message-content {
      line-height: 1.6 !important;
      letter-spacing: 0.5px !important;
    }
    
    /* Add rounded corners to all UI elements */
    .ant-card, .ant-input, .ant-btn, .message-container, .sidebar, .main-content, 
    .ant-menu, .ant-dropdown-menu, .ant-modal-content, .ant-alert {
      border-radius: 12px !important;
      overflow: hidden;
    }
    
    /* Apply a warm, motivating color scheme */
    :root {
      --primary-color: #ff7e5f;
      --secondary-color: #feb47b;
      --accent-color: #5f9ea0;
      --background-color: #fafafa;
      --text-color: #333333;
      --light-accent: #e6f7ff;
    }
    
    /* Apply our color scheme */
    body {
      background-color: var(--background-color) !important;
      color: var(--text-color) !important;
    }
    
    /* Style the sidebar */
    .sidebar, .ant-layout-sider {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
    }
    
    .ant-menu, .ant-menu-item {
      background: transparent !important;
      color: white !important;
    }
    
    .ant-menu-item:hover, .ant-menu-item-selected {
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 8px !important;
    }
    
    /* Style buttons */
    .ant-btn-primary {
      background: var(--accent-color) !important;
      border-color: var(--accent-color) !important;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(0) !important;
      transition: all 0.2s ease !important;
    }
    
    .ant-btn-primary:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* Style the chat messages */
    .message-container:nth-child(odd) {
      background-color: var(--light-accent) !important;
    }
    
    /* Improve input area */
    .ant-input, textarea {
      border: 2px solid var(--accent-color) !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
    }
    
    /* Make code blocks more readable */
    pre, code {
      font-family: 'Courier New', monospace !important;
      background-color: #f5f5f5 !important;
      border-radius: 8px !important;
      padding: 12px !important;
      border-left: 4px solid var(--accent-color) !important;
    }
    
    /* Add a subtle animation to the send button */
    [data-element-id="send-message-button"] {
      transition: all 0.3s ease !important;
    }
    
    [data-element-id="send-message-button"]:hover {
      transform: scale(1.05) !important;
    }
    
    /* Increase contrast for better readability */
    .ant-typography {
      color: var(--text-color) !important;
      font-weight: 500 !important;
    }
  `;
  
  // Add our styles to the page
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
  
  // Add a small indication that the extension is active
  const extensionIndicator = document.createElement('div');
  extensionIndicator.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    z-index: 1000;
    opacity: 0.7;
    font-family: 'OpenDyslexic', sans-serif;
  `;
  extensionIndicator.textContent = '✨ Dyslexia-Friendly Mode Active';
  document.body.appendChild(extensionIndicator);
  
  // Make the indicator fade out after 5 seconds
  setTimeout(() => {
    extensionIndicator.style.transition = 'opacity 1s ease';
    extensionIndicator.style.opacity = '0';
  }, 5000);
  
  console.log('TypingMind Dyslexia-Friendly Extension loaded successfully!');
})();
