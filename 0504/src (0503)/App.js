import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// 공통 컴포넌트
import { NavBar } from './jsx/NavBar';
import { Banner } from './jsx/Banner';
import { Skills } from './jsx/Skills';
import Adv from './jsx/Adv';
import { Projects } from './jsx/Projects';
import { Contact } from './jsx/Contact';
import { Footer } from './jsx/Footer';

// 사용자 페이지
import About from './jsx/About';
import Setting from './jsx/Setting';
import Map from './jsx/Map';
import KoreaMap from './jsx/KoreaMap';
import GlobalMap from './jsx/GlobalMap';
import KoreaDetail from './jsx/KoreaDetail';
import GlobalDetail from './jsx/GlobalDetail';
import PostForm from './jsx/PostForm';

// 로그인/회원가입/프로필
import Joinus from './jsx/Joinus';
import Profile from './jsx/Profile';

// 채원
import MyPage from './jsx/MyPage';

function App() {
  const location = useLocation();
  const isFullPage = location.pathname === '/joinus' || location.pathname === '/profile';

  return (
    <ThemeProvider>
      <div className="App">
        {!isFullPage && <NavBar />}

        <Routes>
          {/* 메인 홈페이지 */}
          <Route path="/" element={
            <>
              <Banner />
              <Skills />
              <Adv />
              <Projects />
              <Contact />
              <Footer />
            </>
          } />
          {/* 테스트용 */}
          <Route path="/post/new" element={<PostForm user={{ name: '테스트유저' }} />} />


          {/* 추가 페이지들 */}
          <Route path="/about" element={<><About /><Footer /></>} />
          <Route path="/setting" element={<><Setting /><Footer /></>} />
          <Route path="/map" element={<><Map /><Footer /></>} />
          <Route path="/map/korea" element={<KoreaMap />} />
          <Route path="/map/global" element={<GlobalMap />} />
          <Route path="/map/korea/detail" element={<KoreaDetail />} />
          <Route path="/map/global/detail" element={<GlobalDetail />} />
          <Route path="/post/new" element={<PostForm />} />

          {/* 회원가입/로그인 */}
          <Route path="/joinus" element={<Joinus />} />
          {/* 프로필 페이지 */}
          <Route path="/profile" element={<Profile />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<><MyPage /><Footer /></>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
