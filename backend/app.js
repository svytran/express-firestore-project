const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const postsRouter = require('./routes/posts');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

// Use the posts router for all /posts endpoints
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});