// TypingMind ADHD-Friendly Productivity Extension
// This extension enhances TypingMind with features for time management,
// project organization, focus tools, and visual stimulation control

(function() {
  // Create a style element for our custom CSS
  const styleElement = document.createElement('style');
  
  // Define our custom styles - ADHD-friendly with teal theme
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
    
    /* Apply a teal-focused color scheme */
    :root {
      --primary-color: #ff7e5f;
      --secondary-color: #feb47b;
      --accent-color: #3a9ea5;
      --teal-light: #c5f0f5;
      --teal-border: #2c7d82;
      --background-color: #f0f8fa;
      --text-color: #333333;
      --light-accent: #e6f7ff;
      --focus-color: #FF6B6B;
      --success-color: #4CAF50;
      --warning-color: #FFC107;
    }
    
    /* Main content area */
    body > div:first-child {
      background-color: var(--background-color) !important;
    }
    
    /* Add a subtle teal pattern to the background */
    body:after {
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
    
    /* Project folder styling */
    .project-tag {
      display: inline-block !important;
      padding: 2px 8px !important;
      border-radius: 12px !important;
      font-size: 12px !important;
      margin-right: 5px !important;
      color: white !important;
      background-color: var(--accent-color) !important;
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
    
    /* Timer styling */
    .productivity-timer {
      position: fixed !important;
      top: 60px !important;
      right: 15px !important;
      background-color: white !important;
      border: 2px solid var(--accent-color) !important;
      border-radius: 12px !important;
      padding: 10px !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      z-index: 1000 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      user-select: none !important;
    }
    
    .timer-display {
      font-size: 24px !important;
      font-weight: bold !important;
      margin: 5px 0 !important;
      color: var(--accent-color) !important;
    }
    
    .timer-controls {
      display: flex !important;
      gap: 5px !important;
      margin-top: 5px !important;
    }
    
    .timer-btn {
      background-color: var(--accent-color) !important;
      color: white !important;
      border: none !important;
      border-radius: 5px !important;
      padding: 5px 10px !important;
      cursor: pointer !important;
      font-size: 12px !important;
    }
    
    .timer-btn:hover {
      background-color: var(--teal-border) !important;
    }
    
    /* Task list styling */
    .task-list-container {
      position: fixed !important;
      top: 170px !important;
      right: 15px !important;
      width: 250px !important;
      background-color: white !important;
      border: 2px solid var(--accent-color) !important;
      border-radius: 12px !important;
      padding: 10px !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      z-index: 1000 !important;
      max-height: 400px !important;
      overflow-y: auto !important;
    }
    
    .task-list-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px solid #eee !important;
      padding-bottom: 8px !important;
      margin-bottom: 8px !important;
    }
    
    .task-list-title {
      font-weight: bold !important;
      color: var(--accent-color) !important;
    }
    
    .task-item {
      display: flex !important;
      align-items: center !important;
      margin-bottom: 8px !important;
      padding: 5px !important;
      border-radius: 5px !important;
      transition: background-color 0.2s !important;
    }
    
    .task-item:hover {
      background-color: var(--teal-light) !important;
    }
    
    .task-check {
      margin-right: 8px !important;
    }
    
    .task-text {
      flex-grow: 1 !important;
    }
    
    .task-text.completed {
      text-decoration: line-through !important;
      color: #888 !important;
    }
    
    .task-delete {
      color: #f44336 !important;
      cursor: pointer !important;
      opacity: 0.5 !important;
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
    
    /* Project folders panel */
    .project-folders-panel {
      position: fixed !important;
      left: 15px !important;
      top: 60px !important;
      width: 250px !important;
      background-color: white !important;
      border: 2px solid var(--accent-color) !important;
      border-radius: 12px !important;
      padding: 10px !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      z-index: 1000 !important;
      max-height: 500px !important;
      overflow-y: auto !important;
      display: none;
    }
    
    .project-folders-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      border-bottom: 1px solid #eee !important;
      padding-bottom: 8px !important;
      margin-bottom: 8px !important;
    }
    
    .project-folder {
      padding: 8px !important;
      margin-bottom: 5px !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      transition: background-color 0.2s !important;
    }
    
    .project-folder:hover {
      background-color: var(--teal-light) !important;
    }
    
    .project-folder.active {
      background-color: var(--teal-light) !important;
      border-left: 3px solid var(--accent-color) !important;
    }
    
    .subfolder {
      margin-left: 15px !important;
      font-size: 90% !important;
      border-left: 1px solid #ddd !important;
      padding-left: 10px !important;
    }
    
    /* Toggle button for productivity tools */
    .productivity-tools-toggle {
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
    
    .productivity-tools-toggle:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
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
    
    /* Quick prompt templates */
    .prompt-templates-panel {
      position: fixed !important;
      bottom: 80px !important;
      left: 15px !important;
      width: 250px !important;
      background-color: white !important;
      border: 2px solid var(--accent-color) !important;
      border-radius: 12px !important;
      padding: 10px !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      z-index: 1000 !important;
      max-height: 300px !important;
      overflow-y: auto !important;
      display: none;
    }
    
    .prompt-template {
      padding: 8px !important;
      margin-bottom: 5px !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      transition: background-color 0.2s !important;
    }
    
    .prompt-template:hover {
      background-color: var(--teal-light) !important;
    }
    
    /* Focus indicator */
    .focus-indicator {
      position: fixed !important;
      bottom: 15px !important;
      left: 15px !important;
      width: 50px !important;
      height: 50px !important;
      background-color: var(--focus-color) !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: white !important;
      font-weight: bold !important;
      cursor: pointer !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
      z-index: 1001 !important;
      transition: all 0.3s ease !important;
    }
    
    .focus-indicator.active {
      background-color: var(--success-color) !important;
    }
    
    .focus-indicator:hover {
      transform: scale(1.1) !important;
    }
  `;
  
  // Add our styles to the page
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
  
  // State for our productivity tools
  let state = {
    toolsVisible: false,
    timerRunning: false,
    timerValue: 25 * 60, // 25 minutes in seconds (pomodoro)
    timerInterval: null,
    focusModeActive: false,
    tasks: loadTasks(),
    projects: loadProjects(),
    activeProject: null,
    customPrompts: loadCustomPrompts()
  };
  
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
        { id: 'default3', name: 'Action Steps', prompt: 'What are the next 3 action steps I should take for:' }
      ];
    } catch (e) {
      console.error('Error loading custom prompts:', e);
      return [
        { id: 'default1', name: 'Summarize Text', prompt: 'Please summarize the following text in 3 bullet points:' },
        { id: 'default2', name: 'Creative Ideas', prompt: 'Generate 5 creative ideas for:' },
        { id: 'default3', name: 'Action Steps', prompt: 'What are the next 3 action steps I should take for:' }
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
  
  // Create UI Elements
  function createProductivityToolsToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'productivity-tools-toggle';
    toggleButton.innerHTML = '🛠️ Productivity Tools';
    toggleButton.addEventListener('click', toggleProductivityTools);
    document.body.appendChild(toggleButton);
  }
  
  function createTimer() {
    const timerContainer = document.createElement('div');
    timerContainer.className = 'productivity-timer';
    timerContainer.style.display = 'none';
    
    timerContainer.innerHTML = `
      <div class="timer-title">Pomodoro Timer</div>
      <div class="timer-display">25:00</div>
      <div class="timer-controls">
        <button class="timer-btn start-btn">Start</button>
        <button class="timer-btn reset-btn">Reset</button>
        <button class="timer-btn custom-btn">Custom</button>
      </div>
    `;
    
    document.body.appendChild(timerContainer);
    
    // Add event listeners
    timerContainer.querySelector('.start-btn').addEventListener('click', toggleTimer);
    timerContainer.querySelector('.reset-btn').addEventListener('click', resetTimer);
    timerContainer.querySelector('.custom-btn').addEventListener('click', setCustomTimer);
  }
  
  function createTaskList() {
    const taskListContainer = document.createElement('div');
    taskListContainer.className = 'task-list-container';
    taskListContainer.style.display = 'none';
    
    taskListContainer.innerHTML = `
      <div class="task-list-header">
        <div class="task-list-title">Today's Tasks</div>
        <div class="task-list-actions">
          <button class="timer-btn clear-done-btn">Clear Done</button>
        </div>
      </div>
      <div class="task-items"></div>
      <input type="text" class="add-task-input" placeholder="Add a new task + Enter">
    `;
    
    document.body.appendChild(taskListContainer);
    
    // Add event listeners
    taskListContainer.querySelector('.add-task-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && this.value.trim()) {
        addTask(this.value.trim());
        this.value = '';
      }
    });
    
    taskListContainer.querySelector('.clear-done-btn').addEventListener('click', clearCompletedTasks);
    
    // Render initial tasks
    renderTasks();
  }
  
  function createProjectFoldersPanel() {
    const projectPanel = document.createElement('div');
    projectPanel.className = 'project-folders-panel';
    projectPanel.style.display = 'none';
    
    projectPanel.innerHTML = `
      <div class="project-folders-header">
        <div class="task-list-title">Project Folders</div>
        <div class="task-list-actions">
          <button class="timer-btn add-project-btn">Add</button>
        </div>
      </div>
      <div class="project-folders-list"></div>
    `;
    
    document.body.appendChild(projectPanel);
    
    // Add event listeners
    projectPanel.querySelector('.add-project-btn').addEventListener('click', addNewProject);
    
    // Render initial projects
    renderProjects();
  }
  
  function createPromptTemplatesPanel() {
    const promptPanel = document.createElement('div');
    promptPanel.className = 'prompt-templates-panel';
    promptPanel.style.display = 'none';
    
    promptPanel.innerHTML = `
      <div class="project-folders-header">
        <div class="task-list-title">Quick Prompts</div>
        <div class="task-list-actions">
          <button class="timer-btn add-prompt-btn">Add</button>
        </div>
      </div>
      <div class="prompt-templates-list"></div>
    `;
    
    document.body.appendChild(promptPanel);
    
    // Add event listeners
    promptPanel.querySelector('.add-prompt-btn').addEventListener('click', addNewPromptTemplate);
    
    // Render initial prompts
    renderPromptTemplates();
  }
  
  function createFocusIndicator() {
    const focusButton = document.createElement('div');
    focusButton.className = 'focus-indicator';
    focusButton.textContent = '👁️';
    focusButton.title = 'Toggle Focus Mode';
    
    focusButton.addEventListener('click', toggleFocusMode);
    document.body.appendChild(focusButton);
  }
  
  // Functionality implementations
  function toggleProductivityTools() {
    state.toolsVisible = !state.toolsVisible;
    
    const timerContainer = document.querySelector('.productivity-timer');
    const taskListContainer = document.querySelector('.task-list-container');
    const projectPanel = document.querySelector('.project-folders-panel');
    const promptPanel = document.querySelector('.prompt-templates-panel');
    
    if (state.toolsVisible) {
      timerContainer.style.display = 'flex';
      taskListContainer.style.display = 'block';
      projectPanel.style.display = 'block';
      promptPanel.style.display = 'block';
      showNotification('Productivity tools enabled', 'success');
    } else {
      timerContainer.style.display = 'none';
      taskListContainer.style.display = 'none';
      projectPanel.style.display = 'none';
      promptPanel.style.display = 'none';
      showNotification('Productivity tools hidden', 'info');
    }
  }
  
  function toggleTimer() {
    const startBtn = document.querySelector('.start-btn');
    
    if (state.timerRunning) {
      clearInterval(state.timerInterval);
      startBtn.textContent = 'Start';
      state.timerRunning = false;
      showNotification('Timer paused', 'warning');
    } else {
      state.timerInterval = setInterval(updateTimer, 1000);
      startBtn.textContent = 'Pause';
      state.timerRunning = true;
      showNotification('Timer started', 'success');
    }
  }
  
  function updateTimer() {
    if (state.timerValue > 0) {
      state.timerValue--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timerInterval);
      document.querySelector('.start-btn').textContent = 'Start';
      state.timerRunning = false;
      showNotification('Timer complete! Take a break.', 'success');
      
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vm//8Lbv//9kzNvwlYAAkDeCBlkQBNkwmkkhkiCAgCv//+//Nf//AaEheaADQCOkG+ChARkwmkkhkiCAgKsAAADs=');
      audio.play();
    }
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(state.timerValue / 60);
    const seconds = state.timerValue % 60;
    const display = document.querySelector('.timer-display');
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  function resetTimer() {
    clearInterval(state.timerInterval);
    state.timerValue = 25 * 60; // Reset to 25 minutes
    state.timerRunning = false;
    document.querySelector('.start-btn').textContent = 'Start';
    updateTimerDisplay();
    showNotification('Timer reset to 25:00', 'info');
  }
  
  function setCustomTimer() {
    const customTime = prompt('Enter time in minutes (1-60):', '25');
    if (customTime !== null) {
      const time = parseInt(customTime);
      if (!isNaN(time) && time > 0 && time <= 60) {
        clearInterval(state.timerInterval);
        state.timerValue = time * 60;
        state.timerRunning = false;
        document.querySelector('.start-btn').textContent = 'Start';
        updateTimerDisplay();
        showNotification(`Timer set to ${time}:00`, 'success');
      } else {
        showNotification('Please enter a valid time between 1-60 minutes', 'error');
      }
    }
  }
  
  function addTask(taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      created: new Date().toISOString(),
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
  
  function renderTasks() {
    const taskItemsContainer = document.querySelector('.task-items');
    if (!taskItemsContainer) return;
    
    // Filter tasks for current project if one is active
    const tasksToDisplay = state.activeProject ? 
      state.tasks.filter(t => t.projectId === state.activeProject) : 
      state.tasks;
    
    taskItemsContainer.innerHTML = '';
    
    if (tasksToDisplay.length === 0) {
      taskItemsContainer.innerHTML = '<div style="text-align: center; padding: 10px; color: #888;">No tasks yet</div>';
      return;
    }
    
    tasksToDisplay.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
        <div class="task-delete">×</div>
      `;
      
      taskItem.querySelector('.task-check').addEventListener('change', () => toggleTaskCompletion(task.id));
      taskItem.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));
      
      taskItemsContainer.appendChild(taskItem);
    });
  }
  
  function addNewProject() {
    const projectName = prompt('Enter new project name:');
    if (projectName && projectName.trim()) {
      const newProject = {
        id: 'proj_' + Date.now(),
        name: projectName.trim(),
        folders: []
      };
      
      state.projects.push(newProject);
      saveProjects();
      renderProjects();
      showNotification(`Project "${projectName}" created`, 'success');
    }
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
      document.querySelector('.task-list-title').textContent = `Tasks: ${project.name}`;
    }
    
    // Render tasks for this project
    renderTasks();
    
    showNotification(`Switched to ${project ? project.name : 'Default Project'}`, 'info');
  }
  
  function renderProjects() {
    const projectsList = document.querySelector('.project-folders-list');
    if (!projectsList) return;
    
    projectsList.innerHTML = '';
    
    state.projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = `project-folder ${project.id === state.activeProject ? 'active' : ''}`;
      projectItem.dataset.id = project.id;
      projectItem.innerHTML = `
        <div class="project-name">${project.name}</div>
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
  
  function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project and all its tasks?')) {
      // Remove the project
      state.projects = state.projects.filter(p => p.id !== projectId);
      
      // Remove all tasks associated with this project
      state.tasks = state.tasks.filter(t => t.projectId !== projectId);
      
      // If the active project was deleted, switch to default
      if (state.activeProject === projectId) {
        state.activeProject = 'default';
      }
      
      saveProjects();
      saveTasks();
      renderProjects();
      renderTasks();
      
      showNotification('Project deleted', 'warning');
    }
  }
  
  function deleteFolder(projectId, folderId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    
    if (confirm('Are you sure you want to delete this folder?')) {
      project.folders = project.folders.filter(f => f.id !== folderId);
      saveProjects();
      renderProjects();
      showNotification('Folder deleted', 'warning');
    }
  }
  
  function addNewPromptTemplate() {
    const promptName = prompt('Enter prompt template name:');
    if (!promptName || !promptName.trim()) return;
    
    const promptText = prompt('Enter prompt template text:');
    if (!promptText || !promptText.trim()) return;
    
    const newPrompt = {
      id: 'prompt_' + Date.now(),
      name: promptName.trim(),
      prompt: promptText.trim()
    };
    
    state.customPrompts.push(newPrompt);
    saveCustomPrompts();
    renderPromptTemplates();
    showNotification(`Prompt "${promptName}" created`, 'success');
  }
  
  function usePromptTemplate(promptId) {
    const prompt = state.customPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    // Find the input field in TypingMind
    const inputField = document.querySelector('textarea[placeholder*="Type"], textarea[placeholder*="message"], textarea[placeholder*="@"], [contenteditable="true"]');
    
    if (inputField) {
      if (inputField.getAttribute('contenteditable') === 'true') {
        inputField.innerHTML = prompt.prompt;
        inputField.focus();
      } else {
        inputField.value = prompt.prompt;
        inputField.focus();
        
        // Trigger input event to activate any listeners
        const event = new Event('input', { bubbles: true });
        inputField.dispatchEvent(event);
      }
      
      showNotification(`Prompt "${prompt.name}" inserted`, 'success');
    } else {
      showNotification('Could not find input field', 'error');
    }
  }
  
  function deletePromptTemplate(promptId) {
    if (confirm('Are you sure you want to delete this prompt template?')) {
      state.customPrompts = state.customPrompts.filter(p => p.id !== promptId);
      saveCustomPrompts();
      renderPromptTemplates();
      showNotification('Prompt template deleted', 'warning');
    }
  }
  
  function renderPromptTemplates() {
    const promptsList = document.querySelector('.prompt-templates-list');
    if (!promptsList) return;
    
    promptsList.innerHTML = '';
    
    if (state.customPrompts.length === 0) {
      promptsList.innerHTML = '<div style="text-align: center; padding: 10px; color: #888;">No custom prompts yet</div>';
      return;
    }
    
    state.customPrompts.forEach(prompt => {
      const promptItem = document.createElement('div');
      promptItem.className = 'prompt-template';
      promptItem.dataset.id = prompt.id;
      promptItem.innerHTML = `
        <div class="prompt-name">${prompt.name}</div>
        <div class="prompt-actions" style="margin-top: 5px;">
          <button class="timer-btn use-prompt" style="font-size: 11px; padding: 2px 5px;">Use</button>
          <button class="timer-btn edit-prompt" style="font-size: 11px; padding: 2px 5px; margin-left: 5px;">Edit</button>
          <button class="timer-btn delete-prompt" style="font-size: 11px; padding: 2px 5px; margin-left: 5px;">Delete</button>
        </div>
      `;
      
      promptItem.querySelector('.use-prompt').addEventListener('click', () => usePromptTemplate(prompt.id));
      promptItem.querySelector('.edit-prompt').addEventListener('click', () => editPromptTemplate(prompt.id));
      promptItem.querySelector('.delete-prompt').addEventListener('click', () => deletePromptTemplate(prompt.id));
      
      promptsList.appendChild(promptItem);
    });
  }
  
  function editPromptTemplate(promptId) {
    const prompt = state.customPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    const newName = window.prompt('Edit prompt name:', prompt.name);
    if (newName === null) return;
    
    const newPrompt = window.prompt('Edit prompt text:', prompt.prompt);
    if (newPrompt === null) return;
    
    prompt.name = newName.trim();
    prompt.prompt = newPrompt.trim();
    
    saveCustomPrompts();
    renderPromptTemplates();
    showNotification('Prompt template updated', 'success');
  }
  
  function toggleFocusMode() {
    state.focusModeActive = !state.focusModeActive;
    
    const focusIndicator = document.querySelector('.focus-indicator');
    
    if (state.focusModeActive) {
      document.body.classList.add('focus-mode');
      focusIndicator.classList.add('active');
      focusIndicator.title = 'Disable Focus Mode';
      showNotification('Focus mode enabled', 'success');
    } else {
      document.body.classList.remove('focus-mode');
      focusIndicator.classList.remove('active');
      focusIndicator.title = 'Enable Focus Mode';
      showNotification('Focus mode disabled', 'info');
    }
  }
  
  function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.tm-notification');
    existingNotifications.forEach(notification => {
      document.body.removeChild(notification);
    });
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `tm-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  // Initialize everything
  function init() {
    createProductivityToolsToggle();
    createTimer();
    createTaskList();
    createProjectFoldersPanel();
    createPromptTemplatesPanel();
    createFocusIndicator();
    
    // Update timer display initially
    updateTimerDisplay();
    
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
    extensionIndicator.textContent = '✨ ADHD-Friendly Mode Active';
    document.body.appendChild(extensionIndicator);
    
    // Make the indicator fade out after 5 seconds
    setTimeout(() => {
      extensionIndicator.style.transition = 'opacity 1s ease';
      extensionIndicator.style.opacity = '0';
    }, 5000);
    
    console.log('TypingMind ADHD-Friendly Productivity Extension loaded successfully!');
  }
  
  // Wait for page to load and then initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
