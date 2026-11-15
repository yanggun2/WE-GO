import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";
import '../css/MyPage.css';
import { useNavigate } from "react-router-dom"; //0513

// 이미지들 
import logo from '../images/logo.svg';
import navIcon1 from '../images/nav-icon1.svg';
import navIcon2 from '../images/nav-icon2.svg';
import navIcon3 from '../images/nav-icon3.svg';

import profileImage from "../images/profile.jpg";
import post1Image from "../images/post1.jpg";
import post2Image from "../images/post2.jpg";
import post3Image from "../images/post3.jpg";

const MyPage = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("posts");
  const instagram = "https://instagram.com/myaccount"; // 또는 "none"
  const twitter = "none";
  const facebook = "https://facebook.com/myaccount";
  const navigate = useNavigate(); //0513

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const userPosts = [
    { id: 1, imageUrl: post1Image, title: "첫 번째 게시글", date: "2025.04.10" },
    { id: 2, imageUrl: post2Image, title: "두 번째 게시글", date: "2025.04.11" },
    { id: 3, imageUrl: post3Image, title: "세 번째 게시글", date: "2025.04.12" },
    { id: 4, imageUrl: post3Image, title: "네 번째 게시글", date: "2025.04.13" },
    { id: 5, imageUrl: post3Image, title: "다섯 번째 게시글", date: "2025.04.14" },
    { id: 6, imageUrl: post1Image, title: "여섯 번째 게시글", date: "2025.04.15" },
    { id: 7, imageUrl: post2Image, title: "일곱 번째 게시글", date: "2025.04.16" },
    { id: 8, imageUrl: post3Image, title: "여덟 번째 게시글", date: "2025.04.17" },
    { id: 9, imageUrl: post3Image, title: "아홉 번째 게시글", date: "2025.04.18" },
    { id: 10, imageUrl: post3Image, title: "열 번째 게시글", date: "2025.04.19" },
  ];

  const userComments = [
    { id: 1, content: "정말 멋진 글이에요!" },
    { id: 2, content: "좋은 정보 감사합니다~" },
    { id: 3, content: "이 부분 너무 공감돼요." },
  ];

  const savedPosts = [
    { id: 1, title: "좋아요한 첫 번째 글", imageUrl: post2Image, date: "2025.04.19" },
    { id: 2, title: "좋아요한 두 번째 글", imageUrl: post1Image, date: "2025.04.19" },
    { id: 3, title: "좋아요한 세 번째 글", imageUrl: post1Image, date: "2025.04.19" },
    { id: 4, title: "좋아요한 네 번째 글", imageUrl: post1Image, date: "2025.04.19" },
    { id: 5, title: "좋아요한 다섯 번째 글", imageUrl: post1Image, date: "2025.04.19" },
    { id: 6, title: "좋아요한 여섯 번째 글", imageUrl: post1Image, date: "2025.04.19" },
    { id: 7, title: "좋아요한 일곱 번째 글", imageUrl: post1Image, date: "2025.04.19" },
  ];


  return (
    <>
    {/*Router 태그 삭제 */ }
      {/* NavBar */}
      <Navbar expand="md" className={scrolled ? "scrolled" : ""} style={{ backgroundColor: scrolled ? "#1F2937" : "transparent", transition: "0.3s", padding: "20px 0" }}>
        <Container>
          <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')} style={{ color: "#fff" }}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')} style={{ color: "#fff" }}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')} style={{ color: "#fff" }}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>
              <HashLink to='#connect'>
                <button style={{ border: "1px solid #fff", color: "#fff", background: "transparent", padding: "6px 15px" }}>
                  <span>Let’s Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 본문 */}
      <div className="container-custom">
        {/* 사이드바 */}
        <aside className="sidebar">
          <h2 className="activity-title">나의 활동</h2>
          <div className="activity-bar"></div>

          <div className="profile-container">
            <div className="profile-img-wrapper">
              <img src={profileImage} alt="프로필" className="profile-img" />
            </div>

            <div className="profile-info">
              <div className="nickname-row">
                <p className="nickname">홍길동</p>
                <p className="fixed-nick">@길동이</p>
              </div>
              <p><strong>가입일:</strong> 2023년 3월 10일</p>
            </div>
            <div className="activity-bar2"></div>

            <div className="follow-container">
              <div className="follow-info">
                <div>팔로워 <span>123</span></div>
                <div>팔로잉 <span>456</span></div>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <span>게시글 <strong>10</strong></span>
            <span>댓글 <strong>3</strong></span>
            <span>저장 <strong>7</strong></span>
          </div>

          {/* 0513 */}
          <button
            className="edit-profile-btn"
            onClick={() => navigate('/profile')}
          >
            프로필 수정
          </button>


          <div className="sns-links">
            <div className="sns-text-links">
              <p>Instagram: {instagram !== 'none' ? <a href={instagram}>바로가기</a> : '연결되지 않음'}</p>
              <p>Twitter: {twitter !== 'none' ? <a href={twitter}>바로가기</a> : '연결되지 않음'}</p>
              <p>Facebook: {facebook !== 'none' ? <a href={facebook}>바로가기</a> : '연결되지 않음'}</p>
            </div>
          </div>


        </aside>


        {/* 콘텐츠 영역 */}
        <section className="content center-tab">
          <div className="tab-buttons">
            <button onClick={() => setSelectedTab("posts")} className={selectedTab === "posts" ? "active" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M479.23-185.39q-48.38-35.69-104-55.15Q319.62-260 260-260q-36.61 0-71.92 8.11Q152.77-243.77 120-228q-21.38 9.84-40.69-2.93Q60-243.69 60-267.08v-433.53q0-12.93 6.85-23.89 6.84-10.96 19-15.96 40.61-19.77 84.65-29.65Q214.54-780 260-780q58.38 0 113.69 16.54Q429-746.92 480-716.92v459.38q50.62-32 106.81-47.23Q643-320 700-320q34.46 0 65.11 4.85 30.66 4.84 63.35 15.3 4.23 1.16 7.89.2 3.65-.97 3.65-6.35v-449.23q10.38 3.08 20.27 6.85 9.88 3.77 19.27 9.46 10.23 5 15.34 14.61 5.12 9.62 5.12 20.62v435.84q0 23.39-19.89 35.96-19.88 12.58-42.42 3.12-32.38-15.39-67.11-23.31Q735.85-260 700-260q-60 0-116.38 18.88-56.39 18.89-104.39 55.73ZM560-360v-360l200-200v380L560-360Zm-140 73.46v-394.07q-37.61-18.62-77.92-29.01Q301.77-720 260-720q-37 0-70.27 6.81-33.27 6.81-62.42 18.88-3.08 1.16-5.19 3.27-2.12 2.12-2.12 5.19v381.23q0 5.39 3.65 6.35 3.66.96 7.89-.58 29.61-10.69 61.04-15.92Q224-320 260-320q44.85 0 85.69 9.27 40.85 9.27 74.31 24.19Zm0 0v-394.07 394.07Z" />
              </svg>
            </button>
            <button onClick={() => setSelectedTab("comments")} className={selectedTab === "comments" ? "active" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M860-118.46 718.46-260H172.31Q142-260 121-281q-21-21-21-51.31v-455.38Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v669.23ZM172.31-320H744l56 55.39v-523.08q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM160-320v-480 480Z" />
              </svg>
            </button>
            <button onClick={() => setSelectedTab("saved")} className={selectedTab === "saved" ? "active" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
              </svg>
            </button>
          </div>

          {/* 내 게시글 */}
          {selectedTab === "posts" && (
            <div className="grid">
              {userPosts.map((post) => (
                <div key={post.id} className="card">
                  <div className="card-image-wrapper">
                    <img src={post.imageUrl} alt={post.title} className="card-image" />
                    <div className="card-overlay">
                      <div className="card-text">{post.title}</div>
                      <div className="card-date">{post.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 내가 작성한 댓글 */}
          {selectedTab === "comments" && (
            <ul className="comment-list">
              {userComments.map((comment) => (
                <li key={comment.id} className="comment-item">💬 {comment.content}</li>
              ))}
            </ul>
          )}

          {/* 저장한 글 */}
          {selectedTab === "saved" && (
            <div className="grid">
              {savedPosts.map((post) => (
                <div key={post.id} className="saved-card">
                  <div className="saved-card-image-wrapper">
                    <img src={post.imageUrl} alt={post.title} className="saved-card-image" />
                    <div className="saved-card-overlay">
                      <div className="saved-card-text">{post.title}</div>
                      <div className="saved-card-date">{post.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>
      </div >
      </>
  );
};

export default MyPage;