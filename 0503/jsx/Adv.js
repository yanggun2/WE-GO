import React, { useState, useEffect } from 'react';
import '../App.css'; // 또는 별도 CSS

import adv1 from '../images/adv1.jpg';
import adv2 from '../images/adv2.jpg';
import adv3 from '../images/adv3.jpg';

const ads = [
  {
    image: adv1,
    title: '금호미술관: 금호 아티스트',
    subtitle: '지금 전시 10% 할인받고 예매하기',
  },
  {
    image: adv2,
    title: '에꼴 드 퍼퓨머리문 한남',
    subtitle: '지금 프리미엄 향수 클래스 예매하기',
  },
  {
    image: adv3,
    title: '한국의집 궁중 다과 체험',
    subtitle: '지금 바로 선착순 예매하기',
  },
];

const Adv = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextAd();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="adv-banner">
      <button className="adv-arrow left" onClick={prevAd}>‹</button>

      <div className="adv-content">
        <img src={ads[currentAd].image} alt="광고 이미지" className="adv-img" />
        <div className="adv-text">
          <h3 className="adv-title">{ads[currentAd].title}</h3>
          <p className="adv-subtitle">{ads[currentAd].subtitle}</p>
        </div>
      </div>

      <button className="adv-arrow right" onClick={nextAd}>›</button>
    </div>
  );
};

export default Adv;
