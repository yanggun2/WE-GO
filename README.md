# WE-GO · 위고

**지도에서 여행지를 탐색하고 여행 정보를 공유하는 여행 웹 프로젝트**입니다. 3학년 1학기 프로젝트구현 수업에서 MZ세대와 외국인 관광객을 위한 맞춤형 여행 서비스를 목표로 개발했습니다.

기존 프로젝트 소개와 이 저장소에 포함된 날짜별 소스 코드를 함께 정리했습니다.

## 주요 기능

- 국내·해외 지도 탐색: React Leaflet, OpenStreetMap 타일, GeoJSON 경계 데이터
- 지역·카테고리별 여행 게시글 조회 및 이미지 포함 게시글 작성
- 이메일 기반 회원가입·로그인, 프로필·마이페이지
- 게시글 및 회원 관리 화면, 회원 관리자 권한 변경 API
- 다크·라이트 테마 전환
- OpenRouter 연동 여행 추천 질문 API(`/ask`)
- 행사 달력, 소개·FAQ 및 문의 화면

기존 README의 ‘선호·검색 이력 기반 추천’, 리뷰, 공지 관리와 5월 27일 이후 상세 에디터·통계 기능은 기획·개발 기록입니다. 이 저장소에서 확인한 최신 날짜 폴더는 `0520/`이며, 이후 최종 통합본 전체가 포함되었다고 보장하지 않습니다. 예를 들어 `0520` 게시글 라우터는 작성·목록·삭제를 제공하며 별도 리뷰 API는 확인되지 않습니다.

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| 프론트엔드 | React, React Router, Axios, React Bootstrap, React Leaflet |
| 지도·데이터 | Leaflet, OpenStreetMap, GeoJSON, JSON |
| 백엔드 | Node.js, Express, mysql2, bcrypt, Multer, dotenv |
| 데이터베이스 | MySQL / MariaDB |
| AI 연동 | OpenRouter API |

## 저장소 구성

```text
0503/                  # 초기 React 화면·지도 개발본
0504/                  # 프론트엔드 및 백엔드 중간 개발본
0520/
├── src/               # 사용자 화면, 지도, 관리자, 달력 등
└── backend/
    ├── index.js       # 인증·회원정보·AI API, 서버 시작
    ├── routes/posts.js
    ├── routes/users.js
    ├── uploads/       # 원본 업로드 이미지
    ├── package.json
    └── .env.example
초기세팅.txt            # 최초 개발환경 구성 메모
wego 기록.txt          # 개발 기록
*.hwp / *.pptx         # 계획서 및 발표 자료
```

날짜별 폴더와 발표 자료는 원본 배치를 유지했습니다. 재설치 가능한 `node_modules/`와 실제 `.env`는 제외했습니다.

## 실행 준비

### 백엔드

Node.js와 MySQL/MariaDB를 준비하고 `wego_db` 데이터베이스를 구성합니다. `0520/backend/index.js`, `routes/posts.js`, `routes/users.js`의 DB 연결값을 본인 환경에 맞춰야 합니다. 현재 DB 연결은 환경변수 대신 코드에 지정되어 있습니다.

```bash
cd 0520/backend
npm ci
cp .env.example .env
npm start
```

서버 기본 주소는 `http://localhost:5000`입니다. AI 기능을 사용하려면 `.env`의 `OPENROUTER_API_KEY`를 설정하고 코드의 모델 식별자가 현재도 제공되는지 확인합니다. 원본 서버에는 키를 출력하는 디버그 로그가 있으므로 실제 키를 사용하기 전에 해당 로그를 제거해야 합니다.

DB 전체 초기화 SQL은 포함되어 있지 않습니다. 코드가 참조하는 `user`, `posts` 테이블을 준비해야 하며, 기존 개발 기록의 posts 스키마에 `user_id`, user 테이블에 `is_admin` 등이 필요합니다. DB 스키마를 구성하기 전에는 로그인·게시글 API가 정상 동작하지 않습니다.

### 프론트엔드

`0520/src`는 React 소스 스냅샷으로 **프론트엔드 루트 `package.json`과 `public/index.html`이 포함되어 있지 않습니다.** 따라서 이 폴더에서 바로 `npm start`를 실행할 수 없습니다. 별도 React 실행 프로젝트를 준비하고 소스·자산을 옮긴 뒤 import에 맞춰 의존성을 구성해야 합니다.

사용 패키지에는 `react-router-dom`, `axios`, `bootstrap`, `react-bootstrap`, `react-bootstrap-icons`, `react-icons`, `leaflet`, `react-leaflet`, `framer-motion`, `react-multi-carousel`, `react-on-screen`, `react-router-hash-link`, `react-mailchimp-subscribe` 등이 있습니다. 호환 버전 선정과 API 주소 확인이 필요합니다.

현재 저장소는 개발 자료와 소스를 보존한 분리본이며, 실행 환경 복원이나 배포 완료를 의미하지 않습니다.

## 출처 및 개발 기록

[ProjectTeam](https://github.com/yanggun2/ProjectTeam)의 `WE-GO` 폴더와 루트 README의 위고 설명을 바탕으로 분리했습니다. 기존 기록에는 5월 지도·게시글·관리자 기능 개발과 6월 17일 최종 통합 완료가 기재되어 있습니다. 원본 저장소는 유지합니다.
