import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { name, email, phone, message } = req.body; // Next.js já parseia JSON

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  console.log('Dados recebidos:', { name, email, phone, message });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Formulário Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Novo formulário Nataraj',
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `
    });

    return res.status(200).json({ message: 'Formulário enviado com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao enviar formulário' });
  }
}
