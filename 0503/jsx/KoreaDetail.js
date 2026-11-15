import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import '../css/KoreaDetail.css';

const KoreaDetail = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const region = new URLSearchParams(location.search).get('region') || '지역명 없음';
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '역사', '자연', '맛집'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const categoryQuery = selectedCategory === '전체' ? '' : `category=${selectedCategory}&`;
        const regionQuery = region !== '지역명 없음' ? `region=${region}` : '';
        const query = `${categoryQuery}${regionQuery}`;
        const response = await axios.get(`http://localhost:5000/api/posts?${query}`);
        setPosts(response.data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
  
    fetchPosts();
  }, [selectedCategory, region]);
  

  return (
    <div className={`detail-container ${theme}`}>
      <h1 className="region-title">{region !== '지역명 없음' ? region : '선택된 지역이 없습니다.'}</h1>
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post.post_id}>
              <img src={`/images/${post.image}`} alt={post.name} className="post-image" />
              <h3>{post.name}</h3>
              <p className="post-category">카테고리: {post.category}</p>
              <p className="post-author">작성자: {post.author}</p>
              <p className="post-content">{post.content}</p>
            </div>
          ))
        ) : (
          <p>등록된 코스가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default KoreaDetail;
