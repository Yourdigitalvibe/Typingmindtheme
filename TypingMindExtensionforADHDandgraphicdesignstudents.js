function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      
      if (task.completed) {
        showNotification('Task completed!', 'success');
      }
      
      // Update timeline if visible
      const timelineWidget = document.getElementById('timeline-widget');
      if (timelineWidget && timelineWidget.style.display === 'flex') {
        const container = timelineWidget.querySelector('.widget-body');
        if (container) {
          const firstDayElement = container.querySelector('.timeline-day');
          if (firstDayElement) {
            const dayText = firstDayElement.textContent.trim();
            const dayMatches = dayText.match(/[A-Za-z]+\s*(\d+)/);
            
            if (dayMatches) {
              const dayNumber = parseInt(dayMatches[1]);
              const today = new Date();
              const startDate = new Date(today.getFullYear(), today.getMonth(), dayNumber);
              populateTimelineEvents(container, startDate);
            }
          }
        }
      }
    }
  }
  
  function deleteTask(taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
    showNotification('Task deleted', 'info');
    
    // Update timeline if visible
    const timelineWidget = document.getElementById('timeline-widget');
    if (timelineWidget && timelineWidget.style.display === 'flex') {
      initializeTimeline(timelineWidget.querySelector('.widget-body'));
    }
  }
  
  function clearCompletedTasks() {
    state.tasks = state.tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    showNotification('Completed tasks cleared', 'info');
    
    // Update timeline if visible
    const timelineWidget = document.getElementById('timeline-widget');
    if (timelineWidget && timelineWidget.style.display === 'flex') {
      initializeTimeline(timelineWidget.querySelector('.widget-body'));
    }
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
  
  function selectProject// Ultimate TypingMind Extension for ADHD Graphic Design Students
// Features: Multi-color themes, movable widgets, notebook, module docs, integrations, and performance optimization

(function() {
  // Performance configuration
  const config = {
    performance: {
      lazyLoadWidgets: true,      // Only load widgets when needed
      disableAnimations: false,   // Option to disable animations for better performance
      cacheEnabled: true,         // Cache data to improve responsiveness
      lowPerformanceMode: false,  // Simplified version for slower devices
      preloadCommonWidgets: true  // Preload frequently used widgets
    },
    appearance: {
      defaultTheme: 'theme-teal',
      enablePatternBackground: true,
      animationsEnabled: true,
      fontScale: 1.0
    },
    debug: false  // Set to true to enable debug logs
  };

  // Create a style element for our custom CSS
  const styleElement = document.createElement('style');
  
  // Define our custom styles with vibrant colors and visual stimulation
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
    
    .notebook-controls {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .notebook-selector {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
    
    .notebook-status {
      margin-top: 5px;
      font-size: 11px;
      color: #888;
      text-align: right;
    }
    
    /* Module documentation styling */
    .module-search {
      margin-bottom: 10px;
    }
    
    .module-search input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    
    .module-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 10px;
    }
    
    .category-btn {
      background-color: #f5f5f5;
      border: none;
      padding: 5px 10px;
      border-radius: 15px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .category-btn.active {
      background-color: var(--accent-color);
      color: white;
    }
    
    .module-item {
      padding: 8px;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .module-item:hover {
      background-color: var(--teal-light);
    }
    
    .module-details {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    /* Design tools styling */
    .color-palette {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 10px;
    }
    
    .color-swatch {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.2s;
      border: 1px solid #ddd;
    }
    
    .color-swatch:hover {
      transform: scale(1.1);
    }
    
    .color-swatch.active {
      box-shadow: 0 0 0 2px var(--accent-color);
    }
    
    .font-preview {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: white;
    }
    
    .inspiration-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      margin-top: 10px;
    }
    
    .inspiration-item {
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #ddd;
      height: 80px;
      background-size: cover;
      background-position: center;
      cursor: pointer;
    }
    
    /* Floating speedometer */
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
    
    /* Client dashboard styling */
    .client-list {
      margin-bottom: 10px;
    }
    
    .client-item {
      padding: 8px;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
    }
    
    .client-item:hover {
      background-color: var(--teal-light);
    }
    
    .client-color {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .client-info {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    .client-contact {
      margin-top: 5px;
      font-size: 12px;
      color: #666;
    }
  `;
  
  // Add our styles to the page
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
  
  // State for all our tools and widgets
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
    
    // Webhooks/integrations
    webhooks: loadWebhooks(),
    
    // Google Drive integration
    googleDriveEnabled: false,
    googleDriveAuth: null,
    
    // Notion integration
    notionEnabled: false,
    notionAuth: null,
    
    // Client management
    clients: loadClients(),
    activeClient: null,
    
    // Design tools
    designAssets: loadDesignAssets(),
    colorPalettes: loadColorPalettes(),
    
    // Performance metrics
    performance: {
      loadTime: 0,
      responseTime: []
    }
  };

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
      id: 'prompt-widget',
      title: 'Prompt Templates',
      icon: '📋',
      category: 'productivity',
      description: 'Save and reuse common prompts for consistent results',
      initialPosition: { bottom: '20px', left: '20px' },
      render: renderPromptWidget,
      minWidth: '250px',
      minHeight: '200px'
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
    },
    {
      id: 'integrations-widget',
      title: 'Integrations',
      icon: '🔌',
      category: 'integration',
      description: 'Connect with Google Drive, Notion, and other services',
      initialPosition: { top: '400px', right: '20px' },
      render: renderIntegrationsWidget,
      minWidth: '300px',
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
      id: 'module-docs-widget',
      title: 'Module Guide',
      icon: '📚',
      category: 'help',
      description: 'Learn about all available tools and how to use them',
      initialPosition: { top: '200px', right: '100px' },
      render: renderModuleDocsWidget,
      minWidth: '300px',
      minHeight: '350px'
    },
    {
      id: 'design-tools-widget',
      title: 'Design Tools',
      icon: '🖌️',
      category: 'design',
      description: 'Color palettes, typography tools, and design resources',
      initialPosition: { top: '300px', left: '400px' },
      render: renderDesignToolsWidget,
      minWidth: '300px',
      minHeight: '400px'
    },
    {
      id: 'client-widget',
      title: 'Client Dashboard',
      icon: '👥',
      category: 'organization',
      description: 'Manage clients, projects, and associated tasks',
      initialPosition: { top: '450px', left: '50px' },
      render: renderClientWidget,
      minWidth: '300px',
      minHeight: '350px'
    },
    {
      id: 'timeline-widget',
      title: 'Timeline View',
      icon: '📅',
      category: 'productivity',
      description: 'Visual timeline of upcoming deadlines and events',
      initialPosition: { top: '500px', right: '50px' },
      render: renderTimelineWidget,
      minWidth: '400px',
      minHeight: '250px'
    }
  ];

  // Module documentation content
  const moduleDocs = {
    'tasks-widget': {
      title: 'Tasks & To-Dos',
      icon: '📝',
      category: 'productivity',
      description: 'Keep track of your daily tasks and assignments',
      features: [
        'Create tasks with due dates',
        'Organize tasks by project',
        'Filter tasks by due date',
        'Automatically roll over incomplete tasks',
        'Priority levels for better focus'
      ],
      usage: 'Use this widget to manage your graphic design assignments and personal tasks. Tasks are automatically rolled over to the next day if not completed.',
      tips: [
        'Use the "Today" filter to focus on immediate priorities',
        'Associate tasks with specific projects for better organization',
        'Set realistic due dates to avoid overwhelming yourself'
      ]
    },
    'timer-widget': {
      title: 'Pomodoro Timer',
      icon: '⏱️',
      category: 'productivity',
      description: 'Stay focused with timed work sessions',
      features: [
        'Pomodoro technique (25 min work, 5 min break)',
        'Customizable time intervals',
        'Audio notifications',
        'Session tracking'
      ],
      usage: 'Start the timer when beginning a focused work session. The Pomodoro technique helps maintain concentration for people with ADHD.',
      tips: [
        'Take breaks seriously - stand up and move around',
        'Use shorter intervals (15 min) if 25 min feels too long',
        'Combine with Focus Mode for maximum concentration'
      ]
    },
    'notebook-widget': {
      title: 'Design Notes',
      icon: '📓',
      category: 'design',
      description: 'Take formatted notes with visual elements',
      features: [
        'Rich text formatting',
        'Multiple notebooks for different courses/projects',
        'Export to various formats (PDF, HTML, Markdown)',
        'Integration with Google Drive and Notion',
        'Support for image embedding'
      ],
      usage: 'Create separate notebooks for different design courses or projects. Use rich formatting to organize information visually.',
      tips: [
        'Use headers to structure your notes',
        'Save regularly to avoid losing work',
        'Export notes before exams for better studying',
        'Embed design inspiration images for reference'
      ]
    },
    'design-tools-widget': {
      title: 'Design Tools',
      icon: '🖌️',
      category: 'design',
      description: 'Color, typography, and design resources',
      features: [
        'Color palette generator and saver',
        'Typography comparison tool',
        'Design inspiration collection',
        'Color accessibility checker',
        'Golden ratio calculator'
      ],
      usage: 'Create and save color palettes for your design projects. Compare different typography options and save design inspiration.',
      tips: [
        'Save color schemes from websites you find inspiring',
        'Test color combinations for accessibility',
        'Create multiple palettes for different projects',
        'Use the golden ratio calculator for balanced designs'
      ]
    },
    'module-docs-widget': {
      title: 'Module Guide',
      icon: '📚',
      category: 'help',
      description: 'Learn about available tools and features',
      features: [
        'Searchable documentation',
        'Category filtering',
        'Visual tutorials',
        'Usage examples and tips'
      ],
      usage: 'Consult this widget whenever you\'re unsure about how to use a specific feature or tool.',
      tips: [
        'Browse by category to discover new features',
        'Search for specific functionality you need',
        'Check the tips section for power-user tricks'
      ]
    }
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
  
  function loadWebhooks() {
    try {
      return JSON.parse(localStorage.getItem('tm_webhooks')) || [];
    } catch (e) {
      console.error('Error loading webhooks:', e);
      return [];
    }
  }
  
  function saveWebhooks() {
    try {
      localStorage.setItem('tm_webhooks', JSON.stringify(state.webhooks));
    } catch (e) {
      console.error('Error saving webhooks:', e);
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
  
  function loadClients() {
    try {
      return JSON.parse(localStorage.getItem('tm_clients')) || [
        {
          id: 'client_1',
          name: 'Personal Projects',
          color: '#3a9ea5',
          contact: {
            email: 'me@example.com',
            phone: ''
          },
          projects: []
        }
      ];
    } catch (e) {
      console.error('Error loading clients:', e);
      return [
        {
          id: 'client_1',
          name: 'Personal Projects',
          color: '#3a9ea5',
          contact: {
            email: 'me@example.com',
            phone: ''
          },
          projects: []
        }
      ];
    }
  }
  
  function saveClients() {
    try {
      localStorage.setItem('tm_clients', JSON.stringify(state.clients));
    } catch (e) {
      console.error('Error saving clients:', e);
    }
  }
  
  function loadDesignAssets() {
    try {
      return JSON.parse(localStorage.getItem('tm_design_assets')) || {
        inspirationImages: [],
        typography: [],
        resources: [
          {
            name: 'Color Theory Guide',
            url: 'https://www.canva.com/colors/color-wheel/',
            type: 'reference'
          },
          {
            name: 'Typography Basics',
            url: 'https://www.canva.com/learn/typography-basics/',
            type: 'tutorial'
          }
        ]
      };
    } catch (e) {
      console.error('Error loading design assets:', e);
      return {
        inspirationImages: [],
        typography: [],
        resources: [
          {
            name: 'Color Theory Guide',
            url: 'https://www.canva.com/colors/color-wheel/',
            type: 'reference'
          },
          {
            name: 'Typography Basics',
            url: 'https://www.canva.com/learn/typography-basics/',
            type: 'tutorial'
          }
        ]
      };
    }
  }
  
  function saveDesignAssets() {
    try {
      localStorage.setItem('tm_design_assets', JSON.stringify(state.designAssets));
    } catch (e) {
      console.error('Error saving design assets:', e);
    }
  }
  
  function loadColorPalettes() {
    try {
      return JSON.parse(localStorage.getItem('tm_color_palettes')) || [
        {
          id: 'palette_1',
          name: 'Teal Theme',
          colors: ['#3a9ea5', '#c5f0f5', '#2c7d82', '#f0f8fa', '#333333']
        },
        {
          id: 'palette_2',
          name: 'Purple Dream',
          colors: ['#9b5de5', '#f3e7ff', '#7e3bd7', '#f5f0fa', '#333333']
        }
      ];
    } catch (e) {
      console.error('Error loading color palettes:', e);
      return [
        {
          id: 'palette_1',
          name: 'Teal Theme',
          colors: ['#3a9ea5', '#c5f0f5', '#2c7d82', '#f0f8fa', '#333333']
        },
        {
          id: 'palette_2',
          name: 'Purple Dream',
          colors: ['#9b5de5', '#f3e7ff', '#7e3bd7', '#f5f0fa', '#333333']
        }
      ];
    }
  }
  
  function saveColorPalettes() {
    try {
      localStorage.setItem('tm_color_palettes', JSON.stringify(state.colorPalettes));
    } catch (e) {
      console.error('Error saving color palettes:', e);
    }
  }
  
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
    
    widgetContainer.querySelector('.help-widget').addEventListener('click', () => {
      showWidgetHelp(widget.id);
    });
    
    // Render the widget content
    widget.render(widgetBody);
    
    return { id: widget.id, element: widgetContainer, lazyLoaded: true };
  }
  
  function showWidgetHelp(widgetId) {
    const doc = moduleDocs[widgetId];
    if (!doc) {
      showNotification('Help not available for this widget', 'warning');
      return;
    }
    
    // Open the module docs widget and focus on this module
    const moduleWidget = document.getElementById('module-docs-widget');
    if (moduleWidget) {
      moduleWidget.style.display = 'flex';
      
      // Select the module in the list
      const moduleList = moduleWidget.querySelector('.module-list');
      if (moduleList) {
        const moduleItems = moduleList.querySelectorAll('.module-item');
        moduleItems.forEach(item => {
          if (item.dataset.id === widgetId) {
            item.click();
          }
        });
      }
    } else {
      // If the module docs widget isn't created yet, create it
      const widget = widgets.find(w => w.id === 'module-docs-widget');
      if (widget) {
        const created = createWidget(widget);
        if (created.lazyLoaded) {
          created.element.style.display = 'flex';
          
          // Wait for rendering to complete
          setTimeout(() => {
            const moduleList = created.element.querySelector('.module-list');
            if (moduleList) {
              const moduleItems = moduleList.querySelectorAll('.module-item');
              moduleItems.forEach(item => {
                if (item.dataset.id === widgetId) {
                  item.click();
                }
              });
            }
          }, 100);
        }
      }
    }
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
  
  // Widget renderers
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
  
  function renderNotebookWidget(container) {
    container.innerHTML = `
      <div class="notebook-controls">
        <select class="notebook-selector">
          <option value="default">General Notes</option>
          <option value="new">+ New Notebook</option>
        </select>
        <div class="notebook-actions">
          <button class="widget-button export-notes-btn">Export</button>
          <button class="widget-button save-to-drive-btn">Save</button>
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
  
  function renderModuleDocsWidget(container) {
    container.innerHTML = `
      <div class="module-search">
        <input type="text" placeholder="Search modules...">
      </div>
      <div class="module-categories">
        <button class="category-btn active" data-category="all">All</button>
        <button class="category-btn" data-category="productivity">Productivity</button>
        <button class="category-btn" data-category="organization">Organization</button>
        <button class="category-btn" data-category="design">Design</button>
        <button class="category-btn" data-category="integration">Integrations</button>
      </div>
      <div class="module-list"></div>
      <div class="module-details"></div>
    `;
    
    // Add event listeners
    container.querySelector('.module-search input').addEventListener('input', function() {
      filterModules(this.value);
    });
    
    const categoryButtons = container.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterModulesByCategory(this.dataset.category);
      });
    });
    
    // Populate module list
    populateModuleList(container);
  }
  
  function renderDesignToolsWidget(container) {
    container.innerHTML = `
      <div class="design-tools-tabs">
        <button class="tab-btn active" data-tab="color-tab">Colors</button>
        <button class="tab-btn" data-tab="typography-tab">Typography</button>
        <button class="tab-btn" data-tab="inspiration-tab">Inspiration</button>
      </div>
      
      <div class="design-tools-content">
        <div id="color-tab" class="tab-content active">
          <h4>Saved Color Palettes</h4>
          <div class="saved-palettes"></div>
          <button class="widget-button new-palette-btn">Create New Palette</button>
          
          <h4 style="margin-top: 15px;">Color Tools</h4>
          <div class="color-tools">
            <button class="widget-button color-picker-btn">Color Picker</button>
            <button class="widget-button contrast-checker-btn">Contrast Checker</button>
          </div>
        </div>
        
        <div id="typography-
