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
      description: 'Organize your work into projects with nested folders',
      initialPosition: { top: '330px', left: '20px' },
      render: renderProjectWidget,
      minWidth: '250px',
      minHeight: '300px'
    },
    {
      id: 'notebook-widget',
      title: 'Design Notes',
      icon: '📓',
      category: 'design',
      description: 'Take rich notes with text formatting and image support',
      initialPosition: { top: '150px', left: '300px' },
      render: renderNotebookWidget,
      minWidth: '350px',
      minHeight: '400px'
    },
    {
      id: 'theme-widget',
      title: 'Visual Settings',
      icon: '🎨',
      category: 'design',
      description: 'Customize colors, fonts, and visual elements',
      initialPosition: { bottom: '20px', right: '20px' },
      render: renderThemeWidget,
      minWidth: '200px',
      minHeight: '200px'
    }
  ];

  //-------------------------------------------------------------------------------
  // 5. PERSISTENCE - LocalStorage functions for saving user data
  //-------------------------------------------------------------------------------
  
  // Helper functions for local storage
  function loadTasks() {
    try {
      const tasks = JSON.parse(localStorage.getItem('tm_tasks')) || [];
      return tasks;
    } catch (e) {
      console.error('Error loading tasks:', e);
      return [];
    }
  }
  
  function saveTasks() {
    try {
      localStorage.setItem('tm_tasks', JSON.stringify(state.tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }
  
  function loadProjects() {
    try {
      const projects = JSON.parse(localStorage.getItem('tm_projects')) || [
        { id: 'default', name: 'Default Project', folders: [] }
      ];
      return projects;
    } catch (e) {
      console.error('Error loading projects:', e);
      return [{ id: 'default', name: 'Default Project', folders: [] }];
    }
  }
  
  function saveProjects() {
    try {
      localStorage.setItem('tm_projects', JSON.stringify(state.projects));
    } catch (e) {
      console.error('Error saving projects:', e);
    }
  }
  
  function loadCustomPrompts() {
    try {
      return JSON.parse(localStorage.getItem('tm_custom_prompts')) || [
        { id: 'default1', name: 'Summarize Text', prompt: 'Please summarize the following text in 3 bullet points:' },
        { id: 'default2', name: 'Creative Ideas', prompt: 'Generate 5 creative ideas for:' },
        { id: 'default3', name: 'Design Feedback', prompt: 'Please provide constructive feedback on this design:' }
      ];
    } catch (e) {
      console.error('Error loading custom prompts:', e);
      return [
        { id: 'default1', name: 'Summarize Text', prompt: 'Please summarize the following text in 3 bullet points:' },
        { id: 'default2', name: 'Creative Ideas', prompt: 'Generate 5 creative ideas for:' },
        { id: 'default3', name: 'Design Feedback', prompt: 'Please provide constructive feedback on this design:' }
      ];
    }
  }
  
  function saveCustomPrompts() {
    try {
      localStorage.setItem('tm_custom_prompts', JSON.stringify(state.customPrompts));
    } catch (e) {
      console.error('Error saving custom prompts:', e);
    }
  }
  
  function loadWidgetPositions() {
    try {
      return JSON.parse(localStorage.getItem('tm_widget_positions')) || {};
    } catch (e) {
      console.error('Error loading widget positions:', e);
      return {};
    }
  }
  
  function saveWidgetPositions() {
    try {
      localStorage.setItem('tm_widget_positions', JSON.stringify(state.widgets.positions));
    } catch (e) {
      console.error('Error saving widget positions:', e);
    }
  }
  
  function loadTheme() {
    return localStorage.getItem('tm_theme') || 'theme-teal';
  }
  
  function saveTheme(theme) {
    localStorage.setItem('tm_theme', theme);
  }
  
  function loadPatternSetting() {
    return localStorage.getItem('tm_pattern_bg') === 'true';
  }
  
  function savePatternSetting(enabled) {
    localStorage.setItem('tm_pattern_bg', enabled.toString());
  }
  
  function loadNotebooks() {
    try {
      return JSON.parse(localStorage.getItem('tm_notebooks')) || [{
        id: 'default',
        name: 'General Notes',
        content: '<p>Welcome to your design notebook!</p>',
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }];
    } catch (e) {
      console.error('Error loading notebooks:', e);
      return [{
        id: 'default',
        name: 'General Notes',
        content: '<p>Welcome to your design notebook!</p>',
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }];
    }
  }
  
  function saveNotebooks() {
    try {
      localStorage.setItem('tm_notebooks', JSON.stringify(state.notebooks));
    } catch (e) {
      console.error('Error saving notebooks:', e);
    }
  }

  //-------------------------------------------------------------------------------
  // 6. WIDGET FRAMEWORK - Create and manage movable widget containers
  //-------------------------------------------------------------------------------
  
  // Create UI Elements
  function createControlPanel() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'control-panel-toggle';
    toggleButton.innerHTML = '🧠 ADHD Tools';
    toggleButton.addEventListener('click', toggleWidgets);
    document.body.appendChild(toggleButton);
  }
  
  function createSpeedIndicator() {
    const speedIndicator = document.createElement('div');
    speedIndicator.className = 'speed-indicator';
    speedIndicator.innerHTML = `
      <span>Speed</span>
      <div class="speed-indicator-bar">
        <div class="speed-indicator-fill"></div>
      </div>
      <button class="widget-control-btn boost-speed-btn" title="Boost Speed">⚡</button>
    `;
    
    document.body.appendChild(speedIndicator);
    
    // Add event listener for speed boost
    speedIndicator.querySelector('.boost-speed-btn').addEventListener('click', boostPerformance);
    
    // Update speed indicator
    updateSpeedIndicator();
  }
  
  function updateSpeedIndicator() {
    const speedFill = document.querySelector('.speed-indicator-fill');
    if (!speedFill) return;
    
    // Calculate speed based on response times
    let speedPercentage = 50; // Default
    
    if (state.performance.responseTime.length > 0) {
      const avgResponseTime = state.performance.responseTime.reduce((a, b) => a + b, 0) / state.performance.responseTime.length;
      // Convert avg response time to a percentage (lower is better)
      // 0-200ms = 100%, 1000ms+ = 0%
      speedPercentage = Math.max(0, Math.min(100, 100 - ((avgResponseTime - 200) / 800 * 100)));
    }
    
    // Apply speed modifiers
    if (config.performance.lowPerformanceMode) {
      speedPercentage += 20; // Boost for low performance mode
    }
    if (config.performance.disableAnimations) {
      speedPercentage += 10; // Boost for disabled animations
    }
    
    // Update the visual indicator
    speedFill.style.width = `${speedPercentage}%`;
    
    // Set color based on speed
    if (speedPercentage > 75) {
      speedFill.style.backgroundColor = 'var(--success-color)';
    } else if (speedPercentage > 40) {
      speedFill.style.backgroundColor = 'var(--warning-color)';
    } else {
      speedFill.style.backgroundColor = 'var(--focus-color)';
    }
  }
  
  function boostPerformance() {
    if (config.performance.lowPerformanceMode) {
      // Already in low performance mode, let's disable all animations too
      config.performance.disableAnimations = !config.performance.disableAnimations;
      document.body.classList.toggle('no-animations', config.performance.disableAnimations);
      
      showNotification(
        config.performance.disableAnimations ? 
        'Animations disabled for maximum performance' : 
        'Animations enabled - performance may decrease', 
        config.performance.disableAnimations ? 'success' : 'warning'
      );
    } else {
      // Enable low performance mode
      config.performance.lowPerformanceMode = true;
      
      // Hide non-essential widgets
      const visibleWidgetCount = document.querySelectorAll('.movable-widget[style*="display: flex"]').length;
      if (visibleWidgetCount > 3) {
        const widgets = document.querySelectorAll('.movable-widget');
        let hiddenCount = 0;
        
        widgets.forEach(widget => {
          // Keep only essential widgets visible
          if (!widget.id.match(/tasks|timer|notebook/)) {
            if (widget.style.display === 'flex') {
              widget.style.display = 'none';
              hiddenCount++;
            }
          }
        });
        
        if (hiddenCount > 0) {
          showNotification(`Hid ${hiddenCount} non-essential widgets to improve performance`, 'info');
        }
      }
      
      showNotification('Low performance mode enabled - reduced features but faster response', 'success');
    }
    
    // Update the speed indicator
    updateSpeedIndicator();
    
    // Save performance settings
    savePerformanceSettings();
  }
  
  function savePerformanceSettings() {
    try {
      localStorage.setItem('tm_performance_config', JSON.stringify({
        lowPerformanceMode: config.performance.lowPerformanceMode,
        disableAnimations: config.performance.disableAnimations
      }));
    } catch (e) {
      console.error('Error saving performance settings:', e);
    }
  }
  
  function loadPerformanceSettings() {
    try {
      const savedSettings = JSON.parse(localStorage.getItem('tm_performance_config'));
      if (savedSettings) {
        config.performance.lowPerformanceMode = savedSettings.lowPerformanceMode || false;
        config.performance.disableAnimations = savedSettings.disableAnimations || false;
        
        // Apply settings
        document.body.classList.toggle('no-animations', config.performance.disableAnimations);
      }
    } catch (e) {
      console.error('Error loading performance settings:', e);
    }
  }
  
  function toggleWidgets() {
    state.widgets.visible = !state.widgets.visible;
    
    const widgetElements = document.querySelectorAll('.movable-widget');
    
    if (state.widgets.visible) {
      // If in low performance mode, only show essential widgets
      if (config.performance.lowPerformanceMode) {
        widgetElements.forEach(widget => {
          if (widget.id.match(/tasks|timer|notebook/)) {
            widget.style.display = 'flex';
          }
        });
        showNotification('Essential productivity tools enabled (Low Performance Mode)', 'success');
      } else {
        widgetElements.forEach(widget => {
          widget.style.display = 'flex';
        });
        showNotification('ADHD productivity tools enabled', 'success');
      }
    } else {
      widgetElements.forEach(widget => {
        widget.style.display = 'none';
      });
      showNotification('Tools hidden', 'info');
    }
  }
  
  // Create a widget container with move functionality
  function createWidget(widget) {
    // If lazy loading is enabled and widgets are not visible, don't create the DOM element yet
    if (config.performance.lazyLoadWidgets && !state.widgets.visible && !config.performance.preloadCommonWidgets) {
      // Except for common widgets that should be preloaded
      if (widget.id !== 'tasks-widget' && widget.id !== 'timer-widget' && widget.id !== 'notebook-widget') {
        return { id: widget.id, lazyLoaded: false };
      }
    }
    
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'movable-widget';
    widgetContainer.id = widget.id;
    widgetContainer.style.display = 'none';
    
    // Apply saved position or initial position
    const savedPosition = state.widgets.positions[widget.id] || widget.initialPosition;
    Object.keys(savedPosition).forEach(prop => {
      widgetContainer.style[prop] = savedPosition[prop];
    });
    
    // Set minimum dimensions if specified
    if (widget.minWidth) widgetContainer.style.minWidth = widget.minWidth;
    if (widget.minHeight) widgetContainer.style.minHeight = widget.minHeight;
    
    // Create widget header with drag handle
    const widgetHeader = document.createElement('div');
    widgetHeader.className = 'widget-header';
    widgetHeader.innerHTML = `
      <div class="widget-title">${widget.icon} ${widget.title}</div>
      <div class="widget-controls">
        <button class="widget-control-btn minimize-widget" title="Minimize">_</button>
        <button class="widget-control-btn help-widget" title="Help">?</button>
        <button class="widget-control-btn close-widget" title="Close">×</button>
      </div>
    `;
    
    // Create widget body
    const widgetBody = document.createElement('div');
    widgetBody.className = 'widget-body';
    
    // Add to DOM
    widgetContainer.appendChild(widgetHeader);
    widgetContainer.appendChild(widgetBody);
    document.body.appendChild(widgetContainer);
    
    // Make widget draggable
    makeDraggable(widgetContainer, widgetHeader);
    
    // Add event listeners
    widgetContainer.querySelector('.close-widget').addEventListener('click', () => {
      widgetContainer.style.display = 'none';
    });
    
    widgetContainer.querySelector('.minimize-widget').addEventListener('click', () => {
      if (widgetBody.style.display === 'none') {
        widgetBody.style.display = 'block';
        widgetContainer.style.height = 'auto';
      } else {
        widgetBody.style.display = 'none';
        widgetContainer.style.height = 'auto';
      }
    });
    
    // Render the widget content
    widget.render(widgetBody);
    
    return { id: widget.id, element: widgetContainer, lazyLoaded: true };
  }
  
  // Make an element draggable
  function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
      
      // Add active class
      element.classList.add('dragging');
    }
    
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      
      // Clear any right/bottom positioning that might interfere
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    }
    
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
      
      // Save the position
      saveWidgetPosition(element.id);
      
      // Remove active class
      element.classList.remove('dragging');
    }
  }
  
  function saveWidgetPosition(widgetId) {
    const widget = document.getElementById(widgetId);
    if (!widget) return;
    
    state.widgets.positions[widgetId] = {
      top: widget.style.top,
      left: widget.style.left
    };
    
    saveWidgetPositions();
  }
  
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

  //-------------------------------------------------------------------------------
  // 7. PRODUCTIVITY TOOLS - Task management, pomodoro timer, etc.
  //-------------------------------------------------------------------------------
  
  // Task management functions
  function addTask(taskText) {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setHours(23, 59, 59, 999); // End of today
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      created: today.toISOString(),
      due: dueDate.toISOString(),
      projectId: state.activeProject || 'default'
    };
    
    state.tasks.push(newTask);
    saveTasks();
    renderTasks();
    showNotification('Task added', 'success');
  }
  
  function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      
      if (task.completed) {
        showNotification('Task completed!', 'success');
      }
    }
  }
  
  function deleteTask(taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
    showNotification('Task deleted', 'info');
  }
  
  function clearCompletedTasks() {
    state.tasks = state.tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    showNotification('Completed tasks cleared', 'info');
  }
  
  function renderTasks(filter = 'all') {
    const taskItemsContainer = document.querySelector('.task-items');
    if (!taskItemsContainer) return;
    
    // Filter tasks based on selected filter and project
    let tasksToDisplay = state.activeProject ? 
      state.tasks.filter(t => t.projectId === state.activeProject) : 
      state.tasks;
    
    // Apply additional filter (all, today, overdue)
    if (filter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      tasksToDisplay = tasksToDisplay.filter(task => {
        const dueDate = new Date(task.due);
        return dueDate >= today && dueDate < tomorrow;
      });
    } else if (filter === 'overdue') {
      const now = new Date();
      tasksToDisplay = tasksToDisplay.filter(task => {
        return new Date(task.due) < now && !task.completed;
      });
    }
    
    // Sort by due date, then by creation date
    tasksToDisplay.sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by due date
      const dueDateA = new Date(a.due);
      const dueDateB = new Date(b.due);
      if (dueDateA.getTime() !== dueDateB.getTime()) {
        return dueDateA - dueDateB;
      }
      
      // Finally sort by creation date
      return new Date(a.created) - new Date(b.created);
    });
    
    taskItemsContainer.innerHTML = '';
    
    if (tasksToDisplay.length === 0) {
      taskItemsContainer.innerHTML = '<div style="text-align: center; padding: 10px; color: #888;">No tasks to display</div>';
      return;
    }
    
    tasksToDisplay.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      // Format date for display
      const dueDate = new Date(task.due);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      let dateDisplay = '';
      if (dueDate < today && !task.completed) {
        dateDisplay = `<span style="color: #f44336;">Overdue</span>`;
      } else if (dueDate >= today && dueDate < tomorrow) {
        dateDisplay = 'Today';
      } else {
        dateDisplay = dueDate.toLocaleDateString();
      }
      
      taskItem.innerHTML = `
        <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
        <div class="task-date">${dateDisplay}</div>
        <div class="task-delete">×</div>
      `;
      
      taskItem.querySelector('.task-check').addEventListener('change', () => toggleTaskCompletion(task.id));
      taskItem.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));
      
      taskItemsContainer.appendChild(taskItem);
    });
  }
  
  function filterTasks(filter) {
    renderTasks(filter);
    const taskListTitle = document.querySelector('.task-list-title');
    if (taskListTitle) {
      taskListTitle.textContent = filter === 'all' ? 'All Tasks' : 
                                 filter === 'today' ? 'Today\'s Tasks' : 
                                 'Overdue Tasks';
    }
  }
  
  // Timer functions
  function toggleTimer() {
    const startBtn = document.querySelector('.start-btn');
    
    if (state.timer.running) {
      clearInterval(state.timer.interval);
      startBtn.textContent = 'Start';
      state.timer.running = false;
      showNotification('Timer paused', 'warning');
    } else {
      state.timer.interval = setInterval(updateTimer, 1000);
      startBtn.textContent = 'Pause';
      state.timer.running = true;
      showNotification('Timer started', 'success');
    }
  }
  
  function updateTimer() {
    if (state.timer.value > 0) {
      state.timer.value--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timer.interval);
      document.querySelector('.start-btn').textContent = 'Start';
      state.timer.running = false;
      showNotification('Timer complete! Take a break.', 'success');
      
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vm//8Lbv//9kzNvwlYAAkDeCBlkQBNkwmkkhkiCAgCv//+//Nf//AaEheaADQCOkG+ChARkwmkkhkiCAgKsAAADs=');
      audio.play();
    }
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timer.value / 60);
    const seconds = state.timer.value % 60;
    const display = document.querySelector('.timer-display');
    if (display) {
      display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  function resetTimer() {
    clearInterval(state.timer.interval);
    state.timer.value = 25 * 60; // Reset to 25 minutes
    state.timer.running = false;
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) startBtn.textContent = 'Start';
    updateTimerDisplay();
    showNotification('Timer reset to 25:00', 'info');
  }
  
  function setCustomTimer() {
    const customTime = prompt('Enter time in minutes (1-60):', '25');
    if (customTime !== null) {
      const time = parseInt(customTime);
      if (!isNaN(time) && time > 0 && time <= 60) {
        clearInterval(state.timer.interval);
        state.timer.value = time * 60;
        state.timer.running = false;
        const startBtn = document.querySelector('.start-btn');
        if (startBtn) startBtn.textContent = 'Start';
        updateTimerDisplay();
        showNotification(`Timer set to ${time}:00`, 'success');
      } else {
        showNotification('Please enter a valid time between 1-60 minutes', 'error');
      }
    }
  }
  
  // Project management functions
  function addNewProject() {
    const projectName = prompt('Enter new project name:');
    if (projectName && projectName.trim()) {
      const newProject = {
        id: 'proj_' + Date.now(),
        name: projectName.trim(),
        folders: [],
        color: getRandomColor()
      };
      
      state.projects.push(newProject);
      saveProjects();
      renderProjects();
      showNotification(`Project "${projectName}" created`, 'success');
    }
  }
  
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
  
  //-------------------------------------------------------------------------------
  // 8. WIDGET RENDERERS - UI components for each widget
  //-------------------------------------------------------------------------------
  
  // Render tasks widget
  function renderTasksWidget(container) {
    container.innerHTML = `
      <div class="task-list-header">
        <div class="task-list-title">Today's Tasks</div>
        <div class="task-list-actions">
          <button class="widget-button clear-done-btn">Clear Done</button>
        </div>
      </div>
      <div class="task-items"></div>
      <input type="text" class="add-task-input" placeholder="Add a new task + Enter">
      <div class="widget-buttons">
        <button class="widget-button show-all-btn">All Tasks</button>
        <button class="widget-button show-today-btn">Today</button>
        <button class="widget-button show-overdue-btn">Overdue</button>
      </div>
    `;
    
    // Add event listeners
    container.querySelector('.add-task-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        addTask(this.value.trim());
        this.value = '';
      }
    });
    
    container.querySelector('.clear-done-btn').addEventListener('click', clearCompletedTasks);
    container.querySelector('.show-all-btn').addEventListener('click', () => filterTasks('all'));
    container.querySelector('.show-today-btn').addEventListener('click', () => filterTasks('today'));
    container.querySelector('.show-overdue-btn').addEventListener('click', () => filterTasks('overdue'));
    
    // Render initial tasks
    renderTasks();
  }
  
  // Render timer widget
  function renderTimerWidget(container) {
    container.innerHTML = `
      <div class="timer-display">25:00</div>
      <div class="timer-controls">
        <button class="widget-button start-btn">Start</button>
        <button class="widget-button reset-btn">Reset</button>
        <button class="widget-button custom-btn">Custom</button>
      </div>
      <div style="margin-top: 10px; font-size: 12px; text-align: center; color: #888;">
        🍅 Pomodoro Technique: 25 min work, 5 min break
      </div>
    `;
    
    // Add event listeners
    container.querySelector('.start-btn').addEventListener('click', toggleTimer);
    container.querySelector('.reset-btn').addEventListener('click', resetTimer);
    container.querySelector('.custom-btn').addEventListener('click', setCustomTimer);
    
    // Initialize timer display
    updateTimerDisplay();
  }
  
  // Render notebook widget
  function renderNotebookWidget(container) {
    container.innerHTML = `
      <div class="notebook-controls">
        <select class="notebook-selector">
          <option value="default">General Notes</option>
          <option value="new">+ New Notebook</option>
        </select>
        <div class="notebook-actions">
          <button class="widget-button export-notes-btn">Export</button>
          <button class="widget-button save-btn">Save</button>
        </div>
      </div>
      <div class="notebook-editor">
        <div class="editor-toolbar">
          <button data-format="bold" title="Bold">B</button>
          <button data-format="italic" title="Italic">I</button>
          <button data-format="heading" title="Heading">H</button>
          <button data-format="list" title="Bullet List">•</button>
          <button data-format="image" title="Insert Image">🖼️</button>
          <button data-format="color" title="Text Color">🎨</button>
        </div>
        <div class="editor-content" contenteditable="true"></div>
      </div>
      <div class="notebook-status">Last saved: Never</div>
    `;
    
    // Initialize notebook functionality
    initializeNotebook(container);
  }
  
  // Render multi-chat widget
  function renderMultiChatWidget(container) {
    container.innerHTML = `
      <div class="multi-chat-tabs"></div>
      <div class="widget-buttons">
        <button class="widget-button new-chat-btn">New Chat</button>
        <button class="widget-button rename-chat-btn">Rename Current</button>
        <button class="widget-button save-chats-btn">Save All Chats</button>
      </div>
    `;
    
    // Initialize multi-chat functionality here
  }
  
  // Render project widget
  function renderProjectWidget(container) {
    container.innerHTML = `
      <div class="project-folders-header">
        <div class="task-list-title">Project Folders</div>
        <div class="task-list-actions">
          <button class="widget-button add-project-btn">Add Project</button>
        </div>
      </div>
      <div class="project-folders-list"></div>
    `;
    
    // Add event listeners
    container.querySelector('.add-project-btn').addEventListener('click', addNewProject);
    
    // Render projects
    renderProjects();
  }
  
  // Render theme widget
  function renderThemeWidget(container) {
    container.innerHTML = `
      <div style="margin-bottom: 15px;">
        <div style="margin-bottom: 5px; font-weight: bold;">Color Theme</div>
        <div class="theme-options">
          <div class="theme-option ${state.theme === 'theme-teal' ? 'active' : ''}" data-theme="theme-teal" style="background: linear-gradient(135deg, #3a9ea5, #c5f0f5);"></div>
          <div class="theme-option ${state.theme === 'theme-purple' ? 'active' : ''}" data-theme="theme-purple" style="background: linear-gradient(135deg, #9b5de5, #f3e7ff);"></div>
          <div class="theme-option ${state.theme === 'theme-orange' ? 'active' : ''}" data-theme="theme-orange" style="background: linear-gradient(135deg, #f8961e, #fff1e0);"></div>
          <div class="theme-option ${state.theme === 'theme-green' ? 'active' : ''}" data-theme="theme-green" style="background: linear-gradient(135deg, #06d6a0, #e0fff7);"></div>
          <div class="theme-option ${state.theme === 'theme-pink' ? 'active' : ''}" data-theme="theme-pink" style="background: linear-gradient(135deg, #f15bb5, #ffe5f4);"></div>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
          <input type="checkbox" id="pattern-bg-toggle" ${state.patternBackground ? 'checked' : ''}>
          Show Background Pattern
        </label>
      </div>
      
      <div style="margin-bottom: 15px;">
        <div style="margin-bottom: 5px; font-weight: bold;">Font Size</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="range" min="0.8" max="1.2" step="0.05" value="1.0" id="font-scale-slider">
          <span id="font-scale-value">100%</span>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <button class="widget-button toggle-focus-btn">
          ${state.focusMode ? 'Disable' : 'Enable'} Focus Mode
        </button>
      </div>
      
      <div style="margin-top: 10px; font-size: 12px; color: #888;">
        These settings help reduce visual fatigue and improve focus for ADHD/dyslexic users.
      </div>
    `;
    
    // Add theme selection event listeners
    const themeOptions = container.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        changeTheme(theme);
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
    
    // Add background pattern toggle
    const patternToggle = container.querySelector('#pattern-bg-toggle');
    patternToggle.addEventListener('change', function() {
      toggleBackgroundPattern(this.checked);
    });
    
    // Add font scale slider
    const fontScaleSlider = container.querySelector('#font-scale-slider');
    fontScaleSlider.addEventListener('input', function() {
      const scale = parseFloat(this.value);
      updateFontScale(scale);
      container.querySelector('#font-scale-value').textContent = `${Math.round(scale * 100)}%`;
    });
    
    // Add focus mode toggle
    container.querySelector('.toggle-focus-btn').addEventListener('click', toggleFocusMode);
  }
  
  //-------------------------------------------------------------------------------
  // 9. HELPER FUNCTIONS - Additional support functions
  //-------------------------------------------------------------------------------
  
  // Helper function to change themes
  function changeTheme(theme) {
    // Remove existing theme class
    document.body.classList.remove('theme-teal', 'theme-purple', 'theme-orange', 'theme-green', 'theme-pink');
    
    // Add new theme class
    document.body.classList.add(theme);
    
    // Save theme preference
    state.theme = theme;
    saveTheme(theme);
    
    showNotification(`${theme.replace('theme-', '').charAt(0).toUpperCase() + theme.replace('theme-', '').slice(1)} theme applied`, 'success');
  }
  
  // Toggle background pattern
  function toggleBackgroundPattern(enabled) {
    document.body.classList.toggle('pattern
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
      description: 'Organize your work into projects with nested folders',
      initialPosition: { top: '330px', left: '20px' },
      render: renderProjectWidget,
      minWidth: '250px',
      minHeight: '300px'
    },
    {
      id: 'notebook-widget',
      title: 'Design Notes',
      icon: '📓',
      category: 'design',
      description: 'Take rich notes with text formatting and image support',
      initialPosition: { top: '150px', left: '300px' },
      render: renderNotebookWidget,
      minWidth: '350px',
      minHeight: '400px'
    },
    {
      id: 'theme-widget',
      title: 'Visual Settings',
      icon: '🎨',
      category: 'design',
      description: 'Customize colors, fonts, and visual elements',
      initialPosition: { bottom: '20px', right: '20px' },
      render: renderThemeWidget,
      minWidth: '200px',
      minHeight: '200px'
    }
  ];

  //-------------------------------------------------------------------------------
  // 5. PERSISTENCE - LocalStorage functions for saving user data
  //-------------------------------------------------------------------------------
  
  // Helper functions for local storage
  function loadTasks() {
    try {
      const tasks = JSON.parse(localStorage.getItem('tm_tasks')) || [];
      return tasks;
    } catch (e) {
      console.error('Error loading tasks:', e);
      return [];
    }
  }
  
  function saveTasks() {
    try {
      localStorage.setItem('tm_tasks', JSON.stringify(state.tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }
  
  function loadProjects() {
    try {
      const projects = JSON.parse(localStorage.getItem('tm_projects')) || [
        { id: 'default', name: 'Default Project', folders: [] }
      ];
      return projects;
    } catch (e) {
      console.error('Error loading projects:', e);
      return [{ id: 'default', name: 'Default Project', folders: [] }];
    }
  }
  
  function saveProjects() {
    try {
      localStorage.setItem('tm_projects', JSON.stringify(state.projects));
    } catch (e) {
      console.error('Error saving projects:', e);
    }
  }
  
  function loadCustomPrompts() {
    try {
      return JSON.parse(localStorage.getItem('tm_custom_prompts')) || [
        { id: 'default1', name: 'Summarize Text', prompt: 'Please summarize the following text in 3 bullet points:' },
        { id: 'default2', name: 'Creative Ideas', prompt: 'Generate 5 creative ideas for:' },
        { id: 'default3', name: 'Design Feedback', prompt: 'Please provide constructive feedback on this design:' }
      ];
    } catch (e) {
      console.error('Error loading custom prompts:', e);
      return [
        { id: 'default1', name: 'Summarize Text', prompt: 'Please summarize the following text in 3 bullet points:' },
        { id: 'default2', name: 'Creative Ideas', prompt: 'Generate 5 creative ideas for:' },
        { id: 'default3', name: 'Design Feedback', prompt: 'Please provide constructive feedback on this design:' }
      ];
    }
  }
  
  function saveCustomPrompts() {
    try {
      localStorage.setItem('tm_custom_prompts', JSON.stringify(state.customPrompts));
    } catch (e) {
      console.error('Error saving custom prompts:', e);
    }
  }
  
  function loadWidgetPositions() {
    try {
      return JSON.parse(localStorage.getItem('tm_widget_positions')) || {};
    } catch (e) {
      console.error('Error loading widget positions:', e);
      return {};
    }
  }
  
  function saveWidgetPositions() {
    try {
      localStorage.setItem('tm_widget_positions', JSON.stringify(state.widgets.positions));
    } catch (e) {
      console.error('Error saving widget positions:', e);
    }
  }
  
  function loadTheme() {
    return localStorage.getItem('tm_theme') || 'theme-teal';
  }
  
  function saveTheme(theme) {
    localStorage.setItem('tm_theme', theme);
  }
  
  function loadPatternSetting() {
    return localStorage.getItem('tm_pattern_bg') === 'true';
  }
  
  function savePatternSetting(enabled) {
    localStorage.setItem('tm_pattern_bg', enabled.toString());
  }
  
  function loadNotebooks() {
    try {
      return JSON.parse(localStorage.getItem('tm_notebooks')) || [{
        id: 'default',
        name: 'General Notes',
        content: '<p>Welcome to your design notebook!</p>',
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }];
    } catch (e) {
      console.error('Error loading notebooks:', e);
      return [{
        id: 'default',
        name: 'General Notes',
        content: '<p>Welcome to your design notebook!</p>',
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }];
    }
  }
  
  function saveNotebooks() {
    try {
      localStorage.setItem('tm_notebooks', JSON.stringify(state.notebooks));
    } catch (e) {
      console.error('Error saving notebooks:', e);
    }
  }

  //-------------------------------------------------------------------------------
  // 6. WIDGET FRAMEWORK - Create and manage movable widget containers
  //-------------------------------------------------------------------------------
  
  // Create UI Elements
  function createControlPanel() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'control-panel-toggle';
    toggleButton.innerHTML = '🧠 ADHD Tools';
    toggleButton.addEventListener('click', toggleWidgets);
    document.body.appendChild(toggleButton);
  }
  
  function createSpeedIndicator() {
    const speedIndicator = document.createElement('div');
    speedIndicator.className = 'speed-indicator';
    speedIndicator.innerHTML = `
      <span>Speed</span>
      <div class="speed-indicator-bar">
        <div class="speed-indicator-fill"></div>
      </div>
      <button class="widget-control-btn boost-speed-btn" title="Boost Speed">⚡</button>
    `;
    
    document.body.appendChild(speedIndicator);
    
    // Add event listener for speed boost
    speedIndicator.querySelector('.boost-speed-btn').addEventListener('click', boostPerformance);
    
    // Update speed indicator
    updateSpeedIndicator();
  }
  
  function updateSpeedIndicator() {
    const speedFill = document.querySelector('.speed-indicator-fill');
    if (!speedFill) return;
    
    // Calculate speed based on response times
    let speedPercentage = 50; // Default
    
    if (state.performance.responseTime.length > 0) {
      const avgResponseTime = state.performance.responseTime.reduce((a, b) => a + b, 0) / state.performance.responseTime.length;
      // Convert avg response time to a percentage (lower is better)
      // 0-200ms = 100%, 1000ms+ = 0%
      speedPercentage = Math.max(0, Math.min(100, 100 - ((avgResponseTime - 200) / 800 * 100)));
    }
    
    // Apply speed modifiers
    if (config.performance.lowPerformanceMode) {
      speedPercentage += 20; // Boost for low performance mode
    }
    if (config.performance.disableAnimations) {
      speedPercentage += 10; // Boost for disabled animations
    }
    
    // Update the visual indicator
    speedFill.style.width = `${speedPercentage}%`;
    
    // Set color based on speed
    if (speedPercentage > 75) {
      speedFill.style.backgroundColor = 'var(--success-color)';
    } else if (speedPercentage > 40) {
      speedFill.style.backgroundColor = 'var(--warning-color)';
    } else {
      speedFill.style.backgroundColor = 'var(--focus-color)';
    }
  }
  
  function boostPerformance() {
    if (config.performance.lowPerformanceMode) {
      // Already in low performance mode, let's disable all animations too
      config.performance.disableAnimations = !config.performance.disableAnimations;
      document.body.classList.toggle('no-animations', config.performance.disableAnimations);
      
      showNotification(
        config.performance.disableAnimations ? 
        'Animations disabled for maximum performance' : 
        'Animations enabled - performance may decrease', 
        config.performance.disableAnimations ? 'success' : 'warning'
      );
    } else {
      // Enable low performance mode
      config.performance.lowPerformanceMode = true;
      
      // Hide non-essential widgets
      const visibleWidgetCount = document.querySelectorAll('.movable-widget[style*="display: flex"]').length;
      if (visibleWidgetCount > 3) {
        const widgets = document.querySelectorAll('.movable-widget');
        let hiddenCount = 0;
        
        widgets.forEach(widget => {
          // Keep only essential widgets visible
          if (!widget.id.match(/tasks|timer|notebook/)) {
            if (widget.style.display === 'flex') {
              widget.style.display = 'none';
              hiddenCount++;
            }
          }
        });
        
        if (hiddenCount > 0) {
          showNotification(`Hid ${hiddenCount} non-essential widgets to improve performance`, 'info');
        }
      }
      
      showNotification('Low performance mode enabled - reduced features but faster response', 'success');
    }
    
    // Update the speed indicator
    updateSpeedIndicator();
    
    // Save performance settings
    savePerformanceSettings();
  }
  
  function savePerformanceSettings() {
    try {
      localStorage.setItem('tm_performance_config', JSON.stringify({
        lowPerformanceMode: config.performance.lowPerformanceMode,
        disableAnimations: config.performance.disableAnimations
      }));
    } catch (e) {
      console.error('Error saving performance settings:', e);
    }
  }
  
  function loadPerformanceSettings() {
    try {
      const savedSettings = JSON.parse(localStorage.getItem('tm_performance_config'));
      if (savedSettings) {
        config.performance.lowPerformanceMode = savedSettings.lowPerformanceMode || false;
        config.performance.disableAnimations = savedSettings.disableAnimations || false;
        
        // Apply settings
        document.body.classList.toggle('no-animations', config.performance.disableAnimations);
      }
    } catch (e) {
      console.error('Error loading performance settings:', e);
    }
  }
  
  function toggleWidgets() {
    state.widgets.visible = !state.widgets.visible;
    
    const widgetElements = document.querySelectorAll('.movable-widget');
    
    if (state.widgets.visible) {
      // If in low performance mode, only show essential widgets
      if (config.performance.lowPerformanceMode) {
        widgetElements.forEach(widget => {
          if (widget.id.match(/tasks|timer|notebook/)) {
            widget.style.display = 'flex';
          }
        });
        showNotification('Essential productivity tools enabled (Low Performance Mode)', 'success');
      } else {
        widgetElements.forEach(widget => {
          widget.style.display = 'flex';
        });
        showNotification('ADHD productivity tools enabled', 'success');
      }
    } else {
      widgetElements.forEach(widget => {
        widget.style.display = 'none';
      });
      showNotification('Tools hidden', 'info');
    }
  }
  
  // Create a widget container with move functionality
  function createWidget(widget) {
    // If lazy loading is enabled and widgets are not visible, don't create the DOM element yet
    if (config.performance.lazyLoadWidgets && !state.widgets.visible && !config.performance.preloadCommonWidgets) {
      // Except for common widgets that should be preloaded
      if (widget.id !== 'tasks-widget' && widget.id !== 'timer-widget' && widget.id !== 'notebook-widget') {
        return { id: widget.id, lazyLoaded: false };
      }
    }
    
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'movable-widget';
    widgetContainer.id = widget.id;
    widgetContainer.style.display = 'none';
    
    // Apply saved position or initial position
    const savedPosition = state.widgets.positions[widget.id] || widget.initialPosition;
    Object.keys(savedPosition).forEach(prop => {
      widgetContainer.style[prop] = savedPosition[prop];
    });
    
    // Set minimum dimensions if specified
    if (widget.minWidth) widgetContainer.style.minWidth = widget.minWidth;
    if (widget.minHeight) widgetContainer.style.minHeight = widget.minHeight;
    
    // Create widget header with drag handle
    const widgetHeader = document.createElement('div');
    widgetHeader.className = 'widget-header';
    widgetHeader.innerHTML = `
      <div class="widget-title">${widget.icon} ${widget.title}</div>
      <div class="widget-controls">
        <button class="widget-control-btn minimize-widget" title="Minimize">_</button>
        <button class="widget-control-btn help-widget" title="Help">?</button>
        <button class="widget-control-btn close-widget" title="Close">×</button>
      </div>
    `;
    
    // Create widget body
    const widgetBody = document.createElement('div');
    widgetBody.className = 'widget-body';
    
    // Add to DOM
    widgetContainer.appendChild(widgetHeader);
    widgetContainer.appendChild(widgetBody);
    document.body.appendChild(widgetContainer);
    
    // Make widget draggable
    makeDraggable(widgetContainer, widgetHeader);
    
    // Add event listeners
    widgetContainer.querySelector('.close-widget').addEventListener('click', () => {
      widgetContainer.style.display = 'none';
    });
    
    widgetContainer.querySelector('.minimize-widget').addEventListener('click', () => {
      if (widgetBody.style.display === 'none') {
        widgetBody.style.display = 'block';
        widgetContainer.style.height = 'auto';
      } else {
        widgetBody.style.display = 'none';
        widgetContainer.style.height = 'auto';
      }
    });
    
    // Render the widget content
    widget.render(widgetBody);
    
    return { id: widget.id, element: widgetContainer, lazyLoaded: true };
  }
  
  // Make an element draggable
  function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
      
      // Add active class
      element.classList.add('dragging');
    }
    
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      
      // Clear any right/bottom positioning that might interfere
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    }
    
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
      
      // Save the position
      saveWidgetPosition(element.id);
      
      // Remove active class
      element.classList.remove('dragging');
    }
  }
  
  function saveWidgetPosition(widgetId) {
    const widget = document.getElementById(widgetId);
    if (!widget) return;
    
    state.widgets.positions[widgetId] = {
      top: widget.style.top,
      left: widget.style.left
    };
    
    saveWidgetPositions();
  }
  
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

  //-------------------------------------------------------------------------------
  // 7. PRODUCTIVITY TOOLS - Task management, pomodoro timer, etc.
  //-------------------------------------------------------------------------------
  
  // Task management functions
  function addTask(taskText) {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setHours(23, 59, 59, 999); // End of today
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      created: today.toISOString(),
      due: dueDate.toISOString(),
      projectId: state.activeProject || 'default'
    };
    
    state.tasks.push(newTask);
    saveTasks();
    renderTasks();
    showNotification('Task added', 'success');
  }
  
  function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      
      if (task.completed) {
        showNotification('Task completed!', 'success');
      }
    }
  }
  
  function deleteTask(taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
    showNotification('Task deleted', 'info');
  }
  
  function clearCompletedTasks() {
    state.tasks = state.tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    showNotification('Completed tasks cleared', 'info');
  }
  
  function renderTasks(filter = 'all') {
    const taskItemsContainer = document.querySelector('.task-items');
    if (!taskItemsContainer) return;
    
    // Filter tasks based on selected filter and project
    let tasksToDisplay = state.activeProject ? 
      state.tasks.filter(t => t.projectId === state.activeProject) : 
      state.tasks;
    
    // Apply additional filter (all, today, overdue)
    if (filter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      tasksToDisplay = tasksToDisplay.filter(task => {
        const dueDate = new Date(task.due);
        return dueDate >= today && dueDate < tomorrow;
      });
    } else if (filter === 'overdue') {
      const now = new Date();
      tasksToDisplay = tasksToDisplay.filter(task => {
        return new Date(task.due) < now && !task.completed;
      });
    }
    
    // Sort by due date, then by creation date
    tasksToDisplay.sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by due date
      const dueDateA = new Date(a.due);
      const dueDateB = new Date(b.due);
      if (dueDateA.getTime() !== dueDateB.getTime()) {
        return dueDateA - dueDateB;
      }
      
      // Finally sort by creation date
      return new Date(a.created) - new Date(b.created);
    });
    
    taskItemsContainer.innerHTML = '';
    
    if (tasksToDisplay.length === 0) {
      taskItemsContainer.innerHTML = '<div style="text-align: center; padding: 10px; color: #888;">No tasks to display</div>';
      return;
    }
    
    tasksToDisplay.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      // Format date for display
      const dueDate = new Date(task.due);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      let dateDisplay = '';
      if (dueDate < today && !task.completed) {
        dateDisplay = `<span style="color: #f44336;">Overdue</span>`;
      } else if (dueDate >= today && dueDate < tomorrow) {
        dateDisplay = 'Today';
      } else {
        dateDisplay = dueDate.toLocaleDateString();
      }
      
      taskItem.innerHTML = `
        <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
        <div class="task-date">${dateDisplay}</div>
        <div class="task-delete">×</div>
      `;
      
      taskItem.querySelector('.task-check').addEventListener('change', () => toggleTaskCompletion(task.id));
      taskItem.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));
      
      taskItemsContainer.appendChild(taskItem);
    });
  }
  
  function filterTasks(filter) {
    renderTasks(filter);
    const taskListTitle = document.querySelector('.task-list-title');
    if (taskListTitle) {
      taskListTitle.textContent = filter === 'all' ? 'All Tasks' : 
                                 filter === 'today' ? 'Today\'s Tasks' : 
                                 'Overdue Tasks';
    }
  }
  
  // Timer functions
  function toggleTimer() {
    const startBtn = document.querySelector('.start-btn');
    
    if (state.timer.running) {
      clearInterval(state.timer.interval);
      startBtn.textContent = 'Start';
      state.timer.running = false;
      showNotification('Timer paused', 'warning');
    } else {
      state.timer.interval = setInterval(updateTimer, 1000);
      startBtn.textContent = 'Pause';
      state.timer.running = true;
      showNotification('Timer started', 'success');
    }
  }
  
  function updateTimer() {
    if (state.timer.value > 0) {
      state.timer.value--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timer.interval);
      document.querySelector('.start-btn').textContent = 'Start';
      state.timer.running = false;
      showNotification('Timer complete! Take a break.', 'success');
      
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vm//8Lbv//9kzNvwlYAAkDeCBlkQBNkwmkkhkiCAgCv//+//Nf//AaEheaADQCOkG+ChARkwmkkhkiCAgKsAAADs=');
      audio.play();
    }
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timer.value / 60);
    const seconds = state.timer.value % 60;
    const display = document.querySelector('.timer-display');
    if (display) {
      display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
  
  function resetTimer() {
    clearInterval(state.timer.interval);
    state.timer.value = 25 * 60; // Reset to 25 minutes
    state.timer.running = false;
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) startBtn.textContent = 'Start';
    updateTimerDisplay();
    showNotification('Timer reset to 25:00', 'info');
  }
  
  function setCustomTimer() {
    const customTime = prompt('Enter time in minutes (1-60):', '25');
    if (customTime !== null) {
      const time = parseInt(customTime);
      if (!isNaN(time) && time > 0 && time <= 60) {
        clearInterval(state.timer.interval);
        state.timer.value = time * 60;
        state.timer.running = false;
        const startBtn = document.querySelector('.start-btn');
        if (startBtn) startBtn.textContent = 'Start';
        updateTimerDisplay();
        showNotification(`Timer set to ${time}:00`, 'success');
      } else {
        showNotification('Please enter a valid time between 1-60 minutes', 'error');
      }
    }
  }
  
  // Project management functions
  function addNewProject() {
    const projectName = prompt('Enter new project name:');
    if (projectName && projectName.trim()) {
      const newProject = {
        id: 'proj_' + Date.now(),
        name: projectName.trim(),
        folders: [],
        color: getRandomColor()
      };
      
      state.projects.push(newProject);
      saveProjects();
      renderProjects();
      showNotification(`Project "${projectName}" created`, 'success');
    }
  }
  
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
  
  //-------------------------------------------------------------------------------
  // 8. WIDGET RENDERERS - UI components for each widget
  //-------------------------------------------------------------------------------
  
  // Render tasks widget
  function renderTasksWidget(container) {
    container.innerHTML = `
      <div class="task-list-header">
        <div class="task-list-title">Today's Tasks</div>
        <div class="task-list-actions">
          <button class="widget-button clear-done-btn">Clear Done</button>
        </div>
      </div>
      <div class="task-items"></div>
      <input type="text" class="add-task-input" placeholder="Add a new task + Enter">
      <div class="widget-buttons">
        <button class="widget-button show-all-btn">All Tasks</button>
        <button class="widget-button show-today-btn">Today</button>
        <button class="widget-button show-overdue-btn">Overdue</button>
      </div>
    `;
    
    // Add event listeners
    container.querySelector('.add-task-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        addTask(this.value.trim());
        this.value = '';
      }
    });
    
    container.querySelector('.clear-done-btn').addEventListener('click', clearCompletedTasks);
    container.querySelector('.show-all-btn').addEventListener('click', () => filterTasks('all'));
    container.querySelector('.show-today-btn').addEventListener('click', () => filterTasks('today'));
    container.querySelector('.show-overdue-btn').addEventListener('click', () => filterTasks('overdue'));
    
    // Render initial tasks
    renderTasks();
  }
  
  // Render timer widget
  function renderTimerWidget(container) {
    container.innerHTML = `
      <div class="timer-display">25:00</div>
      <div class="timer-controls">
        <button class="widget-button start-btn">Start</button>
        <button class="widget-button reset-btn">Reset</button>
        <button class="widget-button custom-btn">Custom</button>
      </div>
      <div style="margin-top: 10px; font-size: 12px; text-align: center; color: #888;">
        🍅 Pomodoro Technique: 25 min work, 5 min break
      </div>
    `;
    
    // Add event listeners
    container.querySelector('.start-btn').addEventListener('click', toggleTimer);
    container.querySelector('.reset-btn').addEventListener('click', resetTimer);
    container.querySelector('.custom-btn').addEventListener('click', setCustomTimer);
    
    // Initialize timer display
    updateTimerDisplay();
  }
  
  // Render notebook widget
  function renderNotebookWidget(container) {
    container.innerHTML = `
      <div class="notebook-controls">
        <select class="notebook-selector">
          <option value="default">General Notes</option>
          <option value="new">+ New Notebook</option>
        </select>
        <div class="notebook-actions">
          <button class="widget-button export-notes-btn">Export</button>
          <button class="widget-button save-btn">Save</button>
        </div>
      </div>
      <div class="notebook-editor">
        <div class="editor-toolbar">
          <button data-format="bold" title="Bold">B</button>
          <button data-format="italic" title="Italic">I</button>
          <button data-format="heading" title="Heading">H</button>
          <button data-format="list" title="Bullet List">•</button>
          <button data-format="image" title="Insert Image">🖼️</button>
          <button data-format="color" title="Text Color">🎨</button>
        </div>
        <div class="editor-content" contenteditable="true"></div>
      </div>
      <div class="notebook-status">Last saved: Never</div>
    `;
    
    // Initialize notebook functionality
    initializeNotebook(container);
  }
  
  // Render multi-chat widget
  function renderMultiChatWidget(container) {
    container.innerHTML = `
      <div class="multi-chat-tabs"></div>
      <div class="widget-buttons">
        <button class="widget-button new-chat-btn">New Chat</button>
        <button class="widget-button rename-chat-btn">Rename Current</button>
        <button class="widget-button save-chats-btn">Save All Chats</button>
      </div>
    `;
    
    // Initialize multi-chat functionality here
  }
  
  // Render project widget
  function renderProjectWidget(container) {
    container.innerHTML = `
      <div class="project-folders-header">
        <div class="task-list-title">Project Folders</div>
        <div class="task-list-actions">
          <button class="widget-button add-project-btn">Add Project</button>
        </div>
      </div>
      <div class="project-folders-list"></div>
    `;
    
    // Add event listeners
    container.querySelector('.add-project-btn').addEventListener('click', addNewProject);
    
    // Render projects
    renderProjects();
  }
  
  // Render theme widget
  function renderThemeWidget(container) {
    container.innerHTML = `
      <div style="margin-bottom: 15px;">
        <div style="margin-bottom: 5px; font-weight: bold;">Color Theme</div>
        <div class="theme-options">
          <div class="theme-option ${state.theme === 'theme-teal' ? 'active' : ''}" data-theme="theme-teal" style="background: linear-gradient(135deg, #3a9ea5, #c5f0f5);"></div>
          <div class="theme-option ${state.theme === 'theme-purple' ? 'active' : ''}" data-theme="theme-purple" style="background: linear-gradient(135deg, #9b5de5, #f3e7ff);"></div>
          <div class="theme-option ${state.theme === 'theme-orange' ? 'active' : ''}" data-theme="theme-orange" style="background: linear-gradient(135deg, #f8961e, #fff1e0);"></div>
          <div class="theme-option ${state.theme === 'theme-green' ? 'active' : ''}" data-theme="theme-green" style="background: linear-gradient(135deg, #06d6a0, #e0fff7);"></div>
          <div class="theme-option ${state.theme === 'theme-pink' ? 'active' : ''}" data-theme="theme-pink" style="background: linear-gradient(135deg, #f15bb5, #ffe5f4);"></div>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
          <input type="checkbox" id="pattern-bg-toggle" ${state.patternBackground ? 'checked' : ''}>
          Show Background Pattern
        </label>
      </div>
      
      <div style="margin-bottom: 15px;">
        <div style="margin-bottom: 5px; font-weight: bold;">Font Size</div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="range" min="0.8" max="1.2" step="0.05" value="1.0" id="font-scale-slider">
          <span id="font-scale-value">100%</span>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <button class="widget-button toggle-focus-btn">
          ${state.focusMode ? 'Disable' : 'Enable'} Focus Mode
        </button>
      </div>
      
      <div style="margin-top: 10px; font-size: 12px; color: #888;">
        These settings help reduce visual fatigue and improve focus for ADHD/dyslexic users.
      </div>
    `;
    
    // Add theme selection event listeners
    const themeOptions = container.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        changeTheme(theme);
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
    
    // Add background pattern toggle
    const patternToggle = container.querySelector('#pattern-bg-toggle');
    patternToggle.addEventListener('change', function() {
      toggleBackgroundPattern(this.checked);
    });
    
    // Add font scale slider
    const fontScaleSlider = container.querySelector('#font-scale-slider');
    fontScaleSlider.addEventListener('input', function() {
      const scale = parseFloat(this.value);
      updateFontScale(scale);
      container.querySelector('#font-scale-value').textContent = `${Math.round(scale * 100)}%`;
    });
    
    // Add focus mode toggle
    container.querySelector('.toggle-focus-btn').addEventListener('click', toggleFocusMode);
  }
  
  //-------------------------------------------------------------------------------
  // 9. HELPER FUNCTIONS - Additional support functions
  //-------------------------------------------------------------------------------
  
  // Helper function to change themes
  function changeTheme(theme) {
    // Remove existing theme class
    document.body.classList.remove('theme-teal', 'theme-purple', 'theme-orange', 'theme-green', 'theme-pink');
    
    // Add new theme class
    document.body.classList.add(theme);
    
    // Save theme preference
    state.theme = theme;
    saveTheme(theme);
    
    showNotification(`${theme.replace('theme-', '').charAt(0).toUpperCase() + theme.replace('theme-', '').slice(1)} theme applied`, 'success');
  }
  
  // Toggle background pattern
  function toggleBackgroundPattern(enabled) {
    document.body.classList.toggle('pattern-bg', enabled);
    
    // Save preference
    state.patternBackground = enabled;
    savePatternSetting(enabled);
    
    showNotification(`Background pattern ${enabled ? 'enabled' : 'disabled'}`, 'info');
  }
  
  // Update font scaling
  function updateFontScale(scale) {
    document.documentElement.style.setProperty('--font-scale', scale);
    
    // Save preference
    config.appearance.fontScale = scale;
    localStorage.setItem('tm_font_scale', scale);
    
    // Apply to all text elements
    document.querySelectorAll('body, input, textarea, button, div, span, p, h1, h2, h3, h4, h5, h6').forEach(el => {
      el.style.fontSize = `calc(${el.style.fontSize || '1rem'} * ${scale})`;
    });
  }
  
  // Toggle focus mode
  function toggleFocusMode() {
    state.focusMode = !state.focusMode;
    document.body.classList.toggle('focus-mode', state.focusMode);
    
    // Save preference
    localStorage.setItem('tm_focus_mode', state.focusMode.toString());
    
    showNotification(`Focus mode ${state.focusMode ? 'enabled' : 'disabled'}`, 'info');
    
    // Update button text
    const focusBtn = document.querySelector('.toggle-focus-btn');
    if (focusBtn) {
      focusBtn.textContent = state.focusMode ? 'Disable Focus Mode' : 'Enable Focus Mode';
    }
  }
  
  function renderProjects() {
    const projectsList = document.querySelector('.project-folders-list');
    if (!projectsList) return;
    
    projectsList.innerHTML = '';
    
    state.projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = `project-folder ${project.id === state.activeProject ? 'active' : ''}`;
      projectItem.dataset.id = project.id;
      
      // Create project color indicator
      const colorDot = project.color ? 
        `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${project.color}; margin-right: 5px;"></span>` : 
        '';
      
      projectItem.innerHTML = `
        <div class="project-name">${colorDot}${project.name}</div>
        <div class="project-actions" style="float: right;">
          <span class="add-folder" style="margin-right: 5px; cursor: pointer;">📁+</span>
          ${project.id !== 'default' ? '<span class="delete-project" style="cursor: pointer;">🗑️</span>' : ''}
        </div>
      `;
      
      projectItem.addEventListener('click', (e) => {
        if (!e.target.matches('.add-folder') && !e.target.matches('.delete-project')) {
          selectProject(project.id);
        }
      });
      
      if (projectItem.querySelector('.add-folder')) {
        projectItem.querySelector('.add-folder').addEventListener('click', () => addSubfolder(project.id));
      }
      
      if (projectItem.querySelector('.delete-project')) {
        projectItem.querySelector('.delete-project').addEventListener('click', () => deleteProject(project.id));
      }
      
      projectsList.appendChild(projectItem);
      
      // Add subfolders if any
      if (project.folders && project.folders.length > 0) {
        project.folders.forEach(folder => {
          const folderItem = document.createElement('div');
          folderItem.className = 'project-folder subfolder';
          folderItem.dataset.id = folder.id;
          folderItem.dataset.parentId = project.id;
          folderItem.innerHTML = `
            <div class="folder-name">📁 ${folder.name}</div>
            <div class="folder-actions" style="float: right;">
              <span class="delete-folder" style="cursor: pointer;">🗑️</span>
            </div>
          `;
          
          folderItem.addEventListener('click', (e) => {
            if (!e.target.matches('.delete-folder')) {
              selectProject(project.id, folder.id);
            }
          });
          
          if (folderItem.querySelector('.delete-folder')) {
            folderItem.querySelector('.delete-folder').addEventListener('click', () => deleteFolder(project.id, folder.id));
          }
          
          projectsList.appendChild(folderItem);
        });
      }
    });
  }
  
  function selectProject(projectId, folderId = null) {
    state.activeProject = projectId;
    
    // Update UI to show active project
    const projectItems = document.querySelectorAll('.project-folder');
    projectItems.forEach(item => {
      if (item.dataset.id === projectId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update task list title
    const project = state.projects.find(p => p.id === projectId);
    if (project) {
      const taskListTitle = document.querySelector('.task-list-title');
      if (taskListTitle) {
        taskListTitle.textContent = `Tasks: ${project.name}`;
      }
    }
    
    // Render tasks for this project
    renderTasks();
    
    showNotification(`Switched to ${project ? project.name : 'Default Project'}`, 'info');
  }
  
  function addSubfolder(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const folderName = prompt(`Enter new folder name for ${project.name}:`);
    if (folderName && folderName.trim()) {
      const newFolder = {
        id: 'folder_' + Date.now(),
        name: folderName.trim()
      };
      
      project.folders.push(newFolder);
      saveProjects();
      renderProjects();
      showNotification(`Folder "${folderName}" created`, 'success');
    }
  }
  
  function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project and all its tasks?')) {
      // Remove project
      state.projects = state.projects.filter(p => p.id !== projectId);
      
      // Remove associated tasks
      state.tasks = state.tasks.filter(t => t.projectId !== projectId);
      
      // Reset active project if deleted
      if (state.activeProject === projectId) {
        state.activeProject = 'default';
      }
      
      saveProjects();
      saveTasks();
      renderProjects();
      renderTasks();
      
      showNotification('Project deleted', 'info');
    }
  }
  
  function deleteFolder(projectId, folderId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    if (confirm('Are you sure you want to delete this folder?')) {
      project.folders = project.folders.filter(f => f.id !== folderId);
      saveProjects();
      renderProjects();
      showNotification('Folder deleted', 'info');
    }
  }
  
  function initializeNotebook(container) {
    // Populate notebook selector
    const notebookSelector = container.querySelector('.notebook-selector');
    if (!notebookSelector) return;
    
    notebookSelector.innerHTML = '';
    
    // Add existing notebooks
    state.notebooks.forEach(notebook => {
      const option = document.createElement('option');
      option.value = notebook.id;
      option.textContent = notebook.name;
      notebookSelector.appendChild(option);
    });
    
    // Add "New Notebook" option
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ New Notebook';
    notebookSelector.appendChild(newOption);
    
    // Set the active notebook
    notebookSelector.value = state.activeNotebook;
    
    // Load content
    const activeNotebook = state.notebooks.find(n => n.id === state.activeNotebook);
    if (activeNotebook) {
      const editorContent = container.querySelector('.editor-content');
      if (editorContent) {
        editorContent.innerHTML = activeNotebook.content;
      }
      
      // Update last saved info
      const lastSaved = new Date(activeNotebook.modified);
      const statusElement = container.querySelector('.notebook-status');
      if (statusElement) {
        statusElement.textContent = `Last saved: ${lastSaved.toLocaleString()}`;
      }
    }
    
    // Add event listeners
    notebookSelector.addEventListener('change', function() {
      if (this.value === 'new') {
        // Create new notebook
        const notebookName = prompt('Enter name for new notebook:');
        if (notebookName && notebookName.trim()) {
          createNewNotebook(notebookName.trim());
          this.value = state.activeNotebook; // Set to newly created notebook
        } else {
          this.value = state.activeNotebook; // Revert to previous selection
        }
      } else {
        // Check for unsaved changes
        if (state.unsavedChanges) {
          if (confirm('You have unsaved changes. Save before switching notebooks?')) {
            saveCurrentNotebook();
          }
        }
        
        // Switch to selected notebook
        state.activeNotebook = this.value;
        loadNotebook(state.activeNotebook, container);
      }
    });
    
    // Editor content change
    const editorContent = container.querySelector('.editor-content');
    if (editorContent) {
      editorContent.addEventListener('input', function() {
        state.unsavedChanges = true;
        const statusElement = container.querySelector('.notebook-status');
        if (statusElement) {
          statusElement.textContent = 'Unsaved changes';
        }
      });
    }
    
    // Format buttons
    const formatButtons = container.querySelectorAll('.editor-toolbar button');
    formatButtons.forEach(button => {
      button.addEventListener('click', function() {
        const format = this.dataset.format;
        formatText(format);
      });
    });
    
    // Export and save buttons
    const exportBtn = container.querySelector('.export-notes-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => exportNotebook(container));
    }
    
    const saveBtn = container.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => saveCurrentNotebook(container));
    }
  }
  
  function loadNotebook(notebookId, container) {
    const notebook = state.notebooks.find(n => n.id === notebookId);
    if (!notebook || !container) return;
    
    const editorContent = container.querySelector('.editor-content');
    if (editorContent) {
      editorContent.innerHTML = notebook.content;
    }
    
    // Update last saved info
    const lastSaved = new Date(notebook.modified);
    const statusElement = container.querySelector('.notebook-status');
    if (statusElement) {
      statusElement.textContent = `Last saved: ${lastSaved.toLocaleString()}`;
    }
    
    state.unsavedChanges = false;
  }
  
  function createNewNotebook(name) {
    const newNotebook = {
      id: 'notebook_' + Date.now(),
      name: name,
      content: '<p>Start typing your notes here...</p>',
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };
    
    state.notebooks.push(newNotebook);
    state.activeNotebook = newNotebook.id;
    saveNotebooks();
    
    showNotification(`New notebook "${name}" created`, 'success');
    
    // Refresh notebook widgets
    document.querySelectorAll('#notebook-widget .widget-body').forEach(container => {
      initializeNotebook(container);
    });
  }
  
  function saveCurrentNotebook(container) {
    const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
    if (!notebook || !container) return;
    
    const editorContent = container.querySelector('.editor-content');
    if (editorContent) {
      notebook.content = editorContent.innerHTML;
      notebook.modified = new Date().toISOString();
    }
    
    saveNotebooks();
    
    // Update last saved info
    const lastSaved = new Date(notebook.modified);
    const statusElement = container.querySelector('.notebook-status');
    if (statusElement) {
      statusElement.textContent = `Last saved: ${lastSaved.toLocaleString()}`;
    }
    
    state.unsavedChanges = false;
    showNotification('Notebook saved', 'success');
  }
  
  function formatText(format) {
    if (!document.execCommand) {
      showNotification('Text formatting not supported in your browser', 'error');
      return;
    }
    
    switch(format) {
      case 'bold':
        document.execCommand('bold', false, null);
        break;
      case 'italic':
        document.execCommand('italic', false, null);
        break;
      case 'heading':
        document.execCommand('formatBlock', false, '<h3>');
        break;
      case 'list':
        document.execCommand('insertUnorderedList', false, null);
        break;
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          document.execCommand('insertHTML', false, `<img src="${imageUrl}" style="max-width: 100%;">`);
        }
        break;
      case 'color':
        const color = prompt('Enter color (name or hex):');
        if (color) {
          document.execCommand('foreColor', false, color);
        }
        break;
    }
    
    // Mark as unsaved
    state.unsavedChanges = true;
    const notebookWidget = document.getElementById('notebook-widget');
    if (notebookWidget) {
      const statusElement = notebookWidget.querySelector('.notebook-status');
      if (statusElement) {
        statusElement.textContent = 'Unsaved changes';
      }
    }
  }
  
  function exportNotebook(container) {
    const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
    if (!notebook) return;
    
    // Save any unsaved changes
    if (state.unsavedChanges) {
      saveCurrentNotebook(container);
    }
    
    // Offer export options
    const exportFormat = prompt('Choose export format (pdf, html, markdown, text):', 'html');
    if (!exportFormat) return;
    
    switch (exportFormat.toLowerCase()) {
      case 'html':
        // Create a download link for HTML content
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>${notebook.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              img { max-width: 100%; }
            </style>
          </head>
          <body>
            <h1>${notebook.name}</h1>
            <div>${notebook.content}</div>
          </body>
          </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${notebook.name.replace(/\s+/g, '_')}.html`;
        a.click();
        
        URL.revokeObjectURL(url);
        showNotification('HTML export created', 'success');
        break;
      case 'pdf':
      case 'markdown':
      case 'text':
        showNotification(`${exportFormat.toUpperCase()} export would be generated here`, 'info');
        break;
      default:
        showNotification('Unsupported export format', 'error');
    }
  }
  
  //-------------------------------------------------------------------------------
  // 10. INTEGRATION FUNCTIONS - Connect with third-party services
  //-------------------------------------------------------------------------------
  
  // Simulate Google Drive authentication
  function authenticateGoogleDrive() {
    // In a real implementation, this would use OAuth
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
  
  // Simulate Notion authentication
  function authenticateNotion() {
    // In a real implementation, this would use OAuth
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
  
  // Disconnect Google Drive
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
  
  // Disconnect Notion
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
  
  // Render integrations widget
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
  
  function saveToNotion() {
    if (!state.notionEnabled) {
      showNotification('Please connect Notion first', 'warning');
      return;
    }
    
    showNotification('Saving to Notion...', 'info');
    
    // In a real implementation, this would use the Notion API
    // For demonstration, we'll simulate it
    
    setTimeout(() => {
      showNotification('Content saved to Notion', 'success');
    }, 1500);
  }
  
  //-------------------------------------------------------------------------------
  // 11. INITIALIZATION - Set up the extension when it loads
  //-------------------------------------------------------------------------------
  
  // Initialize the extension
  function initialize() {
    // Start timing for performance metrics
    const startTime = performance.now();
    
    // Apply saved theme
    document.body.classList.add(state.theme);
    
    // Apply saved background pattern setting
    if (state.patternBackground) {
      document.body.classList.add('pattern-bg');
    }
    
    // Create UI elements
    createControlPanel();
    createSpeedIndicator();
    
    // Create widgets
    widgets.forEach(widget => {
      if (config.performance.preloadCommonWidgets) {
        createWidget(widget);
      }
    });
    
    // Load performance settings
    loadPerformanceSettings();
    
    // Track performance
    const endTime = performance.now();
    state.performance.loadTime = endTime - startTime;
    
    // Log initialization
    if (config.debug) {
      console.log('TypingMind ADHD/Dyslexia Extension initialized');
      console.log('Load time:', state.performance.loadTime.toFixed(2) + 'ms');
    }
    
    // Start monitoring typing speed (for performance optimization)
    monitorTypingPerformance();
  }
  
  // Monitor typing performance
  function monitorTypingPerformance() {
    // Measure response time between user input and AI response
    const messageContainer = document.querySelector('.messages-container') || document.body;
    
    if (messageContainer) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.addedNodes.length > 0) {
            const addedNode = mutation.addedNodes[0];
            if (addedNode.classList && addedNode.classList.contains('ai')) {
              // AI response detected, record the time
              const responseTime = performance.now() - lastUserActionTime;
              state.performance.responseTime.push(responseTime);
              
              // Keep only the last 10 measurements
              if (state.performance.responseTime.length > 10) {
                state.performance.responseTime.shift();
              }
              
              // Update the speed indicator
              updateSpeedIndicator();
              
              if (config.debug) {
                console.log('Response time:', responseTime.toFixed(2) + 'ms');
              }
            }
          }
        });
      });
      
      observer.observe(messageContainer, { childList: true, subtree: true });
    }
    
    // Track user input actions
    let lastUserActionTime = performance.now();
    document.addEventListener('keydown', () => {
      lastUserActionTime = performance.now();
    });
    
    document.addEventListener('click', () => {
      lastUserActionTime = performance.now();
    });
  }
  
  // Call the initialization function
  initialize();
})();
