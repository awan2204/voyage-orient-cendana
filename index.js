const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Email configuration (replace with your credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "voyageorientcendana@gmail.com",
    pass: "Awan2204",
  },
});

// Contact form endpoint
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic input validation (you might want to add more robust validation)
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  const mailOptions = {
    from: email,
    to: "voyageorientcendana@gmail.com",
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error sending email" });
    }
    console.log("Email sent: " + info.response);
    res.json({ message: "Email sent successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
