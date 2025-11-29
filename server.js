const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour parser JSON et URL-encoded (pour formulaires)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Moteur de templates EJS
app.set('view engine', 'ejs');

// Servir fichiers statiques (CSS, etc.) depuis /public
app.use(express.static('public'));

// Données factices pour tâches (en mémoire, pas de DB)
let tasks = [
  { id: 1, title: 'Apprendre Express', done: false },
  { id: 2, title: 'Créer une app démo', done: false }
];

// Route accueil (personnalisée - extension 1)
app.get('/', (req, res) => {
  res.render('index', { user: 'Nasr Bouzaida' });  // Remplacez par votre nom
});

// Route tâches (vue EJS, avec total - extension 4)
app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks, total: tasks.length });
});

// API GET toutes tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API POST nouvelle tâche (avec validation - extension 3)
app.post('/api/tasks', (req, res) => {
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({ message: 'Titre requis' });
  }
  const newTask = { id: tasks.length + 1, title: req.body.title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Page About (extension 2)
app.get('/about', (req, res) => {
  res.render('about', { bio: 'Ceci est un TP sur Express.js et EJS pour un gestionnaire de tâches.' });
});

// Page Contact (extension 5)
app.get('/contact', (req, res) => {
  res.render('contact', { email: 'votre.email@example.com' });
});

// Page Profil (bonus exercice EJS)
app.get('/profile', (req, res) => {
  const user = { name: 'John Doe', age: 28, occupation: 'Software Engineer', hobbies: ['Coding', 'Gaming', 'Hiking'] };
  res.render('profile', { user });
});

// Démarrage serveur
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));