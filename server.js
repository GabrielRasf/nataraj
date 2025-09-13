import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!email || !message) return res.status(422).json({ error: 'Campos obrigatórios' });

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nataraj_form'
    });

    await connection.execute(
      'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [name, phone, email, message]
    );

    await connection.end();
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

app.use(express.static('public'));
