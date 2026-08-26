const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
let selectedDate = localDate;
const activeAccounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const activeEmail = localStorage.getItem('questscore-session');
const activeAccount = activeAccounts.find(account => account.email === activeEmail);
const taskStorageKey = `questscore-tasks-${activeEmail || 'guest'}`;
const tasks = JSON.parse(localStorage.getItem(taskStorageKey) || '[]');
const achievementStorageKey = `questscore-achievements-${activeEmail || 'guest'}`;
let virginAccount = activeAccount?.isNew === true && activeAccount.gamerscore === 0;
if (virginAccount) tasks.forEach(task => {
  task.done = false;
  task.subtasks.forEach(step => { step.done = false; });
});
const list = document.querySelector('#taskList');
const progressText = document.querySelector('#progressText');
const dayProgress = document.querySelector('#dayProgress');
const todayPoints = document.querySelector('#todayPoints');
const gamerscore = document.querySelector('#gamerscore');
const toast = document.querySelector('#toast');
const toastTitle = document.querySelector('#toastTitle');
const toastMessage = document.querySelector('#toastMessage');
let toastTimer;
let audioContext;
let draftSubtasks = [];
function saveTasks() {
  localStorage.setItem(taskStorageKey, JSON.stringify(tasks));
}
function calculatePoints(subtaskCount) {
  return Math.min(15, 5 + subtaskCount * 2);
}
function recordCompletedAchievements(task) {
  if (!activeEmail || !task.done) return;
  const names = new Set([...(activeAccount?.achievements || []), ...JSON.parse(localStorage.getItem(achievementStorageKey) || '[]')]);
  names.add('Bienvenue, Aventurier');
  const completedCount = Number(localStorage.getItem(`questscore-completed-count-${activeEmail}`) || 0) + 1;
  localStorage.setItem(`questscore-completed-count-${activeEmail}`, completedCount);
  if (completedCount >= 5) names.add("Et c'est parti !");
  if (completedCount >= 10) names.add('La machine est lancée');
  if (completedCount >= 25) names.add('Ça devient sérieux');
  if (completedCount >= 100) names.add('Héros du quotidien');
  if (activeAccount) {
    activeAccount.achievements = [...names];
    localStorage.setItem('questscore-accounts', JSON.stringify(activeAccounts));
    localStorage.setItem('questscore-account', JSON.stringify(activeAccount));
  }
  localStorage.setItem(achievementStorageKey, JSON.stringify([...names]));
}
function playCompletionSound() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  const now = audioContext.currentTime;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.28);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now + index * 0.08);
    oscillator.stop(now + index * 0.08 + 0.3);
  });
}
function showCompletionFeedback(title, points, isSubtask) {
  playCompletionSound();
  toastTitle.textContent = isSubtask ? 'Step complete' : 'Quest complete';
  toastMessage.textContent = isSubtask ? `${title} · keep the momentum going` : `${title} · +${points} GS added to your score`;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3600);
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(isSubtask ? 'Step complete' : 'Quest complete', { body: isSubtask ? title : `${title} · +${points} GS` });
  } else if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') new Notification('Quest complete', { body: `${title} · +${points} GS` });
    });
  }
}
function renderTasks() {
  tasks.forEach(task => { task.points = calculatePoints(task.subtasks.length); });
  const visibleTasks = tasks.filter(task => (task.scheduledDate || localDate) === selectedDate);
  document.querySelectorAll('.nav-count').forEach(element => { element.textContent = tasks.filter(task => (task.scheduledDate || localDate) === selectedDate && !task.done).length; });
  list.innerHTML = visibleTasks.length ? visibleTasks.map(task => `<article class="task ${task.done ? 'completed' : ''}"><div class="task-main"><input class="check" type="checkbox" ${task.done ? 'checked' : ''} ${task.subtasks.length && !task.subtasks.every(step => step.done) ? 'disabled' : ''} data-task="${task.id}" aria-label="Complete ${task.title}"><div class="task-copy"><span class="task-title">${task.title}</span><div class="task-meta"><span class="task-points">✦ ${task.points} GS</span><span>${task.label}</span>${task.deadline ? `<span class="deadline ${task.deadline < selectedDate ? 'overdue' : ''}">Due ${task.deadline}</span>` : ''}${task.subtasks.length ? `<span>${task.subtasks.filter(step => step.done).length}/${task.subtasks.length} steps</span>` : ''}</div></div><button class="task-menu" aria-label="More options for ${task.title}">•••</button></div>${task.subtasks.length ? `<div class="subtasks">${task.subtasks.map((step, index) => `<label class="subtask"><input type="checkbox" data-task="${task.id}" data-step="${index}" ${step.done ? 'checked' : ''}> <span>${step.text}</span></label>`).join('')}</div>` : ''}</article>`).join('') : '<p class="empty-day">No quests scheduled for this day. Create one and give it a deadline.</p>';
  const completed = visibleTasks.filter(task => task.done).length;
  progressText.textContent = `${completed} of ${visibleTasks.length} completed`;
  dayProgress.style.width = visibleTasks.length ? `${(completed / visibleTasks.length) * 100}%` : '0%';
  const earnedToday = visibleTasks.filter(task => task.done).reduce((sum, task) => sum + task.points, 0);
  const currentScore = activeAccount?.gamerscore || 0;
  todayPoints.textContent = virginAccount ? '0' : earnedToday;
  gamerscore.textContent = currentScore.toLocaleString();
}
list.addEventListener('change', event => {
  const input = event.target;
  const task = tasks.find(item => item.id === Number(input.dataset.task));
  if (!task) return;
  const wasDone = task.done;
  const isSubtask = input.dataset.step !== undefined;
  if (isSubtask) {
    task.subtasks[Number(input.dataset.step)].done = input.checked;
    if (task.subtasks.every(step => step.done)) task.done = true;
  } else task.done = input.checked;
  if (input.checked) {
    if (virginAccount && task.done) {
      virginAccount = false;
      activeAccount.isNew = false;
    }
    if (task.done && !wasDone && activeAccount) {
      activeAccount.gamerscore = (activeAccount.gamerscore || 0) + task.points;
      localStorage.setItem('questscore-accounts', JSON.stringify(activeAccounts));
      localStorage.setItem('questscore-account', JSON.stringify(activeAccount));
    }
    if (task.done && !wasDone) recordCompletedAchievements(task);
  }
  saveTasks();
  renderTasks();
  if (input.checked) {
    const questCompleted = task.done && isSubtask;
    showCompletionFeedback(questCompleted ? task.title : isSubtask ? task.subtasks[Number(input.dataset.step)].text : task.title, questCompleted ? task.points : 10, !questCompleted && isSubtask);
  }
});
const modal = document.querySelector('#modal');
const form = document.querySelector('#taskForm');
const modalEyebrow = document.querySelector('#modalEyebrow');
const modalHeading = document.querySelector('#modalHeading');
const saveTaskBtn = document.querySelector('#saveTaskBtn');
const deleteTaskBtn = document.querySelector('#deleteTaskBtn');
const addSubtaskBtn = document.querySelector('#addSubtaskBtn');
const subtaskDraftList = document.querySelector('#subtaskDraftList');
let editingTaskId = null;
function renderSubtaskEditor() {
  subtaskDraftList.innerHTML = draftSubtasks.map((step, index) => `<div class="subtask-draft"><input type="text" value="${step.text.replaceAll('"', '&quot;')}" data-draft-index="${index}" aria-label="Subtask ${index + 1}" placeholder="e.g. Review the final copy"><button type="button" class="remove-subtask" data-draft-index="${index}" aria-label="Remove subtask ${index + 1}">×</button></div>`).join('');
}
function openModal(task = null) {
  editingTaskId = task ? task.id : null;
  modalEyebrow.textContent = task ? 'EDIT QUEST' : 'NEW QUEST';
  modalHeading.textContent = task ? 'Tune your quest' : 'What will you score next?';
  saveTaskBtn.innerHTML = task ? 'Save changes <span>→</span>' : 'Add quest <span>→</span>';
  deleteTaskBtn.hidden = !task;
  form.title.value = task ? task.title : '';
  form.scheduledDate.value = task ? task.scheduledDate : selectedDate;
  form.deadline.value = task ? task.deadline || '' : selectedDate;
  draftSubtasks = task ? task.subtasks.map(step => ({ ...step })) : [];
  renderSubtaskEditor();
  modal.hidden = false;
  form.title.focus();
}
addSubtaskBtn.addEventListener('click', () => {
  draftSubtasks.push({ text: '', done: false });
  renderSubtaskEditor();
  subtaskDraftList.lastElementChild?.querySelector('input').focus();
});
subtaskDraftList.addEventListener('input', event => {
  const input = event.target.closest('[data-draft-index]');
  if (input && input.matches('input')) draftSubtasks[Number(input.dataset.draftIndex)].text = input.value;
});
subtaskDraftList.addEventListener('click', event => {
  const removeButton = event.target.closest('.remove-subtask');
  if (!removeButton) return;
  draftSubtasks.splice(Number(removeButton.dataset.draftIndex), 1);
  renderSubtaskEditor();
});
document.querySelector('#addTaskBtn').addEventListener('click', () => openModal());
list.addEventListener('click', event => {
  const menu = event.target.closest('.task-menu');
  if (!menu) return;
  const task = tasks.find(item => item.id === Number(menu.closest('.task').querySelector('[data-task]').dataset.task));
  if (task) openModal(task);
});
document.querySelector('#modalClose').addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', event => { if (event.target === modal) modal.hidden = true; });
deleteTaskBtn.addEventListener('click', () => {
  const task = tasks.find(item => item.id === editingTaskId);
  if (!task || !window.confirm(`Remove "${task.title}"?`)) return;
  tasks.splice(tasks.indexOf(task), 1);
  saveTasks();
  renderTasks();
  modal.hidden = true;
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subtasks = draftSubtasks.map(step => ({ ...step, text: step.text.trim() })).filter(step => step.text);
  if (editingTaskId) {
    const task = tasks.find(item => item.id === editingTaskId);
    task.title = data.get('title');
    task.scheduledDate = data.get('scheduledDate');
    task.deadline = data.get('deadline');
    task.subtasks = subtasks;
    task.done = task.subtasks.length ? task.subtasks.every(step => step.done) : task.done;
  } else tasks.unshift({ id: Date.now(), title: data.get('title'), points: calculatePoints(subtasks.length), label: 'New quest', scheduledDate: data.get('scheduledDate'), deadline: data.get('deadline'), subtasks, done: false });
  saveTasks();
  renderTasks();
  form.reset();
  modal.hidden = true;
});
const todayView = document.querySelector('#today');
const leaderboardView = document.querySelector('#leaderboard');
const achievementsView = document.querySelector('#achievements');
const todayLayout = document.querySelector('#today-layout');
const navItems = document.querySelectorAll('.nav-item');
function showView(view) {
  const isLeaderboard = view === 'leaderboard';
  const isAchievements = view === 'achievements';
  todayLayout.hidden = !(!isLeaderboard && !isAchievements);
  leaderboardView.hidden = !isLeaderboard;
  achievementsView.hidden = !isAchievements;
  navItems.forEach(item => item.classList.toggle('active', item.dataset.view === view));
  document.querySelector('.breadcrumb').innerHTML = `Workspace <span>/</span> ${isLeaderboard ? 'Leaderboard' : isAchievements ? 'Achievements' : 'Today'}`;
}
document.querySelectorAll('[data-view]').forEach(item => item.addEventListener('click', event => {
  event.preventDefault();
  showView(item.dataset.view);
}));
renderTasks();