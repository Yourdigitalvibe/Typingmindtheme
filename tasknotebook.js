/**
 * TypingMind ADHD/Dyslexia Extension
 * Task Management, Pomodoro Timer, and Notebook Functionality
 */

//-------------------------------------------------------------------------------
// 1. TASK MANAGEMENT FUNCTIONS
//-------------------------------------------------------------------------------

// Add a new task
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

// Toggle task completion status
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

// Delete a task
function deleteTask(taskId) {
  state.tasks = state.tasks.filter(t => t.id !== taskId);
  saveTasks();
  renderTasks();
  showNotification('Task deleted', 'info');
}

// Clear all completed tasks
function clearCompletedTasks() {
  state.tasks = state.tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  showNotification('Completed tasks cleared', 'info');
}

// Render tasks in the UI
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

// Filter tasks by type (all, today, overdue)
function filterTasks(filter) {
  renderTasks(filter);
  const taskListTitle = document.querySelector('.task-list-title');
  if (taskListTitle) {
    taskListTitle.textContent = filter === 'all' ? 'All Tasks' : 
                               filter === 'today' ? 'Today\'s Tasks' : 
                               'Overdue Tasks';
  }
}

// Render the tasks widget UI
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

//-------------------------------------------------------------------------------
// 2. POMODORO TIMER FUNCTIONS
//-------------------------------------------------------------------------------

// Toggle timer (start/pause)
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

// Update timer countdown
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

// Update timer display (minutes:seconds)
function updateTimerDisplay() {
  const minutes = Math.floor(state.timer.value / 60);
  const seconds = state.timer.value % 60;
  const display = document.querySelector('.timer-display');
  if (display) {
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Reset timer to 25 minutes
function resetTimer() {
  clearInterval(state.timer.interval);
  state.timer.value = 25 * 60; // Reset to 25 minutes
  state.timer.running = false;
  const startBtn = document.querySelector('.start-btn');
  if (startBtn) startBtn.textContent = 'Start';
  updateTimerDisplay();
  showNotification('Timer reset to 25:00', 'info');
}

// Set a custom timer duration
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

// Render the timer widget UI
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

//-------------------------------------------------------------------------------
// 3. NOTEBOOK FUNCTIONS
//-------------------------------------------------------------------------------

// Initialize notebook functionality
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
          saveCurrentNotebook(container);
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

// Load a notebook's content
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

// Create a new notebook
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

// Save the current notebook
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

// Apply text formatting to the editor
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

// Export notebook content
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

// Render the notebook widget UI
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
