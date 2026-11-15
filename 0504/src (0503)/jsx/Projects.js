import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import projImg1 from "../images/project-img1.png";
import projImg2 from "../images/project-img2.png";
import projImg3 from "../images/project-img3.png";
import colorSharp2 from "../images/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const weeklyProjects = {
    sun: [
      { title: "일요 전시", description: "사진 전시회", imgUrl: projImg1 },
    ],
    mon: [
      { title: "월요 행사", description: "디자인 워크샵", imgUrl: projImg2 },
    ],
    tue: [
      { title: "화요 컨퍼런스", description: "IT 트렌드", imgUrl: projImg3 },
    ],
    wed: [
      { title: "수요 모임", description: "일러스트레이션 세미나", imgUrl: projImg1 },
    ],
    thu: [],
    fri: [
      { title: "금요 마켓", description: "핸드메이드 플리마켓", imgUrl: projImg2 },
    ],
    sat: [
      { title: "토요 축제", description: "거리 문화축제", imgUrl: projImg3 },
    ],
  };

  const dayTabs = [
    { key: 'sun', label: '일' },
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
  ];

  const todayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
  const [activeKey, setActiveKey] = useState(todayKey);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>다가오는 전시 · 행사 일정</h2>
                  <p>요일별로 열리는 전시와 행사를 확인해보세요!</p>

                  <div className="day-circle-tabs">
                    {dayTabs.map(({ key, label }) => {
                      const isToday = key === todayKey;
                      return (
                        <div key={key} className="day-circle-btn-container">
                          <button
                            className={`day-circle-btn ${activeKey === key ? 'active' : ''} ${isToday ? 'today' : ''}`}
                            onClick={() => setActiveKey(key)}
                          >
                            {label}
                          </button>
                          {isToday && <span className="today-indicator"></span>} {/* 오늘 요일인 경우 작은 점 표시 */}
                        </div>
                      );
                    })}
                  </div>

                  <div className="horizontal-scroll-container">
                    {weeklyProjects[activeKey].length > 0 ? (
                      // 해당 요일의 프로젝트들을 동적으로 출력
                      weeklyProjects[activeKey].map((project, index) => (
                        <div key={index} className="horizontal-card">
                          <img src={project.imgUrl} alt={project.title} className="card-thumb" />
                          <div className="card-info">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-message">
                        📭 이 날은 예정된 일정이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="bg-decor" />
    </section>
  );
};
