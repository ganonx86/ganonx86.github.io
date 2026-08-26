const achievements = [
  { category: 'Progression', name: 'Bienvenue, Aventurier', condition: 'Terminer sa première quête', reward: 50 },
  { category: 'Progression', name: "Et c'est parti !", condition: 'Terminer 5 quêtes', reward: 100, progress: '3 / 5 quêtes' },
  { category: 'Progression', name: 'Petit mais vaillant', condition: 'Terminer une quête marquée comme difficile', reward: 75 },
  { category: 'Progression', name: 'Une bonne chose de faite', condition: 'Terminer une quête avant sa date limite', reward: 75 },
  { category: 'Progression', name: 'Premier niveau', condition: 'Atteindre le niveau 2', reward: 100 },
  { category: 'Progression', name: 'La machine est lancée', condition: 'Terminer 10 quêtes', reward: 150 },
  { category: 'Progression', name: 'Ça devient sérieux', condition: 'Terminer 25 quêtes', reward: 250 },
  { category: 'Progression', name: 'Héros du quotidien', condition: 'Terminer 100 quêtes', reward: 500 },
  { category: 'Régularité', name: 'Sur une lancée', condition: '3 jours consécutifs avec au moins une quête terminée', reward: 75, progress: '3 jours atteints' },
  { category: 'Régularité', name: 'Je ne m’arrête plus', condition: '7 jours consécutifs', reward: 100 },
  { category: 'Régularité', name: 'Une semaine parfaite', condition: 'Terminer toutes les quêtes prévues pendant 7 jours', reward: 150 },
  { category: 'Régularité', name: 'Deux semaines, tranquille', condition: '14 jours consécutifs', reward: 200 },
  { category: 'Régularité', name: 'Inarrêtable', condition: '30 jours consécutifs', reward: 300 },
  { category: 'Régularité', name: 'Machine de guerre', condition: '100 jours consécutifs', reward: 500 },
  { category: 'Régularité', name: 'La légende raconte...', condition: '365 jours consécutifs', reward: 1000 },
  { category: 'Régularité', name: "Aujourd'hui aussi", condition: 'Accomplir au moins une quête pendant 100 jours', reward: 500 },
  { category: 'Défis', name: "J'aurais pu remettre à demain", condition: 'Terminer une tâche que tu repoussais depuis longtemps', reward: 100 },
  { category: 'Défis', name: 'Le boss est tombé', condition: 'Terminer une quête très difficile', reward: 150 },
  { category: 'Défis', name: 'Pas aujourd’hui, Satan', condition: 'Terminer une tâche que tu détestes', reward: 100 },
  { category: 'Défis', name: 'Mission suicide', condition: 'Terminer 3 quêtes difficiles dans la même journée', reward: 250 },
  { category: 'Défis', name: 'Mode Hardcore', condition: 'Terminer 5 quêtes difficiles en une journée', reward: 400 },
  { category: 'Défis', name: 'Sans les mains', condition: 'Terminer une quête sans utiliser de rappel', reward: 100 },
  { category: 'Défis', name: "C'était pas si terrible", condition: 'Terminer une quête restée en attente pendant 7 jours', reward: 150 },
  { category: 'Défis', name: 'Enfin débarrassé', condition: 'Terminer une quête restée en attente pendant 30 jours', reward: 300 },
  { category: 'Maison', name: 'Le linge ne se plie pas tout seul', condition: 'Faire une lessive', reward: 50 },
  { category: 'Maison', name: 'Maître du rangement', condition: 'Ranger entièrement une pièce', reward: 100 },
  { category: 'Maison', name: 'Que la lumière soit', condition: 'Nettoyer une pièce particulièrement sale', reward: 150 },
  { category: 'Maison', name: 'Le royaume est propre', condition: 'Nettoyer toute la maison', reward: 300 },
  { category: 'Maison', name: 'Chef de guilde', condition: 'Préparer un repas maison', reward: 75 },
  { category: 'Maison', name: 'Gordon Ramsay peut trembler', condition: 'Cuisiner 5 repas maison', reward: 150 },
  { category: 'Maison', name: 'Le frigo respire', condition: 'Faire les courses', reward: 50 },
  { category: 'Maison', name: 'Épée et plumeau', condition: 'Faire le ménage et les courses le même jour', reward: 125 },
  { category: 'Maison', name: "Je l'avais pourtant rangé ici...", condition: 'Retrouver quelque chose perdu depuis longtemps', reward: 100 },
  { category: 'Maison', name: 'Adieu, poussière', condition: 'Faire un grand ménage', reward: 200 },
  { category: 'Imprévus', name: '???', condition: 'Terminer une quête à 23h59', reward: 100, secret: true },
  { category: 'Imprévus', name: 'Dernière seconde', condition: "Terminer une quête moins d'une minute avant l'échéance", reward: 150, secret: true },
  { category: 'Imprévus', name: 'On verra demain', condition: 'Reporter une quête 10 fois', reward: 100, secret: true },
  { category: 'Imprévus', name: 'Le procrastinateur', condition: 'Avoir 20 quêtes en retard', reward: 200, secret: true },
  { category: 'Imprévus', name: "J'ai changé d'avis", condition: 'Annuler une quête puis la recréer', reward: 100, secret: true },
  { category: 'Imprévus', name: 'Qui a besoin de sommeil ?', condition: 'Terminer une quête après minuit', reward: 125, secret: true },
  { category: 'Imprévus', name: 'Speedrun', condition: 'Terminer une quête moins de 30 secondes après sa création', reward: 150, secret: true },
  { category: 'Imprévus', name: 'Overkill', condition: 'Terminer une quête extrêmement facile avec une difficulté maximale', reward: 100, secret: true },
  { category: 'Imprévus', name: 'Mais pourquoi ?', condition: 'Créer une quête puis la supprimer immédiatement', reward: 75, secret: true },
  { category: 'Imprévus', name: "C'était pas prévu", condition: "Terminer une quête qui n'était pas planifiée", reward: 100, secret: true },
  { category: 'Finances & administration', name: "L'argent ne pousse toujours pas sur les arbres", condition: 'Faire ses comptes', reward: 75 },
  { category: 'Finances & administration', name: 'Comptable du dimanche', condition: 'Mettre son budget à jour', reward: 100 },
  { category: 'Finances & administration', name: 'Pas aujourd’hui, découvert', condition: 'Respecter son budget pendant un mois', reward: 250 },
  { category: 'Finances & administration', name: 'Le trésor grandit', condition: 'Épargner une première somme', reward: 100 },
  { category: 'Finances & administration', name: 'Petit pactole', condition: 'Atteindre un objectif d’épargne', reward: 200 },
  { category: 'Finances & administration', name: 'Paperasse Slayer', condition: 'Terminer 5 tâches administratives', reward: 150 },
  { category: 'Finances & administration', name: 'Le courrier ne fait plus peur', condition: 'Vider sa boîte aux lettres', reward: 75 },
  { category: 'Finances & administration', name: 'Dossier classé', condition: 'Terminer une tâche administrative vieille de plus de 30 jours', reward: 200 },
  { category: 'Habitudes & apprentissage', name: 'Un peu mieux qu’hier', condition: 'Compléter une habitude pendant 3 jours', reward: 75 },
  { category: 'Habitudes & apprentissage', name: 'Ça travaille là-haut', condition: 'Lire pendant 30 minutes', reward: 75 },
  { category: 'Habitudes & apprentissage', name: 'Connaissance +1', condition: 'Apprendre quelque chose de nouveau', reward: 100 },
  { category: 'Habitudes & apprentissage', name: 'Pas besoin de motivation', condition: "Accomplir une tâche malgré l'absence de motivation", reward: 125 },
  { category: 'Habitudes & apprentissage', name: 'Discipline > motivation', condition: 'Maintenir une habitude pendant 30 jours', reward: 300 },
  { category: 'Habitudes & apprentissage', name: 'Nouvelle compétence débloquée', condition: "Terminer un objectif d'apprentissage", reward: 200 },
  { category: 'Habitudes & apprentissage', name: 'Je peux le faire', condition: 'Réussir quelque chose qui semblait impossible', reward: 150 }
];
const achievementAccountEmail = sessionStorage.getItem('questscore-session') || 'guest';
const achievementAccounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const achievementAccount = achievementAccounts.find(account => account.email === achievementAccountEmail);
const achievementLegacyStorageKey = `questscore-achievements-${achievementAccountEmail}`;
const completedAchievementNames = new Set([...(achievementAccount?.achievements || []), ...JSON.parse(localStorage.getItem(achievementLegacyStorageKey) || '[]')]);
const latestAchievementName = [...completedAchievementNames].at(-1);
if (achievementAccount) {
  achievementAccount.achievements = [...completedAchievementNames];
  localStorage.setItem('questscore-accounts', JSON.stringify(achievementAccounts));
  localStorage.setItem('questscore-account', JSON.stringify(achievementAccount));
}
const completedQuestCount = Number(localStorage.getItem(`questscore-completed-count-${achievementAccountEmail}`) || 0);
achievements.find(achievement => achievement.name === "Et c'est parti !").progress = `${Math.min(completedQuestCount, 5)} / 5 quêtes`;
document.querySelectorAll('.xp-mini-top span:first-child').forEach(element => { element.textContent = 'Score'; });
document.querySelectorAll('.level-card .eyebrow.light').forEach(element => { element.textContent = 'TOTAL SCORE'; });
const achievementAccountScore = Number(JSON.parse(localStorage.getItem('questscore-account') || 'null')?.gamerscore || 0);
document.querySelectorAll('.level-card .level-number').forEach(element => { element.textContent = achievementAccountScore.toLocaleString(); });
document.querySelectorAll('.xp-mini-top span:first-child').forEach(element => { element.textContent = 'Score'; });
document.querySelectorAll('.xp-mini-top span:last-child').forEach(element => { element.textContent = `${achievementAccountScore.toLocaleString()} GS`; });
const achievementTotal = document.querySelector('.achievement-total strong');
if (achievementTotal) achievementTotal.textContent = `${completedAchievementNames.size} / ${achievements.filter(achievement => !achievement.secret).length}`;
document.querySelectorAll('.achievement-page-panel .ranking-note').forEach(element => {
  element.textContent = `${completedAchievementNames.size} unlocked`;
});
function renderAchievements(container, limit = achievements.length, onlyUnlocked = false, selectedAchievement, onlyLocked = false) {
  let currentCategory = '';
  const visibleAchievements = achievements.filter(achievement => !achievement.secret && (!onlyUnlocked || completedAchievementNames.has(achievement.name)) && (!onlyLocked || !completedAchievementNames.has(achievement.name)) && (selectedAchievement === undefined || achievement.name === selectedAchievement.name)).slice(0, limit);
  container.innerHTML = visibleAchievements.map((achievement, index) => {
    const category = achievement.category !== currentCategory ? `<h3 class="achievement-category">${achievement.category}</h3>` : '';
    currentCategory = achievement.category;
    const isUnlocked = completedAchievementNames.has(achievement.name);
    const isHidden = achievement.secret && achievement.state !== 'unlocked';
    return `${category}<article class="achievement ${isUnlocked ? 'unlocked' : ''} ${isHidden ? 'secret-achievement' : ''}"><div class="achievement-icon ${isUnlocked ? '' : 'outline'}">${isHidden ? '?' : index === 0 ? '⚡' : index % 3 === 0 ? '◆' : index % 3 === 1 ? '◒' : '☼'}</div><div><strong>${isHidden ? 'Succès secret' : achievement.name}</strong><p>${isHidden ? 'Continue à accomplir des quêtes pour le découvrir.' : achievement.condition}</p>${achievement.progress && !isHidden ? '<div class="achievement-progress"><span style="width:60%"></span></div>' : ''}${isHidden ? '<small>Succès secret · À découvrir</small>' : `<small>${isUnlocked ? 'Débloqué' : 'À débloquer'}</small>`}</div><b>${isHidden ? '???' : `+${achievement.reward}`}</b></article>`;
  }).join('');
}
document.querySelectorAll('.achievement-list').forEach(container => {
  const isCollection = Boolean(container.closest('.achievement-page-panel'));
  if (isCollection) container.replaceChildren();
  if (!isCollection) {
    const latestAchievement = achievements.find(achievement => achievement.name === latestAchievementName);
    renderAchievements(container, 1, true, latestAchievement);
  } else renderAchievements(container, achievements.length, true);
});
if (document.body.classList.contains('achievements-body')) {
  const availablePanel = document.createElement('section');
  availablePanel.className = 'achievements-panel available-achievements-panel';
  availablePanel.innerHTML = '<div class="section-heading"><h2>Available achievements</h2><span class="ranking-note">Still to unlock</span></div><div class="achievement-list"></div>';
  document.querySelector('.achievements-page').append(availablePanel);
  renderAchievements(availablePanel.querySelector('.achievement-list'), achievements.length, false, undefined, true);
}
