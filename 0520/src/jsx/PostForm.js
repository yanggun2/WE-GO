import React, { useState } from 'react';
import axios from 'axios';

function PostForm({ user }) {
  const [form, setForm] = useState({
    name: '',
    category: [],
    region_type: 'domestic',
    region: '',
    imageFile: null,
    content: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({ ...form, category: [...form.category, value] });
    } else {
      setForm({ ...form, category: form.category.filter(c => c !== value) });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('author', user.name);
      formData.append('category', form.category.join(','));
      formData.append('region_type', form.region_type);
      formData.append('region', form.region);
      formData.append('content', form.content);
      formData.append('image', form.imageFile); // 파일 객체
      formData.append('user_id', user.id); // ✅ 0520 추가된 부분
  
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      alert('게시글 등록 성공!');
      setForm({
        name: '',
        category: [],
        region_type: 'domestic',
        region: '',
        imageFile: null,
        content: ''
      });      
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록 실패');
    }
  };  

  const domesticRegions = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도'
  ];  
  const abroadRegions = ['아시아','유럽','북아메리카','남아메리카','아프리카','오세아니아'];

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#333'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: '#333'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>게시글 작성</h2>
      
      <input name="name" placeholder="제목" onChange={handleChange} value={form.name} style={inputStyle} />
      
      <input name="author" placeholder="작성자" value={user.name} readOnly style={{ ...inputStyle, backgroundColor: '#e9ecef' }} />

      <div style={{ marginBottom: '10px' }}>
        <label>카테고리:</label>
        {['여행', '맛집', '자연', '역사'].map(c => (
          <label key={c} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              value={c}
              checked={form.category.includes(c)}
              onChange={handleCategoryChange}
            />
            {c}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>구분:</label>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="region_type"
            value="domestic"
            checked={form.region_type === 'domestic'}
            onChange={handleChange}
          />
          국내
        </label>
        <label>
          <input
            type="radio"
            name="region_type"
            value="abroad"
            checked={form.region_type === 'abroad'}
            onChange={handleChange}
          />
          해외
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>지역 선택:</label>
        {(form.region_type === 'domestic' ? domesticRegions : abroadRegions).map(r => (
          <label key={r} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="region"
              value={r}
              checked={form.region === r}
              onChange={handleChange}
            />
            {r}
          </label>
        ))}
      </div>

      <input
        type="file"
        onChange={e => setForm({ ...form, imageFile: e.target.files[0] })}
        style={{ marginBottom: '10px' }}
      />

      <textarea 
        name="content" 
        placeholder="내용" 
        onChange={handleChange} 
        value={form.content} 
        style={{ ...inputStyle, height: '80px' }}
      ></textarea>

      <button type="submit" style={buttonStyle}>등록</button>
    </form>
  );
}

export default PostForm;
