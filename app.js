const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies

// Sample in-memory user data (for demonstration purposes)
let users = [];
let moodHistory = {};

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Welcome Route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Depressed Person Support API!</h1>
        <h2>Register</h2>
        <form action="/users/register" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            
            <button type="submit">Register</button>
        </form>
        <h2>Login</h2>
        <form action="/users/login" method="POST">
            <label for="email">Email:</label>
            <input type="email" id="loginEmail" name="email" required><br><br>
            
            <label for="password">Password:</label>
            <input type="password" id="loginPassword" name="password" required><br><br>
            
            <button type="submit">Login</button>
        </form>
    `);
});

// User Registration Route
app.post('/users/register', (req, res) => {
    const { name, email, password } = req.body;
    // Simple user validation
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Add new user
    users.push({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
});

// User Login Route
app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

// User Profile Route
app.get('/users/profile', (req, res) => {
    // Simulate fetching user profile
    // In a real application, you would typically get user ID from the token/session
    res.status(200).json({ message: 'User profile', users });
});

// Mood Tracking Route
app.post('/mood', (req, res) => {
    const { email, mood } = req.body;
    if (!moodHistory[email]) {
        moodHistory[email] = [];
    }
    moodHistory[email].push(mood);
    res.status(201).json({ message: 'Mood recorded successfully', mood });
});

// Mood History Route
app.get('/mood/history', (req, res) => {
    const { email } = req.query;
    const history = moodHistory[email] || [];
    res.status(200).json({ message: 'Mood history retrieved', history });
});

// Mental Health Resources Route
app.get('/resources', (req, res) => {
    // Sample resources
    const resources = [
        { id: 1, title: 'Coping Strategies', description: 'Learn coping strategies for managing depression.' },
        { id: 2, title: 'Meditation Guides', description: 'Guided meditations for mindfulness.' },
    ];
    res.status(200).json(resources);
});

// Specific Resource Route
app.get('/resources/:id', (req, res) => {
    const resourceId = req.params.id;
    const resources = [
        { id: 1, title: 'Coping Strategies', description: 'Learn coping strategies for managing depression.' },
        { id: 2, title: 'Meditation Guides', description: 'Guided meditations for mindfulness.' },
    ];
    const resource = resources.find(r => r.id == resourceId);
    if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
});

// Counselor Connection Route
app.post('/counselor/connect', (req, res) => {
    // Simulated connection logic
    res.status(200).json({ message: 'Connected to a mental health counselor' });
});

// Crisis Help Route
app.post('/crisis/help', (req, res) => {
    // Simulate triggering a crisis alert
    res.status(200).json({ message: 'Crisis alert triggered. Support team notified.' });
});

// Crisis Hotline Route
app.get('/crisis/hotlines', (req, res) => {
    // Sample hotlines
    const hotlines = [
        { country: 'USA', number: '1-800-273-8255' },
        { country: 'UK', number: '0800 028 8855' },
    ];
    res.status(200).json(hotlines);
});

// Notifications Route
app.post('/notifications/reminders', (req, res) => {
    // Simulated reminder setting logic
    res.status(201).json({ message: 'Reminder set successfully' });
});

// Notifications Schedule Route
app.get('/notifications/schedule', (req, res) => {
    // Simulated fetching reminders
    res.status(200).json({ message: 'Reminders retrieved', reminders: [] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
