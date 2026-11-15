import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Calendar.css';
import { useNavigate } from "react-router-dom";


export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [offset, setOffset] = useState(0); // 주 단위 오프셋
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4); // 처음 보이는 개수

  const getStartOfWeek = (baseDate) => {
    const date = new Date(baseDate);
    const day = date.getDay(); // 0: 일요일
    date.setDate(date.getDate() - day);
    return date;
  };

  const getWeekDates = (offset) => {
    const start = getStartOfWeek(new Date());
    const weekStart = new Date(start);
    weekStart.setDate(weekStart.getDate() + offset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates(offset);

  const navigate = useNavigate();

const handleCardClick = (contentid) => {
  navigate('/event-detail', { state: { contentid } });
};

  

  // 이벤트 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'KXWwko5%2FUXOIyDX88ddpKWY7%2B8UDIopraGlBkm738JD%2Fs%2BggElLNDojqAVckELa8CGY8eTEEc5OMzsuzJ344Zw%3D%3D';
      const formattedDate = selectedDate.toISOString().slice(0, 10).replace(/-/g, '');

      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=MyTravelApp&eventStartDate=${formattedDate}&_type=json&numOfRows=100`
        );
        const data = await response.json();
        const items = data.response?.body?.items?.item || [];

        const filteredEvents = items
          .filter(item => {
            if (searchQuery === "") return true;
            return (
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.addr1 && item.addr1.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          })
          .map(item => ({
            title: item.title,
            description: item.addr1 || '',
            image: item.firstimage || 'https://via.placeholder.com/150',
            startDate: item.eventstartdate,
            endDate: item.eventenddate,
            contentid: item.contentid // ✅ 추가!
          }));

        setEvents(filteredEvents);
        setVisibleCount(4); // 날짜 바뀌면 처음부터 4개 보이게
      } catch (error) {
        console.error("API fetch error:", error);
        setEvents([]);
      }
    };

    fetchData();
  }, [selectedDate, searchQuery]);

  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const handlePrev = () => {
    setOffset(offset - 1);
  };

  const handleNext = () => {
    setOffset(offset + 1);
  };

  const handleMoreClick = () => {
    if (visibleCount < events.length) {
      setVisibleCount(prev => prev + 4);
    } else {
      alert("행사가 더 없습니다.");
    }
  };

  return (
    <div className="calendar-page">
      <h2>📅 {formatDate(selectedDate)}</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="date-header-container">
        <button onClick={handlePrev} className="arrow-btn">◀</button>
        <div className="date-list">
          {weekDates.map((date, idx) => {
            const isSelected = selectedDate.toDateString() === date.toDateString();
            return (
              <div
                key={idx}
                className={`date-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="day">{date.toLocaleDateString('ko-KR', { weekday: 'short' })}</div>
                <div className="num">{date.getDate()}</div>
              </div>
            );
          })}
        </div>
        <button onClick={handleNext} className="arrow-btn">▶</button>
      </div>

      <div className="event-list">
  {events.length > 0 ? (
    events.slice(0, visibleCount).map((event, idx) => (
      <div 
        key={idx} 
        className="event-card"
        onClick={() => handleCardClick(event.contentid)} // ✅ 클릭 시 상세 페이지 이동
        style={{ cursor: 'pointer' }} // 사용자에게 클릭 가능한 느낌 줌
      >
        <img src={event.image} alt={event.title} />
        <div className="event-info">
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>{event.startDate} ~ {event.endDate || event.startDate}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="no-events">📭 해당 날짜에 예정된 행사가 없습니다.</p>
  )}
</div>

{/* 항상 표시되는 버튼 */}
<button onClick={handleMoreClick} className="more-btn">더보기</button>

<Link to="/" className="back-btn">뒤로가기</Link>
</div>
  );
};