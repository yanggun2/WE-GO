import React, { useState, useEffect } from 'react';
import '../css/Exhibition.css';

export const Exhibition = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('서울');  // 기본 카테고리는 '서울'
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지당 항목 수

  const apiKey = 'KXWwko5%2FUXOIyDX88ddpKWY7%2B8UDIopraGlBkm738JD%2Fs%2BggElLNDojqAVckELa8CGY8eTEEc5OMzsuzJ344Zw%3D%3D'; // 발급받은 API 키

  // API 호출
  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        const url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=MyTravelApp&keyword=전시&_type=json`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // 데이터 구조를 확인

        setExhibitions(data.response.body.items.item || []);
        setFilteredExhibitions(data.response.body.items.item || []); // 필터링된 전시 데이터 초기화
      } catch (error) {
        console.error("Failed to fetch exhibitions data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // 선택한 카테고리로 전시 필터링
  const filterByCategory = (category) => {
    setSelectedCategory(category);

    // 해당 지역의 전시 데이터만 필터링
    const filtered = exhibitions.filter(exhibition => exhibition.addr1 && exhibition.addr1.includes(category));
    setFilteredExhibitions(filtered);
    setCurrentPage(1); // 카테고리 변경 시 페이지 1로 리셋
  };

  // 페이지네이션 처리: 현재 페이지에 맞는 항목만 필터링
  const currentExhibitions = filteredExhibitions.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // 페이지 이동 처리
  const nextPage = () => {
    if (currentPage * itemsPerPage < filteredExhibitions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="exhibition-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 카테고리 버튼 */}
          <div className="category-buttons">
            <button onClick={() => filterByCategory('서울')} className={selectedCategory === '서울' ? 'active' : ''}>
              서울
            </button>
            <button onClick={() => filterByCategory('부산')} className={selectedCategory === '부산' ? 'active' : ''}>
              부산
            </button>
            <button onClick={() => filterByCategory('대구')} className={selectedCategory === '대구' ? 'active' : ''}>
              대구
            </button>
            <button onClick={() => filterByCategory('광주')} className={selectedCategory === '광주' ? 'active' : ''}>
              광주
            </button>
          </div>

          <h2>{selectedCategory} 전시 및 행사</h2>

          <div className="exhibition-list">
            {currentExhibitions.map((exhibition) => (
              <div key={exhibition.title} className="exhibition-item">
                <img
                  src={exhibition.firstimage || 'https://via.placeholder.com/150'}
                  alt={exhibition.title}
                />
                <h4>{exhibition.title}</h4>
                <p>{exhibition.addr1}</p> {/* 주소 */}
              </div>
            ))}
          </div>

          {/* 페이지네이션 버튼 */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              이전 페이지
            </button>
            <button 
              onClick={nextPage} 
              disabled={currentPage * itemsPerPage >= filteredExhibitions.length}
            >
              다음 페이지
            </button>
          </div>
        </>
      )}
    </div>
  );
};
