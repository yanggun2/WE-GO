const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  // 직접 입력
  database: 'wego_db',
  port: 3306
});

db.connect(err => {
  if (err) console.error('DB 연결 실패:', err);
  else console.log('✅ MariaDB 연결 성공');
});

/*0502*/
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.send('서버 정상 작동 중');
});

app.listen(5000, () => {
  console.log('🚀 서버 실행: http://localhost:5000');
});

