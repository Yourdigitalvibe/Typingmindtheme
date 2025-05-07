// ==================================================
// styles.css
// ==================================================
/**
 * TypingMind ADHD/Dyslexia Extension
 * Styles for improved readability and visual focus
 */

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

/* ==================================================
// widgets.js
// ==================================================
/**
 * TypingMind ADHD/Dyslexia Extension
 * Widget definitions and framework
 */

// Widget definitions - all widgets that can be shown/hidden/moved
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

// ==================================================
// main.js
// ==================================================
/**
 * TypingMind ADHD/Dyslexia Extension
 * Core functionality and initialization
 */

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
  // 2. STATE MANAGEMENT - Keep track of tasks, settings, and other data
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
  // 3. HELPER FUNCTIONS - Utility and storage functions
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

  // Show notification function
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
  // 4. UI ELEMENTS - Create the main UI components
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
  
  //-------------------------------------------------------------------------------
  // 5. PERFORMANCE OPTIMIZATION
  //-------------------------------------------------------------------------------
  
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
  
  //-------------------------------------------------------------------------------
  // 6. VISUAL CUSTOMIZATION FUNCTIONS
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

  //-------------------------------------------------------------------------------
  // 7. INITIALIZATION
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
