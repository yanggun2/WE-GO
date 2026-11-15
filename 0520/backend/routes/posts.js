const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'wego_db',
  port: 3306
});

// multer 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ 게시글 저장 라우터 (POST /api/posts)
router.post('/', upload.single('image'), (req, res) => {
  const { name, author, category, region_type, region, content, user_id } = req.body;
  const image = req.file ? req.file.filename : '';

  const sql = `INSERT INTO posts (name, author, category, region_type, region, image, content, user_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, author, category, region_type, region, image, content, user_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('DB 저장 실패:', err);
      return res.status(500).json({ message: '서버 오류' });
    }
    res.json({ message: '게시글 저장 성공', postId: result.insertId });
  });
});


// ✅ 게시글 목록 조회 라우터 (GET /api/posts)
router.get('/', (req, res) => {
  const category = req.query.category;
  const region = req.query.region;

  let query = 'SELECT * FROM posts WHERE 1=1';
  const params = [];

  if (category && category !== '전체') {
    query += ' AND FIND_IN_SET(?, category)';
    params.push(category);
  }
  if (region) {
    query += ' AND region = ?';
    params.push(region);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('DB 조회 실패:', err);
      res.status(500).json({ message: '서버 오류' });
    } else {
      res.json(results);
    }
  });
});

// ✅ 게시글 삭제 라우터 (DELETE /api/posts/:id)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM posts WHERE post_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('게시글 삭제 실패:', err);
      return res.status(500).json({ message: '서버 오류' });
    }
    res.status(200).json({ message: '삭제 성공' });
  });
});


module.exports = router;
