// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',  // 직접 입력
//   database: 'wego_db',
// });


// db.connect(err => {
//   if (err) console.error('DB 연결 실패:', err);
//   else console.log('✅ MariaDB 연결 성공');
// });

// app.get('/', (req, res) => {
//   res.send('서버 정상 작동 중');
// });

// app.listen(5000, () => {
//   console.log('🚀 서버 실행: http://localhost:5000');
// });

// ✅ 통합된 index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'wego_db',
  port: 3306,
});

db.connect(err => {
  if (err) console.error('DB 연결 실패:', err);
  else console.log('✅ MariaDB 연결 성공');
});

app.get('/', (req, res) => {
  res.send('서버 정상 작동 중');
});

// ✅ 회원가입
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  const [user] = await db.promise().query('SELECT id FROM user WHERE email = ?', [email]);
  if (user.length > 0) {
    return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.promise().query(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

// ✅ 로그인
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [user] = await db.promise().query('SELECT * FROM user WHERE email = ?', [email]);

  if (user.length === 0) {
    return res.status(401).json({ message: '이메일이 존재하지 않습니다.' });
  }

  const validPassword = await bcrypt.compare(password, user[0].password);
  if (!validPassword) {
    return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
  }

  res.status(200).json({ 
    message: '로그인 성공', 
    user: { 
      id: user[0].id, 
      name: user[0].name, 
      email: user[0].email,
      is_admin: user[0].is_admin  // ✅ 0520 관리자 구분 추가 
    } });
});

// ✅ 회원정보 수정
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  let fields = [];
  let values = [];

  if (name) {
    fields.push('name = ?');
    values.push(name);
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    fields.push('password = ?');
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
  }

  values.push(id);

  try {
    await db.promise().query(`UPDATE user SET ${fields.join(', ')} WHERE id = ?`, values);
    res.status(200).json({ message: '회원정보 수정 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

// ✅ 회원 탈퇴
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query('DELETE FROM user WHERE id = ?', [id]);
    res.status(200).json({ message: '회원 탈퇴 완료' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 에러' });
  }
});

// ✅ OpenRouter AI API
const fetch = require('node-fetch');
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  console.log("🧪 OPENROUTER_API_KEY:", OPENROUTER_API_KEY);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          { role: "system", content: "너는 여행 플래너 AI야. 사용자가 한국어로 질문하면 한국어로만, 영어로 질문하면 영어로만 여행지를 추천해줘. 말투는 친절하고 간결하게 해." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "AI 응답 없음";
    res.json({ answer: result });
  } catch (err) {
    console.error("❌ OpenRouter 오류:", err);
    res.status(500).json({ answer: "서버 오류" });
  }
});

// ✅ 게시글 라우터
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// ✅ 회원관리리 라우터
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// ✅ 서버 시작
app.listen(5000, () => {
  console.log('🚀 서버 실행: http://localhost:5000');
});
