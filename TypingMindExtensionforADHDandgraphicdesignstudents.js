<h4>Font Pairings</h4>
          <div class="font-pairings">
            <div class="font-pair">
              <div style="font-family: 'Georgia', serif; font-size: 20px;">Georgia</div>
              <div style="font-family: 'Verdana', sans-serif; font-size: 14px;">Verdana for body text</div>
            </div>
            <div class="font-pair">
              <div style="font-family: 'Playfair Display', serif; font-size: 20px;">Playfair Display</div>
              <div style="font-family: 'Source Sans Pro', sans-serif; font-size: 14px;">Source Sans Pro for body text</div>
            </div>
          </div>
          
          <div class="font-preview" contenteditable="true">
            Type here to preview fonts...
          </div>
          
          <div class="font-controls">
            <select class="font-selector">
              <option>OpenDyslexic</option>
              <option>Arial</option>
              <option>Georgia</option>
              <option>Verdana</option>
              <option>Times New Roman</option>
              <option>Helvetica</option>
            </select>
            <input type="range" min="12" max="72" value="16" class="font-size-slider">
            <span class="font-size-value">16px</span>
          </div>
        </div>
        
        <div id="inspiration-tab" class="tab-content">
          <h4>Design Inspiration</h4>
          <div class="inspiration-gallery">
            <!-- Placeholder images for inspiration gallery -->
            <div class="inspiration-item" style="background-color: #f5f5f5;"></div>
            <div class="inspiration-item" style="background-color: #e0e0e0;"></div>
            <div class="inspiration-item" style="background-color: #d5d5d5;"></div>
            <div class="inspiration-item" style="background-color: #f0f0f0;"></div>
            <div class="inspiration-item" style="background-color: #e5e5e5;"></div>
            <div class="inspiration-item" style="background-color: #dadada;"></div>
          </div>
          
          <button class="widget-button add-inspiration-btn" style="margin-top: 10px;">Add Inspiration</button>
          
          <h4 style="margin-top: 15px;">Design Resources</h4>
          <div class="design-resources">
            <a href="https://color.adobe.com" target="_blank" class="resource-link">Adobe Color</a>
            <a href="https://fonts.google.com" target="_blank" class="resource-link">Google Fonts</a>
            <a href="https://dribbble.com" target="_blank" class="resource-link">Dribbble</a>
          </div>
        </div>
      </div>
    `;
    
    // Initialize design tools
    initializeDesignTools(container);
  }
  
  function renderClientWidget(container) {
    container.innerHTML = `
      <div class="client-header">
        <h4>Clients & Projects</h4>
        <button class="widget-button add-client-btn">Add Client</button>
      </div>
      
      <div class="client-list"></div>
      
      <div class="client-info"></div>
    `;
    
    // Initialize client manager
    initializeClientManager(container);
  }
  
  function renderTimelineWidget(container) {
    container.innerHTML = `
      <div class="timeline-header">
        <h4>Upcoming Deadlines</h4>
        <div>
          <button class="widget-button prev-week-btn">◀</button>
          <span class="timeline-date-range">This Week</span>
          <button class="widget-button next-week-btn">▶</button>
        </div>
      </div>
      
      <div class="timeline-wrapper">
        <div class="timeline-days"></div>
        <div class="timeline-events"></div>
      </div>
      
      <div class="timeline-legend" style="margin-top: 10px; font-size: 12px;">
        <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
          <div style="width: 10px; height: 10px; background-color: var(--accent-color); border-radius: 50%;"></div>
          <span>Task Deadline</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <div style="width: 10px; height: 10px; background-color: var(--focus-color); border-radius: 50%;"></div>
          <span>Project Milestone</span>
        </div>
      </div>
    `;
    
    // Initialize timeline view
    initializeTimeline(container);
  }
  
  function renderMultiChatWidget(container) {
    container.innerHTML = `
      <div class="multi-chat-tabs"></div>
      <div class="widget-buttons">
        <button class="widget-button new-chat-btn">New Chat</button>
        <button class="widget-button rename-chat-btn">Rename Current</button>
        <button class="widget-button save-chats-btn">Save All Chats</button>
      </div>
    `;
    
    // Add event listeners
    container.querySelector('.new-chat-btn').addEventListener('click', createNewChat);
    container.querySelector('.rename-chat-btn').addEventListener('click', renameCurrentChat);
    container.querySelector('.save-chats-btn').addEventListener('click', saveAllChats);
    
    // Render initial chat tabs
    renderChatTabs();
  }
  
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
    
    // Render initial projects
    renderProjects();
  }
  
  function renderPromptWidget(container) {
    container.innerHTML = `
      <div class="project-folders-header">
        <div class="task-list-title">Prompt Templates</div>
        <div class="task-list-actions">
          <button class="widget-button add-prompt-btn">Add New</button>
        </div>
      </div>
      <div class="prompt-templates-list"></div>
    `;
    
    // Add event listeners
    container.querySelector('.add-prompt-btn').addEventListener('click', addNewPromptTemplate);
    
    // Render initial prompts
    renderPromptTemplates();
  }
  
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
    
    // Add event listeners
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
    
    const patternToggle = container.querySelector('#pattern-bg-toggle');
    patternToggle.addEventListener('change', function() {
      toggleBackgroundPattern(this.checked);
    });
    
    const fontScaleSlider = container.querySelector('#font-scale-slider');
    fontScaleSlider.addEventListener('input', function() {
      const scale = parseFloat(this.value);
      updateFontScale(scale);
      container.querySelector('#font-scale-value').textContent = `${Math.round(scale * 100)}%`;
    });
    
    container.querySelector('.toggle-focus-btn').addEventListener('click', toggleFocusMode);
  }
  
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
    
    // Add event listeners
    container.querySelector('.google-drive-auth-btn').addEventListener('click', toggleGoogleDriveAuth);
    
    if (state.googleDriveEnabled) {
      container.querySelector('.save-to-drive-btn').addEventListener('click', saveCurrentChatToDrive);
      container.querySelector('.browse-drive-btn').addEventListener('click', browseGoogleDrive);
    }
    
    container.querySelector('.notion-auth-btn').addEventListener('click', toggleNotionAuth);
    
    if (state.notionEnabled) {
      container.querySelector('.save-to-notion-btn').addEventListener('click', saveToNotion);
    }
  }
  
  // Initialize specialized widget functionalities
  function initializeNotebook(container) {
    // Populate notebook selector
    const notebookSelector = container.querySelector('.notebook-selector');
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
      editorContent.innerHTML = activeNotebook.content;
      
      // Update last saved info
      const lastSaved = new Date(activeNotebook.modified);
      container.querySelector('.notebook-status').textContent = `Last saved: ${lastSaved.toLocaleString()}`;
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
        loadNotebook(state.activeNotebook);
      }
    });
    
    // Editor content change
    const editorContent = container.querySelector('.editor-content');
    editorContent.addEventListener('input', function() {
      state.unsavedChanges = true;
      container.querySelector('.notebook-status').textContent = 'Unsaved changes';
    });
    
    // Format buttons
    const formatButtons = container.querySelectorAll('.editor-toolbar button');
    formatButtons.forEach(button => {
      button.addEventListener('click', function() {
        const format = this.dataset.format;
        formatText(format);
      });
    });
    
    // Export button
    container.querySelector('.export-notes-btn').addEventListener('click', exportNotebook);
    
    // Save to Drive button
    container.querySelector('.save-to-drive-btn').addEventListener('click', function() {
      saveCurrentNotebook();
      if (state.googleDriveEnabled) {
        saveNotebookToDrive();
      } else {
        showNotification('Notebook saved locally. Connect Google Drive to sync.', 'info');
      }
    });
  }
  
  function loadNotebook(notebookId) {
    const notebook = state.notebooks.find(n => n.id === notebookId);
    if (!notebook) return;
    
    const notebookWidget = document.getElementById('notebook-widget');
    if (!notebookWidget) return;
    
    const editorContent = notebookWidget.querySelector('.editor-content');
    editorContent.innerHTML = notebook.content;
    
    // Update last saved info
    const lastSaved = new Date(notebook.modified);
    notebookWidget.querySelector('.notebook-status').textContent = `Last saved: ${lastSaved.toLocaleString()}`;
    
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
    
    // Reload notebook selector
    const notebookWidget = document.getElementById('notebook-widget');
    if (notebookWidget) {
      initializeNotebook(notebookWidget.querySelector('.widget-body'));
    }
    
    showNotification(`New notebook "${name}" created`, 'success');
  }
  
  function saveCurrentNotebook() {
    const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
    if (!notebook) return;
    
    const notebookWidget = document.getElementById('notebook-widget');
    if (!notebookWidget) return;
    
    const editorContent = notebookWidget.querySelector('.editor-content');
    notebook.content = editorContent.innerHTML;
    notebook.modified = new Date().toISOString();
    
    saveNotebooks();
    
    // Update last saved info
    const lastSaved = new Date(notebook.modified);
    notebookWidget.querySelector('.notebook-status').textContent = `Last saved: ${lastSaved.toLocaleString()}`;
    
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
      notebookWidget.querySelector('.notebook-status').textContent = 'Unsaved changes';
    }
  }
  
  function exportNotebook() {
    const notebook = state.notebooks.find(n => n.id === state.activeNotebook);
    if (!notebook) return;
    
    // Save any unsaved changes
    if (state.unsavedChanges) {
      saveCurrentNotebook();
    }
    
    // Offer export options
    const exportFormat = prompt('Choose export format (pdf, html, markdown, text):', 'pdf');
    if (!exportFormat) return;
    
    switch (exportFormat.toLowerCase()) {
      case 'pdf':
        showNotification('PDF export would be generated here', 'info');
        break;
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
      case 'markdown':
      case 'text':
        showNotification(`${exportFormat.toUpperCase()} export would be generated here`, 'info');
        break;
      default:
        showNotification('Unsupported export format', 'error');
    }
  }
  
  function saveNotebookToDrive() {
    if (!state.googleDriveEnabled) {
      showNotification('Google Drive not connected', 'error');
      return;
    }
    
    showNotification('Saving notebook to Google Drive...', 'info');
    
    // In a real implementation, this would use the Google Drive API
    // For demo, we'll simulate the save operation
    
    setTimeout(() => {
      showNotification('Notebook saved to Google Drive', 'success');
    }, 1500);
  }
  
  function populateModuleList(container) {
    const moduleList = container.querySelector('.module-list');
    if (!moduleList) return;
    
    moduleList.innerHTML = '';
    
    // Add all modules from documentation
    widgets.forEach(widget => {
      if (moduleDocs[widget.id]) {
        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item';
        moduleItem.dataset.id = widget.id;
        moduleItem.dataset.category = widget.category || 'misc';
        
        moduleItem.innerHTML = `
          <div>${moduleDocs[widget.id].icon} ${moduleDocs[widget.id].title}</div>
          <div style="font-size: 12px; color: #888;">${widget.category || 'misc'}</div>
        `;
        
        moduleItem.addEventListener('click', () => {
          showModuleDetails(widget.id, container);
        });
        
        moduleList.appendChild(moduleItem);
      }
    });
  }
  
  function showModuleDetails(moduleId, container) {
    const moduleDetails = container.querySelector('.module-details');
    if (!moduleDetails) return;
    
    const doc = moduleDocs[moduleId];
    if (!doc) {
      moduleDetails.innerHTML = '<div>No documentation available for this module</div>';
      return;
    }
    
    // Highlight the selected module in the list
    const moduleItems = container.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
      if (item.dataset.id === moduleId) {
        item.style.backgroundColor = 'var(--teal-light)';
      } else {
        item.style.backgroundColor = '';
      }
    });
    
    // Show the documentation
    moduleDetails.innerHTML = `
      <h3>${doc.icon} ${doc.title}</h3>
      <div style="margin: 10px 0;">
        <span class="category-tag" style="background-color: var(--accent-color); color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">${doc.category}</span>
      </div>
      <p>${doc.description}</p>
      
      <h4 style="margin-top: 15px;">Features</h4>
      <ul style="padding-left: 20px;">
        ${doc.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      
      <h4 style="margin-top: 15px;">How to Use</h4>
      <p>${doc.usage}</p>
      
      <h4 style="margin-top: 15px;">Tips</h4>
      <ul style="padding-left: 20px;">
        ${doc.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>
      
      <div style="margin-top: 15px;">
        <button class="widget-button show-module-btn" data-id="${moduleId}">Open Widget</button>
      </div>
    `;
    
    // Add event listener for the show button
    moduleDetails.querySelector('.show-module-btn').addEventListener('click', function() {
      const widgetId = this.dataset.id;
      const widget = document.getElementById(widgetId);
      
      if (widget) {
        widget.style.display = 'flex';
      } else {
        // Create widget if it doesn't exist (lazy loading)
        const widgetDef = widgets.find(w => w.id === widgetId);
        if (widgetDef) {
          const created = createWidget(widgetDef);
          if (created.lazyLoaded) {
            created.element.style.display = 'flex';
          }
        }
      }
    });
  }
  
  function filterModules(searchText) {
    const moduleList = document.querySelector('.module-list');
    if (!moduleList) return;
    
    const moduleItems = moduleList.querySelectorAll('.module-item');
    
    if (!searchText) {
      // Show all
      moduleItems.forEach(item => {
        item.style.display = '';
      });
      return;
    }
    
    const lowerSearch = searchText.toLowerCase();
    
    moduleItems.forEach(item => {
      const moduleId = item.dataset.id;
      const doc = moduleDocs[moduleId];
      
      if (!doc) {
        item.style.display = 'none';
        return;
      }
      
      const titleMatch = doc.title.toLowerCase().includes(lowerSearch);
      const descMatch = doc.description.toLowerCase().includes(lowerSearch);
      const categoryMatch = doc.category.toLowerCase().includes(lowerSearch);
      
      if (titleMatch || descMatch || categoryMatch) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  function filterModulesByCategory(category) {
    const moduleList = document.querySelector('.module-list');
    if (!moduleList) return;
    
    const moduleItems = moduleList.querySelectorAll('.module-item');
    
    if (category === 'all') {
      // Show all
      moduleItems.forEach(item => {
        item.style.display = '';
      });
      return;
    }
    
    moduleItems.forEach(item => {
      if (item.dataset.category === category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  function initializeDesignTools(container) {
    // Set up tab switching
    const tabButtons = container.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const tabId = this.dataset.tab;
        container.querySelector(`#${tabId}`).classList.add('active');
      });
    });
    
    // Populate saved color palettes
    renderSavedPalettes(container);
    
    // Add event listeners
    container.querySelector('.new-palette-btn').addEventListener('click', createNewPalette);
    container.querySelector('.color-picker-btn').addEventListener('click', openColorPicker);
    container.querySelector('.contrast-checker-btn').addEventListener('click', openContrastChecker);
    container.querySelector('.add-inspiration-btn').addEventListener('click', addInspirationImage);
    
    // Set up font preview functionality
    const fontSelector = container.querySelector('.font-selector');
    const fontSizeSlider = container.querySelector('.font-size-slider');
    const fontPreview = container.querySelector('.font-preview');
    
    if (fontSelector && fontSizeSlider && fontPreview) {
      fontSelector.addEventListener('change', function() {
        fontPreview.style.fontFamily = this.value;
      });
      
      fontSizeSlider.addEventListener('input', function() {
        const size = this.value;
        fontPreview.style.fontSize = `${size}px`;
        container.querySelector('.font-size-value').textContent = `${size}px`;
      });
    }
  }
  
  function renderSavedPalettes(container) {
    const palettesContainer = container.querySelector('.saved-palettes');
    if (!palettesContainer) return;
    
    palettesContainer.innerHTML = '';
    
    state.colorPalettes.forEach(palette => {
      const paletteElement = document.createElement('div');
      paletteElement.className = 'color-palette';
      paletteElement.dataset.id = palette.id;
      
      // Add color swatches
      palette.colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        paletteElement.appendChild(swatch);
      });
      
      // Add palette name
      const nameElement = document.createElement('div');
      nameElement.style.fontSize = '12px';
      nameElement.style.marginTop = '5px';
      nameElement.textContent = palette.name;
      paletteElement.appendChild(nameElement);
      
      palettesContainer.appendChild(paletteElement);
    });
  }
  
  function createNewPalette() {
    // In a real implementation, this would open a color palette creator
    // For demo, we'll create a simple palette with random colors
    
    const paletteName = prompt('Enter name for new color palette:');
    if (!paletteName || !paletteName.trim()) return;
    
    // Generate 5 random colors
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
      const lightness = 40 + Math.floor(Math.random() * 40); // 40-80%
      
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    
    const newPalette = {
      id: 'palette_' + Date.now(),
      name: paletteName.trim(),
      colors: colors
    };
    
    state.colorPalettes.push(newPalette);
    saveColorPalettes();
    
    // Update the UI
    const designWidget = document.getElementById('design-tools-widget');
    if (designWidget) {
      renderSavedPalettes(designWidget.querySelector('.widget-body'));
    }
    
    showNotification(`Color palette "${paletteName}" created`, 'success');
  }
  
  function openColorPicker() {
    // In a real implementation, this would open a color picker
    // For demo, we'll show a notification
    showNotification('Color picker would open here', 'info');
  }
  
  function openContrastChecker() {
    // In a real implementation, this would open a contrast checker
    // For demo, we'll show a notification
    showNotification('Contrast checker would open here', 'info');
  }
  
  function addInspirationImage() {
    // In a real implementation, this would allow adding an image
    // For demo, we'll show a notification
    showNotification('Image upload would be available here', 'info');
  }
  
  function initializeClientManager(container) {
    renderClientList(container);
    
    // Add event listener for add client button
    container.querySelector('.add-client-btn').addEventListener('click', addNewClient);
  }
  
  function renderClientList(container) {
    const clientList = container.querySelector('.client-list');
    if (!clientList) return;
    
    clientList.innerHTML = '';
    
    state.clients.forEach(client => {
      const clientItem = document.createElement('div');
      clientItem.className = 'client-item';
      clientItem.dataset.id = client.id;
      
      clientItem.innerHTML = `
        <div class="client-color" style="background-color: ${client.color};"></div>
        <div class="client-name">${client.name}</div>
      `;
      
      clientItem.addEventListener('click', () => {
        selectClient(client.id, container);
      });
      
      clientList.appendChild(clientItem);
    });
  }
  
  function selectClient(clientId, container) {
    state.activeClient = clientId;
    
    // Highlight selected client
    const clientItems = container.querySelectorAll('.client-item');
    clientItems.forEach(item => {
      if (item.dataset.id === clientId) {
        item.style.backgroundColor = 'var(--teal-light)';
      } else {
        item.style.backgroundColor = '';
      }
    });
    
    // Show client info
    const clientInfo = container.querySelector('.client-info');
    const client = state.clients.find(c => c.id === clientId);
    
    if (!client || !clientInfo) return;
    
    clientInfo.innerHTML = `
      <h4>${client.name}</h4>
      <div class="client-contact">
        ${client.contact.email ? `Email: ${client.contact.email}<br>` : ''}
        ${client.contact.phone ? `Phone: ${client.contact.phone}` : ''}
      </div>
      
      <h4 style="margin-top: 15px;">Projects</h4>
      <div class="client-projects">
        ${client.projects.length > 0 ? 
          client.projects.map(project => `
            <div class="project-item" data-id="${project.id}">${project.name}</div>
          `).join('') : 
          '<div style="color: #888;">No projects yet</div>'
        }
      </div>
      
      <div style="margin-top: 10px;">
        <button class="widget-button add-project-for-client-btn">Add Project</button>
        <button class="widget-button edit-client-btn">Edit Client</button>
      </div>
    `;
    
    // Add event listeners
    clientInfo.querySelector('.add-project-for-client-btn').addEventListener('click', () => {
      addProjectForClient(clientId);
    });
    
    clientInfo.querySelector('.edit-client-btn').addEventListener('click', () => {
      editClient(clientId);
    });
  }
  
  function addNewClient() {
    const clientName = prompt('Enter client name:');
    if (!clientName || !clientName.trim()) return;
    
    const email = prompt('Enter client email (optional):');
    const phone = prompt('Enter client phone (optional):');
    
    // Generate a random color
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 70%, 60%)`;
    
    const newClient = {
      id: 'client_' + Date.now(),
      name: clientName.trim(),
      color: color,
      contact: {
        email: email ? email.trim() : '',
        phone: phone ? phone.trim() : ''
      },
      projects: []
    };
    
    state.clients.push(newClient);
    saveClients();
    
    // Update the UI
    const clientWidget = document.getElementById('client-widget');
    if (clientWidget) {
      renderClientList(clientWidget.querySelector('.widget-body'));
      selectClient(newClient.id, clientWidget.querySelector('.widget-body'));
    }
    
    showNotification(`Client "${clientName}" added`, 'success');
  }
  
  function editClient(clientId) {
    const client = state.clients.find(c => c.id === clientId);
    if (!client) return;
    
    const newName = prompt('Edit client name:', client.name);
    if (newName === null) return; // Cancelled
    
    const newEmail = prompt('Edit client email:', client.contact.email);
    if (newEmail === null) return; // Cancelled
    
    const newPhone = prompt('Edit client phone:', client.contact.phone);
    if (newPhone === null) return; // Cancelled
    
    client.name = newName.trim();
    client.contact.email = newEmail.trim();
    client.contact.phone = newPhone.trim();
    
    saveClients();
    
    // Update the UI
    const clientWidget = document.getElementById('client-widget');
    if (clientWidget) {
      renderClientList(clientWidget.querySelector('.widget-body'));
      selectClient(clientId, clientWidget.querySelector('.widget-body'));
    }
    
    showNotification('Client updated', 'success');
  }
  
  function addProjectForClient(clientId) {
    const client = state.clients.find(c => c.id === clientId);
    if (!client) return;
    
    const projectName = prompt(`Enter project name for ${client.name}:`);
    if (!projectName || !projectName.trim()) return;
    
    // Create a new project in the projects list
    const projectId = 'proj_' + Date.now();
    const newProject = {
      id: projectId,
      name: projectName.trim(),
      folders: [],
      color: client.color,
      clientId: clientId
    };
    
    state.projects.push(newProject);
    
    // Add reference to the client
    client.projects.push({
      id: projectId,
      name: projectName.trim()
    });
    
    saveProjects();
    saveClients();
    
    // Update both project and client UIs
    const clientWidget = document.getElementById('client-widget');
    if (clientWidget) {
      selectClient(clientId, clientWidget.querySelector('.widget-body'));
    }
    
    const projectWidget = document.getElementById('project-widget');
    if (projectWidget) {
      renderProjects();
    }
    
    showNotification(`Project "${projectName}" created for ${client.name}`, 'success');
  }
  
  function initializeTimeline(container) {
    // Create the timeline dates
    const timelineDays = container.querySelector('.timeline-days');
    if (!timelineDays) return;
    
    timelineDays.innerHTML = '';
    
    // Get the current week dates
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay); // Start from Sunday
    
    // Create day headers
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayElement = document.createElement('div');
      dayElement.className = 'timeline-day';
      if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
      }
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      
      dayElement.innerHTML = `${dayName}<br>${dayNumber}`;
      timelineDays.appendChild(dayElement);
    }
    
    // Populate the timeline with events (tasks and deadlines)
    populateTimelineEvents(container, startDate);
    
    // Add event listeners for navigation
    container.querySelector('.prev-week-btn').addEventListener('click', () => {
      navigateTimeline(-7, container);
    });
    
    container.querySelector('.next-week-btn').addEventListener('click', () => {
      navigateTimeline(7, container);
    });
  }
  
  function populateTimelineEvents(container, startDate) {
    const timelineEvents = container.querySelector('.timeline-events');
    if (!timelineEvents) return;
    
    timelineEvents.innerHTML = '';
    
    // Calculate the end date (7 days from start)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    
    // Filter tasks with due dates in this range
    const tasksInRange = state.tasks.filter(task => {
      const dueDate = new Date(task.due);
      return dueDate >= startDate && dueDate < endDate;
    });
    
    // Position tasks on the timeline
    tasksInRange.forEach(task => {
      const dueDate = new Date(task.due);
      const dayIndex = Math.floor((dueDate - startDate) / (24 * 60 * 60 * 1000));
      
      if (dayIndex >= 0 && dayIndex < 7) {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.textContent = task.text;
        eventElement.title = `${task.text} - Due: ${dueDate.toLocaleString()}`;
        
        // Position horizontally based on the day
        const leftPosition = (dayIndex / 7 * 100) + '%';
        eventElement.style.left = leftPosition;
        
        // Position vertically (random for now to avoid overlaps)
        const topPosition = 10 + (Math.random() * 100) + 'px';
        eventElement.style.top = topPosition;
        
        timelineEvents.appendChild(eventElement);
      }
    });
    
    // Update the date range display
    const rangeDisplay = container.querySelector('.timeline-date-range');
    if (rangeDisplay) {
      const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      rangeDisplay.textContent = `${startFormatted} - ${endFormatted}`;
    }
  }
  
  function navigateTimeline(days, container) {
    // Get the current start date from the first day element
    const firstDayElement = container.querySelector('.timeline-day');
    if (!firstDayElement) return;
    
    // Parse the date from the element
    const dayText = firstDayElement.textContent.trim();
    const dayMatches = dayText.match(/[A-Za-z]+\s*(\d+)/);
    
    if (!dayMatches) return;
    
    const dayNumber = parseInt(dayMatches[1]);
    
    // Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Create a date object for the first displayed day
    const firstDate = new Date(currentYear, currentMonth, dayNumber);
    
    // Adjust if the displayed month is likely wrong (e.g., we're looking at dates from the previous or next month)
    if (today.getDate() < 15 && dayNumber > 15) {
      // If today is early in the month and the displayed day is late, it's probably the previous month
      firstDate.setMonth(currentMonth - 1);
    } else if (today.getDate() > 15 && dayNumber < 15) {
      // If today is late in the month and the displayed day is early, it's probably the next month
      firstDate.setMonth(currentMonth + 1);
    }
    
    // Navigate by the specified number of days
    firstDate.setDate(firstDate.getDate() + days);
    
    // Re-initialize the timeline with the new start date
    const timelineDays = container.querySelector('.timeline-days');
    if (!timelineDays) return;
    
    timelineDays.innerHTML = '';
    
    // Create day headers for the new week
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDate);
      date.setDate(firstDate.getDate() + i);
      
      const dayElement = document.createElement('div');
      dayElement.className = 'timeline-day';
      if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
      }
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      
      dayElement.innerHTML = `${dayName}<br>${dayNumber}`;
      timelineDays.appendChild(dayElement);
    }
    
    // Populate the timeline with events for the new week
    populateTimelineEvents(container, firstDate);
  }
  
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
    
    // Update the timeline if it's visible
    const timelineWidget = document.getElementById('timeline-widget');
    if (timelineWidget && timelineWidget.style.display === 'flex') {
      initializeTimeline(timelineWidget.querySelector('.widget-body'));
    }
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
          
          if (folderItem.querySelector('.delete// Ultimate TypingMind Extension for ADHD Graphic Design Students
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
        
        <div id="typography-tab" class="tab-content">
          <h4>Font Pairings
