// TypingMind ADHD/Dyslexia Extension
// Features: Movable widgets, task management with carryover, color themes, and productivity tools
// Author: Your Name
// Version: 1.0

(function() {
  //-------------------------------------------------------------------------------
  // 1. CONFIGURATION
  //-------------------------------------------------------------------------------
  const config = {
    // Performance settings
    performance: {
      lazyLoadWidgets: true,      // Only load widgets when needed
      disableAnimations: false,   // Option to disable animations for better performance
      cacheEnabled: true,         // Cache data to improve responsiveness
      lowPerformanceMode: false,  // Simplified version for slower devices
      preloadCommonWidgets: true  // Preload frequently used widgets
    },
    // Appearance settings
    appearance: {
      defaultTheme: 'theme-teal',
      enablePatternBackground: true,
      animationsEnabled: true,
      fontScale: 1.0
    },
    debug: false  // Set to true to enable debug logs
  };

  //-------------------------------------------------------------------------------
  // 2. STYLES - Visual improvements for ADHD and dyslexia
  //-------------------------------------------------------------------------------
  const styleElement = document.createElement('style');
  
  const customStyles = `
    /* Import OpenDyslexic font for better readability */
    @import url('https://fonts.cdnfonts.com/css/opendyslexic');
    
    /* Apply dyslexia-friendly font to all text - at a smaller size */
    body, input, textarea, button, div, span, p, h1, h2, h3, h4, h5, h6 {
      font-family: 'OpenDyslexic', sans-serif !important;
      font-size: 92% !important;
    }
    
    /* Increase spacing between lines for better readability */
    p, li, div {
      line-height: 1.6 !important;
      letter-spacing: 0.5px !important;
    }
    
    /* Add rounded corners to all UI elements */
    button, input, textarea, [role="button"], 
    .ant-btn, .ant-input, .ant-card, .ant-modal-content,
    .ant-dropdown-menu, .ant-alert, .ant-select-dropdown,
    .ant-menu, .ant-dropdown, .ant-popover-content {
      border-radius: 12px !important;
      overflow: hidden;
      transition: all 0.2s ease !important;
    }
    
    /* Multi-color scheme with vibrant options */
    :root {
      /* Base theme colors */
      --primary-color: #ff7e5f;
      --secondary-color: #feb47b;
      --accent-color: #3a9ea5; 
      --teal-light: #c5f0f5;
      --teal-border: #2c7d82;
      
      /* Additional vibrant colors for visual interest */
      --purple-primary: #9b5de5;
      --purple-secondary: #f15bb5;
      --yellow-primary: #fee440;
      --yellow-secondary: #f8961e;
      --green-primary: #06d6a0;
      --green-secondary: #4cc9f0;
      
      /* Functional colors */
      --background-color: #f0f8fa;
      --text-color: #333333;
      --light-accent: #e6f7ff;
      --focus-color: #FF6B6B;
      --success-color: #4CAF50;
      --warning-color: #FFC107;
      
      /* Design-specific colors */
      --canvas-color: #ffffff;
      --grid-line-color: rgba(0, 0, 0, 0.1);
      --selection-color: rgba(58, 158, 165, 0.3);
    }
    
    /* Hover background effects */
    button:hover, [role="button"]:hover, .widget-header:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
    }
    
    /* Main content area */
    body > div:first-child {
      background-color: var(--background-color) !important;
    }
    
    /* Add a subtle pattern to the background - can be toggled */
    body.pattern-bg:after {
      content: "" !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
      background-image: radial-gradient(var(--teal-light) 1px, transparent 1px) !important;
      background-size: 20px 20px !important;
      opacity: 0.3 !important;
      z-index: -1 !important;
    }
    
    /* Style the chat messages */
    .chat-message, .message, .message-container {
      border-radius: 12px !important;
      margin: 10px 0 !important;
      padding: 15px !important;
      border: 2px solid var(--teal-border) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      position: relative !important;
      transition: all 0.2s ease !important;
    }
    
    /* Add a slight hover effect to make messages pop */
    .chat-message:hover, .message:hover, .message-container:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
    }
    
    /* User messages */
    .user-message, .message.user, .message-container.user {
      background-color: var(--teal-light) !important;
      align-self: flex-end !important;
    }
    
    /* AI messages */
    .ai-message, .message.ai, .message-container.ai {
      background-color: white !important;
      border-left: 4px solid var(--accent-color) !important;
    }
    
    /* Add subtle decorative elements to make it pop */
    .chat-message::before, .message::before, .message-container::before {
      content: '' !important;
      position: absolute !important;
      top: -5px !important;
      left: -5px !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      background: var(--accent-color) !important;
      z-index: 1 !important;
    }
    
    /* Focus mode styling */
    body.focus-mode .sidebar,
    body.focus-mode nav,
    body.focus-mode .top-bar,
    body.focus-mode .nav-buttons {
      opacity: 0.2 !important;
      transition: opacity 0.3s ease !important;
    }
    
    body.focus-mode .sidebar:hover,
    body.focus-mode nav:hover,
    body.focus-mode .top-bar:hover,
    body.focus-mode .nav-buttons:hover {
      opacity: 1 !important;
    }
    
    /* Movable widget base styling */
    .movable-widget {
      position: fixed !important;
      background-color: white !important;
      border: 2px solid var(--accent-color) !important;
      border-radius: 12px !important;
      padding: 10px !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      z-index: 1000 !important;
      display: flex !important;
      flex-direction: column !important;
      min-width: 200px !important;
      max-width: 400px !important;
      max-height: 500px !important;
      overflow-y: auto !important;
      resize: both !important;
      overflow: auto !important;
      transition: box-shadow 0.3s ease !important;
    }
    
    .movable-widget:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
    }
    
    .widget-header {
      padding: 5px !important;
      cursor: move !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px solid #eee !important;
      margin-bottom: 10px !important;
    }
    
    .widget-title {
      font-weight: bold !important;
      color: var(--accent-color) !important;
    }
    
    .widget-controls {
      display: flex !important;
      gap: 5px !important;
    }
    
    .widget-control-btn {
      background: none !important;
      border: none !important;
      cursor: pointer !important;
      padding: 2px 5px !important;
      opacity: 0.7 !important;
      transition: opacity 0.2s !important;
    }
    
    .widget-control-btn:hover {
      opacity: 1 !important;
    }
    
    .widget-body {
      flex-grow: 1 !important;
      overflow-y: auto !important;
    }
    
    /* Custom scrollbar for ADHD focus */
    ::-webkit-scrollbar {
      width: 12px !important;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05) !important;
      border-radius: 10px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--accent-color) !important;
      border-radius: 10px !important;
      border: 2px solid var(--background-color) !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: var(--teal-border) !important;
    }
    
    /* Color themes */
    body.theme-teal {
      --accent-color: #3a9ea5 !important; 
      --teal-light: #c5f0f5 !important;
      --teal-border: #2c7d82 !important;
    }
    
    body.theme-purple {
      --accent-color: #9b5de5 !important; 
      --teal-light: #f3e7ff !important;
      --teal-border: #7e3bd7 !important;
    }
    
    body.theme-orange {
      --accent-color: #f8961e !important; 
      --teal-light: #fff1e0 !important;
      --teal-border: #e67700 !important;
    }
    
    body.theme-green {
      --accent-color: #06d6a0 !important; 
      --teal-light: #e0fff7 !important;
      --teal-border: #04aa7f !important;
    }
    
    body.theme-pink {
      --accent-color: #f15bb5 !important; 
      --teal-light: #ffe5f4 !important;
      --teal-border: #d1408f !important;
    }
    
    /* Task list styling */
    .task-item {
      display: flex !important;
      align-items: center !important;
      margin-bottom: 8px !important;
      padding: 8px !important;
      border-radius: 5px !important;
      transition: background-color 0.2s !important;
      border-left: 3px solid var(--accent-color) !important;
    }
    
    .task-item:hover {
      background-color: var(--teal-light) !important;
    }
    
    .task-check {
      margin-right: 8px !important;
      width: 18px !important;
      height: 18px !important;
    }
    
    .task-text {
      flex-grow: 1 !important;
    }
    
    .task-text.completed {
      text-decoration: line-through !important;
      color: #888 !important;
    }
    
    .task-date {
      font-size: 11px !important;
      color: #888 !important;
      margin-left: 10px !important;
    }
    
    .task-delete {
      color: #f44336 !important;
      cursor: pointer !important;
      opacity: 0.5 !important;
      padding: 0 5px !important;
    }
    
    .task-delete:hover {
      opacity: 1 !important;
    }
    
    .add-task-input {
      width: 100% !important;
      padding: 8px !important;
      border: 1px solid #ddd !important;
      border-radius: 5px !important;
      margin-top: 5px !important;
    }
    
    /* Notification styling */
    .tm-notification {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      padding: 12px 20px !important;
      background-color: var(--accent-color) !important;
      color: white !important;
      border-radius: 8px !important;
      z-index: 10000 !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
      opacity: 0 !important;
      transform: translateY(20px) !important;
      transition: all 0.3s ease !important;
    }
    
    .tm-notification.success {
      background-color: var(--success-color) !important;
    }
    
    .tm-notification.warning {
      background-color: var(--warning-color) !important;
      color: #333 !important;
    }
    
    .tm-notification.error {
      background-color: var(--focus-color) !important;
    }
    
    /* Control panel button */
    .control-panel-toggle {
      position: fixed !important;
      top: 15px !important;
      right: 15px !important;
      background-color: var(--accent-color) !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 8px 12px !important;
      cursor: pointer !important;
      z-index: 1001 !important;
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.2s ease !important;
    }
    
    .control-panel-toggle:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
    }
    
    /* Widget button row */
    .widget-buttons {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      margin-top: 10px !important;
    }
    
    .widget-button {
      background-color: var(--accent-color) !important;
      color: white !important;
      border: none !important;
      border-radius: 5px !important;
      padding: 5px 10px !important;
      font-size: 12px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
      transition: transform 0.2s !important;
    }
    
    .widget-button:hover {
      transform: translateY(-2px) !important;
    }
    
    /* Notebook/Editor styling */
    .notebook-editor {
      display: flex;
      flex-direction: column;
      height: 300px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .editor-toolbar {
      display: flex;
      padding: 5px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    
    .editor-toolbar button {
      background: none;
      border: none;
      padding: 5px 10px;
      margin-right: 2px;
      border-radius: 3px;
      cursor: pointer;
    }
    
    .editor-toolbar button:hover {
      background-color: var(--teal-light);
    }
    
    .editor-content {
      flex-grow: 1;
      padding: 10px;
      overflow-y: auto;
      background-color: white;
      min-height: 200px;
    }
    
    /* Timeline widget styling */
    .timeline-wrapper {
      margin-top: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      background-color: white;
    }
    
    .timeline-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    
    .timeline-days {
      display: flex;
      border-bottom: 1px solid #ddd;
    }
    
    .timeline-day {
      flex: 1;
      text-align: center;
      padding: 5px;
      font-size: 12px;
      border-right: 1px solid #eee;
    }
    
    .timeline-day:last-child {
      border-right: none;
    }
    
    .timeline-day.today {
      background-color: var(--teal-light);
      font-weight: bold;
    }
    
    .timeline-events {
      position: relative;
      height: 150px;
    }
    
    .timeline-event {
      position: absolute;
      background-color: var(--accent-color);
      border-radius: 5px;
      padding: 2px 5px;
      font-size: 10px;
      color: white;
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    
    /* Speed indicator */
    .speed-indicator {
      position: fixed;
      bottom: 15px;
      left: 15px;
      background-color: white;
      border: 2px solid var(--accent-color);
      border-radius: 20px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .speed-indicator-bar {
      width: 50px;
      height: 10px;
      background-color: #eee;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .speed-indicator-fill {
      height: 100%;
      background-color: var(--accent-color);
      width: 50%; /* Will be updated dynamically */
    }
  `;
  
  // Add our styles to the page
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);

  //-------------------------------------------------------------------------------
  // 3. STATE MANAGEMENT - Keep track of tasks, settings, and other data
  //-------------------------------------------------------------------------------
  let state = {
    // UI state
    widgets: {
      visible: false,
      positions: loadWidgetPositions(),
      activePage: 'tasks'
    },
    theme: loadTheme() || 'theme-teal',
    patternBackground: loadPatternSetting() || false,
    
    // Timer state
    timer: {
      running: false,
      value: 25 * 60, // 25 minutes in seconds (pomodoro)
      interval: null
    },
    
    // Focus mode
    focusMode: false,
    
    // Tasks with persistence
    tasks: loadTasks(),
    
    // Project organization
    projects: loadProjects(),
    activeProject: null,
    
    // Multi-chat management
    chats: [
      { id: 'default', name: 'Main Chat', content: null }
    ],
    activeChat: 'default',
    
    // Notebook functionality
    notebooks: loadNotebooks(),
    activeNotebook: 'default',
    unsavedChanges: false,
    
    // Prompt templates
    customPrompts: loadCustomPrompts(),
    
    // Integrations
    googleDriveEnabled: false,
    googleDriveAuth: null,
    notionEnabled: false,
    notionAuth: null,
    
    // Performance metrics
    performance: {
      loadTime: 0,
      responseTime: []
    }
  };

  //-------------------------------------------------------------------------------
  // 4. WIDGET DEFINITIONS - Movable tool panels
  //-------------------------------------------------------------------------------
  const widgets = [
    {
      id: 'tasks-widget',
      title: 'Tasks & To-Dos',
      icon: '📝',
      category: 'productivity',
      description: 'Manage your daily tasks, set deadlines, and track progress',
      initialPosition: { top: '100px', left: '20px' },
      render: renderTasksWidget,
      minWidth: '250px',
      minHeight: '300px'
    },
    {
      id: 'timer-widget',
      title: 'Pomodoro Timer',
      icon: '⏱️',
      category: 'productivity',
      description: 'Stay focused with a Pomodoro timer (25 min work, 5 min break)',
      initialPosition: { top: '100px', right: '20px' },
      render: renderTimerWidget,
      minWidth: '200px',
      minHeight: '150px'
    },
    {
      id: 'multi-chat-widget',
      title: 'Multi-Chat Manager',
      icon: '💬',
      category: 'organization',
      description: 'Work on multiple conversations simultaneously',
      initialPosition: { top: '260px', right: '20px' },
      render: renderMultiChatWidget,
      minWidth: '250px',
      minHeight: '200px'
    },
    {
      id: 'project-widget',
      title: 'Project Folders',
      icon: '📁',
      category: 'organization',
      description: 'Organize your work into
