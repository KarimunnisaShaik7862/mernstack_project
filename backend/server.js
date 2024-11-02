const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const qrcode = require('qrcode');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://karimunnisashaik7862:Se8jS7Y9CPuzQRuP@cluster0.6rlyer8.mongodb.net/birthday?retryWrites=true&w=majority&appName=Cluster0', {
 
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// User model
const User = mongoose.model('User', {
  name: String,
  email: String,
  dateOfBirth: Date,
});

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function getImageBase64(imagePath) {
  try {
    return await fs.readFile(imagePath, { encoding: 'base64' });
  } catch (error) {
    console.warn(`Image file not found: ${imagePath}`);
    return null;
  }
}

async function sendBirthdayEmail(auth, to, subject, userName) {
  const gmail = google.gmail({ version: 'v1', auth });
  const logoPath = path.join(__dirname, 'public', '1.png');
  const paymentUrl = `http://localhost:5000/pay?email=${encodeURIComponent(to)}`;

  const logoBase64 = await getImageBase64(logoPath);

  const emailContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px; }
          .card {
            background: #fff;
            border: 5px solid #d4af37;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            text-align: center;
            margin: 0 auto;
            position: relative;
          }
          .logo {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 100px;
          }
          .title {
            color: #f847b5;
            font-size: 24px;
            margin: 0;
            font-weight: bold;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            background: #fff;
            padding: 0 10px;
          }
          .content {
            padding: 20px;
          }
          .message {
            border: 1px solid #060606;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .buttons {
            margin-top: 20px;
          }
          .btn {
            background-color: #28a745;
            color: #fff;
            border: none;
            padding: 5px 30px; /* Adjusted width */
            cursor: pointer;
            font-size: 18px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            display: block;
            margin: 0 auto;
            text-decoration: none;
          }
          .btn:hover {
            background-color: #218838;
          }
          .social-icons {
            margin-top: 20px;
          }
          .social-icons img {
            width: 30px;
            margin: 0 10px;
            cursor: pointer;
          }
          .footer {
            margin-top: 20px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="card">
          ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" alt="Logo" class="logo">` : ''}
          <h1 class="title">Helping Hands</h1>
          <div class="content">
            <p>Hi, ${userName}</p>
            <h2>"Wishing you a grateful birthday from the team Meal Matters."</h2>
            <div class="message">
              <p>
                "Today is your birthday, a very special day for you! If you'd like to help those in need by donating food, the Meal Matters organization is here to assist. You can donate money, which we'll use to purchase and distribute food to those in need in your name. Alternatively, you can join us in person to distribute the food and receive blessings directly from those you help.
              </p>
              <p>
                To participate, click the 'Donate' button to donate. We'll send you pictures on WhatsApp, and you can also see them on Instagram."
              </p>
            </div>
            <div class="buttons">
              <a href="${paymentUrl}" class="btn">Donate</a>
            </div>
            <div class="social-icons">
              <a href="https://wa.me/<your-phone-number>" target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp">
              </a>
              <a href="https://www.instagram.com/<your-instagram-handle>/" target="_blank">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram">
              </a>
            </div>
            <p class="footer">Thank you,<br>Helping Hands</p>
          </div>
        </div>log
      </body>
    </html>
  `;

  const message = [
    `From: "Meal Matters" <mealmatters.org@gmail.com>`,
    `To: ${to}`,
    `Content-Type: text/html; charset=UTF-8`,
    `MIME-Version: 1.0`,
    `Subject: ${subject}`,
    ``,
    emailContent,
  ].join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log('Email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);

    const today = new Date();
    const userBirthDate = new Date(user.dateOfBirth);

    if (today.getMonth() === userBirthDate.getMonth() && today.getDate() === userBirthDate.getDate()) {
      const auth = await authorize();
      await sendBirthdayEmail(auth, user.email, 'Happy Birthday from Helping Hands!', user.name);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ error: 'Error creating user' });
  }
});

async function checkAndSendBirthdayEmails() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
  const currentDay = today.getDate();

  try {
    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfBirth" }, currentMonth] },
          { $eq: [{ $dayOfMonth: "$dateOfBirth" }, currentDay] }
        ]
      }
    });

    const auth = await authorize();

    for (const user of users) {
      await sendBirthdayEmail(auth, user.email, 'Happy Birthday from Helping Hands!', user.name);
    }

    console.log(`Sent birthday emails to ${users.length} users.`);
  } catch (error) {
    console.error('Error checking and sending birthday emails:', error);
  }
}

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', checkAndSendBirthdayEmails);

// Serve payment page with QR code and UPI option
app.get('/pay', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  try {
    const qrCodeData = `upi://pay?pa=<your-upi-id>&pn=Meal Matters&cu=INR&am=0.00&email=${encodeURIComponent(email)}`;
    const qrCodeImageUrl = await qrcode.toDataURL(qrCodeData);

    const paymentPage = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f0f0f0; text-align: center; padding: 50px; }
            .qr-code { margin: 20px; }
            .email { font-size: 18px; margin-top: 10px; }
            .btn { background-color: #28a745; color: #fff; border: none; padding: 10px 30px; cursor: pointer; font-size: 18px; border-radius: 5px; transition: background-color 0.3s ease; margin: 20px; text-decoration: none; }
            .btn:hover { background-color: #218838; }
          </style>
        </head>
        <body>
          <h1>Pay for Helping Hands</h1>
          <div class="email">Payment for: ${email}</div>
          <div class="btn-container">
            <a href="${qrCodeData}" class="btn">Pay via UPI</a>
            <div class="qr-code">
              <img src="${qrCodeImageUrl}" alt="QR Code">
            </div>
            <p>Scan the QR code to pay</p>
          </div>
        </body>
      </html>
    `;

    res.send(paymentPage);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Error generating QR code.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
