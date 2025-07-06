const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function addTask(taskText, isDone = false) {
  const li = document.createElement('li');
  li.textContent = taskText;

  if (isDone) li.classList.add('done'); // ✅ استرجاع حالة الإنجاز

  // ✅ ميزة الإنجاز
  li.addEventListener('click', function (e) {
    // تجاهل الضغط إذا كان على زر الحذف فقط
    if (e.target.tagName === 'BUTTON') return;
    li.classList.toggle('done');
    saveTasks();
  });

  // ✅ زر الحذف
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.firstChild.textContent.trim(); // فقط النص، بدون زر الحذف
    const isDone = li.classList.contains('done');
    tasks.push({ text, isDone });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = function () {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => {
    addTask(task.text, task.isDone);
  });
};
function updateCounter() {
  const total = document.querySelectorAll('#taskList li').length;
  document.getElementById('counter').textContent = `عدد المهام: ${total}`;
}

