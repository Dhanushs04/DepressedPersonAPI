// Route for user login
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }

  res.status(200).json({ message: 'Login successful', user });
});
