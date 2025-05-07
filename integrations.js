/**
 * TypingMind ADHD/Dyslexia Extension
 * Integration and Utility Functions
 */

//-------------------------------------------------------------------------------
// 1. UTILITY FUNCTIONS
//-------------------------------------------------------------------------------

/**
 * Shows a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (info, success, warning, error)
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `tm-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

/**
 * Generates a random color from a predefined set of colors
 * @returns {string} - A hex color code
 */
function getRandomColor() {
  const colors = [
    '#3a9ea5', // teal
    '#9b5de5', // purple
    '#f8961e', // orange
    '#06d6a0', // green
    '#f15bb5'  // pink
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Sanitizes text input to prevent XSS attacks
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
function sanitizeText(text) {
  const tempDiv = document.createElement('div');
  tempDiv.textContent = text;
  return tempDiv.innerHTML;
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format a date object to a readable string
 * @param {Date} date - The date to format
 * @param {boolean} includeTime - Whether to include the time
 * @returns {string} - Formatted date string
 */
function formatDate(date, includeTime = false) {
  if (!date) return '';
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if it's today, tomorrow, or yesterday
  if (date.toDateString() === today.toDateString()) {
    return includeTime 
      ? `Today at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
      : 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return includeTime 
      ? `Tomorrow at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
      : 'Tomorrow';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return includeTime
      ? `Yesterday at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
      : 'Yesterday';
  }
  
  // Otherwise return the full date
  return includeTime
    ? date.toLocaleString()
    : date.toLocaleDateString();
}

/**
 * Creates a downloadable file from content
 * @param {string} content - The content to download
 * @param {string} filename - The filename
 * @param {string} type - The MIME type
 */
function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  
  // Clean up
  URL.revokeObjectURL(url);
}

/**
 * Detects light or dark mode preference from the system
 * @returns {string} - 'light' or 'dark'
 */
function detectColorScheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

//-------------------------------------------------------------------------------
// 2. GOOGLE DRIVE INTEGRATION
//-------------------------------------------------------------------------------

/**
 * Simulates authentication with Google Drive
 * In a real implementation, this would use OAuth
 */
function authenticateGoogleDrive() {
  showNotification('Simulating Google Drive authentication...', 'info');
  
  // Simulate API call delay
  setTimeout(() => {
    state.googleDriveEnabled = true;
    state.googleDriveAuth = {
      token: 'simulated_token_' + Date.now(),
      expiry: new Date(Date.now() + 3600000) // 1 hour from now
    };
    
    localStorage.setItem('tm_google_drive_auth', JSON.stringify(state.googleDriveAuth));
    
    showNotification('Google Drive connected successfully', 'success');
    
    // Update UI
    const authBtn = document.querySelector('.google-drive-auth-btn');
    if (authBtn) {
      authBtn.textContent = 'Disconnect Google Drive';
    }
    
    // Show additional buttons
    const integrationWidget = document.getElementById('integrations-widget');
    if (integrationWidget) {
      const container = integrationWidget.querySelector('.widget-body');
      if (container) {
        // Re-render the widget
        renderIntegrationsWidget(container);
      }
    }
  }, 1500);
}

/**
 * Disconnects from Google Drive
 */
function disconnectGoogleDrive() {
  state.googleDriveEnabled = false;
  state.googleDriveAuth = null;
  localStorage.removeItem('tm_google_drive_auth');
  
  showNotification('Google Drive disconnected', 'info');
  
  // Update UI
  const integrationWidget = document.getElementById('integrations-widget');
  if (integrationWidget) {
    const container = integrationWidget.querySelector('.widget-body');
    if (container) {
      // Re-render the widget
      renderIntegrationsWidget(container);
    }
  }
}

/**
 * Saves current chat to Google Drive
 * In a real implementation, this would use the Google Drive API
 */
function saveCurrentChatToDrive() {
  if (!state.googleDriveEnabled) {
    showNotification('Please connect Google Drive first', 'warning');
    return;
  }
  
  showNotification('Saving to Google Drive...', 'info');
  
  // In a real implementation, this would use the Google Drive API
  // For demonstration, we'll simulate it
  
  setTimeout(() => {
    showNotification('Chat saved to Google Drive', 'success');
  }, 1500);
}

/**
 * Opens Google Drive file browser
 * In a real implementation, this would open a file picker or list files
 */
function browseGoogleDrive() {
  if (!state.googleDriveEnabled) {
    showNotification('Please connect Google Drive first', 'warning');
    return;
  }
  
  showNotification('Opening Google Drive browser...', 'info');
  
  // In a real implementation, this would open a file picker or list files
  // For demonstration, we'll just show a notification
  
  setTimeout(() => {
    showNotification('Google Drive browser would open here', 'info');
  }, 1000);
}

/**
 * Saves notebook to Google Drive
 * In a real implementation, this would use the Google Drive API
 */
function saveNotebookToDrive() {
  if (!state.googleDriveEnabled) {
    showNotification('Please connect Google Drive first', 'warning');
    return;
  }
  
  const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
  if (!notebook) return;
  
  showNotification(`Saving notebook "${notebook.name}" to Google Drive...`, 'info');
  
  // In a real implementation, this would use the Google Drive API
  // For demonstration, we'll simulate it
  
  setTimeout(() => {
    showNotification('Notebook saved to Google Drive', 'success');
  }, 1500);
}

//-------------------------------------------------------------------------------
// 3. NOTION INTEGRATION
//-------------------------------------------------------------------------------

/**
 * Simulates authentication with Notion
 * In a real implementation, this would use OAuth
 */
function authenticateNotion() {
  showNotification('Simulating Notion authentication...', 'info');
  
  // Simulate API call delay
  setTimeout(() => {
    state.notionEnabled = true;
    state.notionAuth = {
      token: 'simulated_token_' + Date.now(),
      expiry: new Date(Date.now() + 3600000) // 1 hour from now
    };
    
    localStorage.setItem('tm_notion_auth', JSON.stringify(state.notionAuth));
    
    showNotification('Notion connected successfully', 'success');
    
    // Update UI
    const authBtn = document.querySelector('.notion-auth-btn');
    if (authBtn) {
      authBtn.textContent = 'Disconnect Notion';
    }
    
    // Show additional buttons
    const integrationWidget = document.getElementById('integrations-widget');
    if (integrationWidget) {
      const container = integrationWidget.querySelector('.widget-body');
      if (container) {
        // Re-render the widget
        renderIntegrationsWidget(container);
      }
    }
  }, 1500);
}

/**
 * Disconnects from Notion
 */
function disconnectNotion() {
  state.notionEnabled = false;
  state.notionAuth = null;
  localStorage.removeItem('tm_notion_auth');
  
  showNotification('Notion disconnected', 'info');
  
  // Update UI
  const integrationWidget = document.getElementById('integrations-widget');
  if (integrationWidget) {
    const container = integrationWidget.querySelector('.widget-body');
    if (container) {
      // Re-render the widget
      renderIntegrationsWidget(container);
    }
  }
}

/**
 * Saves content to Notion
 * In a real implementation, this would use the Notion API
 */
function saveToNotion() {
  if (!state.notionEnabled) {
    showNotification('Please connect Notion first', 'warning');
    return;
  }
  
  showNotification('Saving to Notion...', 'info');
  
  // Simulate API call
  setTimeout(() => {
    showNotification('Content saved to Notion', 'success');
  }, 1500);
}

/**
 * Saves notebook to Notion
 * In a real implementation, this would use the Notion API
 */
function saveNotebookToNotion() {
  if (!state.notionEnabled) {
    showNotification('Please connect Notion first', 'warning');
    return;
  }
  
  const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
  if (!notebook) return;
  
  showNotification(`Saving notebook "${notebook.name}" to Notion...`, 'info');
  
  // In a real implementation, this would use the Notion API
  // For demonstration, we'll simulate it
  
  setTimeout(() => {
    showNotification('Notebook saved to Notion', 'success');
  }, 1500);
}

//-------------------------------------------------------------------------------
// 4. INTEGRATION WIDGET UI
//-------------------------------------------------------------------------------

/**
 * Renders the integrations widget UI
 * @param {HTMLElement} container - The container to render into
 */
function renderIntegrationsWidget(container) {
  container.innerHTML = `
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; margin-bottom: 5px;">Google Drive Integration</div>
      <button class="widget-button google-drive-auth-btn">
        ${state.googleDriveEnabled ? 'Disconnect' : 'Connect'} Google Drive
      </button>
      ${state.googleDriveEnabled ? `
        <div style="margin-top: 10px;">
          <button class="widget-button save-to-drive-btn">Save Current Chat</button>
          <button class="widget-button browse-drive-btn">Browse Files</button>
        </div>
      ` : ''}
    </div>
    
    <div style="margin-bottom: 15px;">
      <div style="font-weight: bold; margin-bottom: 5px;">Notion Integration</div>
      <button class="widget-button notion-auth-btn">
        ${state.notionEnabled ? 'Disconnect' : 'Connect'} Notion
      </button>
      ${state.notionEnabled ? `
        <div style="margin-top: 10px;">
          <button class="widget-button save-to-notion-btn">Save to Notion</button>
        </div>
      ` : ''}
    </div>
    
    <div style="margin-top: 10px; font-size: 12px; color: #888;">
      Connect your accounts to sync conversations and tasks across platforms.
    </div>
  `;
  
  // Add event listeners for the Google Drive buttons
  const googleDriveAuthBtn = container.querySelector('.google-drive-auth-btn');
  if (googleDriveAuthBtn) {
    googleDriveAuthBtn.addEventListener('click', () => {
      if (state.googleDriveEnabled) {
        disconnectGoogleDrive();
      } else {
        authenticateGoogleDrive();
      }
    });
  }
  
  // Add event listeners for Google Drive features if enabled
  if (state.googleDriveEnabled) {
    const saveToDriveBtn = container.querySelector('.save-to-drive-btn');
    if (saveToDriveBtn) {
      saveToDriveBtn.addEventListener('click', saveCurrentChatToDrive);
    }
    
    const browseDriveBtn = container.querySelector('.browse-drive-btn');
    if (browseDriveBtn) {
      browseDriveBtn.addEventListener('click', browseGoogleDrive);
    }
  }
  
  // Add event listeners for the Notion buttons
  const notionAuthBtn = container.querySelector('.notion-auth-btn');
  if (notionAuthBtn) {
    notionAuthBtn.addEventListener('click', () => {
      if (state.notionEnabled) {
        disconnectNotion();
      } else {
        authenticateNotion();
      }
    });
  }
  
  // Add event listeners for Notion features if enabled
  if (state.notionEnabled) {
    const saveToNotionBtn = container.querySelector('.save-to-notion-btn');
    if (saveToNotionBtn) {
      saveToNotionBtn.addEventListener('click', saveToNotion);
    }
  }
}
