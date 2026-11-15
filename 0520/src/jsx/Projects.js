import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import { Link } from "react-router-dom";
import '../App.css'; 

export const Projects = () => {
  const [weeklyProjects, setWeeklyProjects] = useState({
    sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: []
  });
  const [loading, setLoading] = useState(true);

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

  const getThisWeeksDateByDayKey = (dayKey) => {
    const today = new Date();
    const currentDay = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);

    const dayIndexMap = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    const targetIndex = dayIndexMap[dayKey];

    const targetDate = new Date(weekStart);
    targetDate.setDate(weekStart.getDate() + targetIndex);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate;
  };

  useEffect(() => {
    const fetchFestivalData = async () => {
      setLoading(true);
      try {
        const apiKey = 'KXWwko5%2FUXOIyDX88ddpKWY7%2B8UDIopraGlBkm738JD%2Fs%2BggElLNDojqAVckELa8CGY8eTEEc5OMzsuzJ344Zw%3D%3D';
        const today = new Date();
        const startDate = today.toISOString().slice(0, 10).replace(/-/g, '');

        const url = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=MyTravelApp&eventStartDate=${startDate}&_type=json&numOfRows=100`;

        const response = await fetch(url);
        const data = await response.json();
        const items = data.response?.body?.items?.item || [];

        const projectsByDay = {
          sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: []
        };

        const formatDate = (dateStr) => {
          return new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`);
        };

        items.forEach((event) => {
          const rawStartDate = event.eventstartdate;
          const rawEndDate = event.eventenddate;
          if (!rawStartDate) return;

          const eventStartDate = formatDate(rawStartDate);
          const eventEndDate = rawEndDate ? formatDate(rawEndDate) : eventStartDate;
          eventStartDate.setHours(0, 0, 0, 0);
          eventEndDate.setHours(0, 0, 0, 0);

          dayTabs.forEach(({ key }) => {
            const targetDate = getThisWeeksDateByDayKey(key);
            if (targetDate >= eventStartDate && targetDate <= eventEndDate) {
              projectsByDay[key].push({
                title: event.title,
                description: event.addr1 || '',
                eventStartDate: eventStartDate.toISOString(),
                eventEndDate: eventEndDate.toISOString(),
                imgUrl: event.firstimage || 'https://via.placeholder.com/150',
              });
            }
          });
        });

        setWeeklyProjects(projectsByDay);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivalData();
  }, []);

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`;
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>요일별 전시 · 행사 일정</h2>
                  <p>이번 주, 어떤 전시가 열리는지 확인해보세요!</p>

                  {/* 요일 버튼 */}
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
                          {isToday && <span className="today-indicator"></span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* 카드 리스트 */}
                  <div className="vertical-card-list">
                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      weeklyProjects[activeKey].length > 0 ? (
                        <>
                          {weeklyProjects[activeKey].slice(0, 4).map((project, index) => (
                            <div key={index} className="vertical-card">
                              <div className="card-text">
                                <span className="card-type">전시</span>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                                <p>{formatDateRange(project.eventStartDate, project.eventEndDate)}</p>
                              </div>
                              <img
                                src={project.imgUrl}
                                alt={project.title}
                                className="card-image"
                              />
                            </div>
                          ))}
                          {weeklyProjects[activeKey].length > 4 && (
                            <Link to="/calendar" className="more-btn">더보기</Link>
                          )}
                        </>
                      ) : (
                        <div className="empty-message">📭 이 날은 예정된 일정이 없습니다.</div>
                      )
                    )}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
