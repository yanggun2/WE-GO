// ✅ 통합 NavBar.js (기존 로그인 상태 확인 + 사이드메뉴/다크모드/FAQ)
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../images/logo.svg';
import navIcon1 from '../images/nav-icon1.svg';
import navIcon2 from '../images/nav-icon2.svg';
import navIcon3 from '../images/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import FAQModal from './FAQModal';
import logoDark from '../images/logo_light.png';
import logoLight from '../images/logo_dark.png';


export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const { darkMode } = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
  
    const checkLogin = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
  
    checkLogin(); // 처음 한번 실행
    const interval = setInterval(checkLogin, 1000); // 1초마다 로그인 상태 확인
  
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, []);
  

  const onUpdateActiveLink = (value) => setActiveLink(value);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleFA = () => {
    setShowFAQModal(true);
    toggleMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };
  const currentLogo = document.body.classList.contains('light') ? logoDark : logoLight;
  return (
    <>
      <Navbar expand="md" className={scrolled ? "scrolled header" : "header"}>
        <Container>
        <Navbar.Brand href="/">
          <img src={currentLogo} alt="Logo" style={{ height: '40px' }} />
        </Navbar.Brand>

          <Nav className="ms-auto header__center">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>

          <span className="navbar-text header__right">
            <div className="social-icon">
              <a href="#"><img src={navIcon1} alt="" /></a>
              <a href="#"><img src={navIcon2} alt="" /></a>
              <a href="#"><img src={navIcon3} alt="" /></a>
            </div>

            {/* 0513 수정 */}
            {/* 0520 추가 수정 */}
            {user ? (
              <>
                <button
                  className="vvd"
                  onClick={() => {
                    if (user.is_admin) {
                      navigate('/admin');
                    } else {
                      navigate('/mypage');
                    }
                  }}
                >
                  <span>👤 {user.name}</span>
                </button>
                <button className="vvd" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/joinus">
                <button className="vvd"><span>Let’s Connect</span></button>
              </Link>
            )}
            
            {/* 햄버거 메뉴 열기 버튼 */}
            <div className="hamburger-menu" onClick={toggleMenu}>
              <FiMenu size={32} />
            </div>
          </span>
        </Container>
      </Navbar>

      {/* 오버레이 (검은 배경) */}
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

      {/* 사이드 메뉴 */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>
          <FiX size={32} />
        </div>
        <ul className="side-menu__list">
          <Link to="/about" onClick={toggleMenu}><li className="side-menu__item">About</li></Link>
          <li className="side-menu__item" onClick={handleFA}>F&A</li>
          <Link to="/setting" onClick={toggleMenu}><li className="side-menu__item">Setting</li></Link>
          <Link to="/map" onClick={toggleMenu}><li className="side-menu__item">Map</li></Link>
        </ul>
      </div>

      {/* FAQ 모달 */}
      {showFAQModal && <FAQModal onClose={() => setShowFAQModal(false)} />}
    </>
  );
};

export default NavBar;
