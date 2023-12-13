🔍 LAF(Lost And Found) : 분실물을 찾아주는 사이트
====
![laf_logo](https://github.com/elice-team03/gazago/assets/90834728/ab99560f-c4c6-4e94-8453-a2041cd45a72)<br/>

당신의 소중한 물건을 쉽고 빠르게 찾아드리는 라프(LAF) 프로젝트입니다.

[🍊 라프 방문하기](http://kdt-sw-6-team10.elicecoding.com/)



✔️ 팀원 소개
----
|Front-end|Back-end|
|------|---|
|김성재(팀장)| 박원빈|
|김상준| 정현진|
|오성현| 
|이성민| 

✔️ 프로젝트 기간
----
📆  2023.11.13(월) ~ 2023.12.01(금)  **[3주]**

✔️ 프로젝트 개요
----
**분실물 안내 서비스**
- 공공 API를 활용해 실시간 경찰서 및 대중교통에서 보관 중인 분실물과 위치를 확인할 수 있습니다.
  
**커뮤니티 서비스**
-  사람들이 주운 물건을 공유하거나 잃어버린 물건을 찾을 수 있게 돕습니다.
  
**채팅 서비스**
- 1:1 채팅 기능을 통해 물건 주인과 주운 사람이 직접 상호작용할 수 있습니다.

⚙ 기술 스택
----
### Programming language
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

### Front-end
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"> <br/><img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white">


### Back-end
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white"> <br/>
<img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=JWT&logoColor=white">
<img src="https://img.shields.io/badge/passport-2fca6d?style=for-the-badge&logo=passport&logoColor=white">   <img src="https://img.shields.io/badge/stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white">

### 

✔️ 주요 기능(gif파일 추가해주세요)
----
|||
|--------|-----|
|**메인페이지**|**검색결과**|
|||
|**회원가입**|**로그인&비밀번호찾기**|
|||
|**게시판**|**게시글작성**|
|<img src="https://github.com/elice-team10/Frontend/assets/90834728/8f3a6201-63c0-4608-a301-4be91d29396c" width="480px">|<img src="https://github.com/elice-team10/Frontend/assets/90834728/c87a5c6f-8697-4c04-a92e-62a296eb8d83" width="480px">|
|**게시글수정삭제**|**댓글**|
|<img src="https://github.com/elice-team10/Frontend/assets/90834728/06766ac1-72cc-465c-9ca8-bdee87576aa8" width="480px">|<img src="https://github.com/elice-team10/Frontend/assets/90834728/136d67d6-a3ca-461b-a12b-0aeb07863693" width="480px">|
|****|****|
|||

✔️ 기획
----
### 1. 페르소나
### 2. 스토리보드
### 3. 와이어 프레임
### 4. ERD(백엔드)
### 5. API 명세서(백엔드)
![유저](https://github.com/elice-team10/Frontend/assets/117796843/8791bc6b-6b23-47d1-b022-b6109a7a3271)
![게시글](https://github.com/elice-team10/Frontend/assets/117796843/e0d62491-bd9c-4b6b-a5f1-59cff03d2554)
![댓글](https://github.com/elice-team10/Frontend/assets/117796843/c18810ca-d247-431d-9a23-a2f8b26ab612)
![chat](https://github.com/elice-team10/Backend/assets/117796843/36c7e785-a70d-450f-ba7b-30763c606bf4)
### 6. 아키텍처
### 7. 폴더 구조
Front-end
```bash
├── public
│   ├─assets
├── src
│   ├── api
│   ├── components
│   ├── config
│   ├── context
│   ├── hooks
│   ├── pages
│   └── utils
└── app.jsx
```
Back-end(백엔드)
```bash
├── src
│   ├── db
│   │    ├── models
│   │    └── schemas
│   ├── middlewares
│   ├── routers
│   └── services
│   └── app.js
└── errGenerator.js
└── index.js
```

### 8. 협업 도구
[Notion](https://www.notion.so/Team10-2-d62a473dd76e42e98db6ee6aca9d2c31)

✔️ 담당 기능
----
### Front-end
#### 김성재
#### 김상준
#### 오성현
#### 이성민
* 메인페이지
  * 검색창 ui 구현
  * 공공 데이터 api 연결 (2개)
    * 경찰청 습득물 공공데이터 사용
    * 경찰청 산화기관 이외 (지하철,공항...) 공공데이터 api 사용
  * 검색 필터링 기능
    * 지역별, 지하철 노선 별 필터링 구현
    * "찾았어요", "주웠어요" 카테고리 별 게시판 글 필터링 구현  
  * 하단 화면 구성
    * 자주 잃어버리는 물건들을 카드 슬라이더 형태로 배치 -> 클릭시 해당 항목 검색결과 보여줌
    * 최근에 습득한 물건 표시 -> 클릭시 최근 습득 물건 보여줌
  * localStorage를 이용하여 검색기록 확인
* 검색결과 페이지
  * 검색결과 항목들을 Grid 형태로 나열
  * 아이템 클릭시 분실물 상세 정보 표시
    * 모달창으로 표시
    * 이미지 클릭시 원본 크기로 표시 
  * 보관 장소별 필터링, 게시판 글 필터링 기능 구현
  * "더보기" 버튼 클릭시 검색결과의 다음 페이지 요청



----
### Back-end(백엔드)
#### 박원빈
#### 정현진
