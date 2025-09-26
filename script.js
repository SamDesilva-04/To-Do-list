const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.classList.add('list-group-item');
  
  li.innerHTML = `
    <input type="checkbox" class="mr-2 task-checkbox">
    <span class="task-text">${taskText}</span>
    <div>
      <button class="btn btn-sm btn-info edit-btn">Edit</button>
      <button class="btn btn-sm btn-danger delete-btn">Delete</button>
    </div>
  `;
  
  taskList.appendChild(li);
  taskInput.value = '';
});

// Event delegation for edit, delete, and toggle completed
taskList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;

  // Toggle completed
  if (e.target.classList.contains('task-checkbox')) {
    li.classList.toggle('completed', e.target.checked);
  }

  // Edit task
  if (e.target.classList.contains('edit-btn')) {
    const span = li.querySelector('.task-text');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
  }

  // Delete task
  if (e.target.classList.contains('delete-btn')) {
    li.remove();
  }
});

// Filter tasks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
      switch(filter) {
        case 'all':
          task.style.display = 'flex';
          break;
        case 'completed':
          task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
          break;
        case 'active':
          task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  });
});
