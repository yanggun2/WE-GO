import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/EventDetailPage.css';

const EventDetailPage = () => {
  const location = useLocation();
  const { contentid } = location.state || {}; // 전달받은 contentid
  const [eventDetail, setEventDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const apiKey = 'KXWwko5%2FUXOIyDX88ddpKWY7%2B8UDIopraGlBkm738JD%2Fs%2BggElLNDojqAVckELa8CGY8eTEEc5OMzsuzJ344Zw%3D%3D';  // 실제 API Key로 대체
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${apiKey}&MobileOS=ETC&MobileApp=MyApp&contentId=${contentid}&defaultYN=Y&overviewYN=Y&_type=json`
      );
      const data = await response.json();
      const item = data.response?.body?.items?.item?.[0];
      setEventDetail(item);
    };

    if (contentid) {
      fetchDetail();
    }
  }, [contentid]);

  if (!eventDetail) return <div>로딩 중...</div>;

  let homepageUrl = eventDetail.homepage;
  if (homepageUrl) {
    // HTML 태그로 오는 경우 제거 (ex: <a href=...>)
    const match = homepageUrl.match(/href=["']?(https?:\/\/[^"'>]+)/);
    if (match) {
      homepageUrl = match[1];
    } else if (!homepageUrl.startsWith('http')) {
      homepageUrl = 'http://' + homepageUrl;
    }
  }

  return (
    <div className="event-detail">
      <h2>{eventDetail.title}</h2>
      <p><strong>주소:</strong> {eventDetail.addr1}</p>
      <p><strong>개요:</strong> {eventDetail.overview}</p>
      <p><strong>홈페이지:</strong> {' '}
        {homepageUrl ? (
          <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
            홈페이지 바로가기
          </a>
        ) : (
          '제공된 홈페이지 정보 없음'
        )}
      </p>
    </div>
  );
};

export default EventDetailPage;
