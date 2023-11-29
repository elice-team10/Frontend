import axios from 'axios';

export async function fetchSubwayItems(productName, place, page) {
  const url =
    'http://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundInfoAccTpNmCstdyPlace'; // 경찰청외 포털기관 (지하철, 공항..)
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // Service key
  );
  const queryParams = {
    serviceKey, // 서비스 키
    PRDT_NM: productName, // 상품명
    DEP_PLACE: place, // 보관 장소
    pageNo: page, // 페이지 번호
    numOfRows: '20', // 행 수
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    // XML 파싱을 위한 파서 생성
    // const parser = new XMLParser();
    // const parsedResponse = parser.parse(response.data);
    console.log(response);
    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const arr = [];
    for (const lostItem of lostItems) {
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
        totalCount,
      };

      arr.push(item);
    }
    // 결과 출력
    console.log('Parsed Body:', arr);
    console.log(
      `Num of Rows:${numOfRows}, Page No. : ${pageNo}, Total Count : ${totalCount}`,
    );
    return arr;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchLostItems(productName, place, page) {
  const url =
    'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccTpNmCstdyPlace'; // 경찰청 포털기관
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D', // 경찰청 포털기관 Service Key
  );
  const queryParams = {
    serviceKey, // 서비스 키
    PRDT_NM: productName, // 상품명
    DEP_PLACE: place, // 보관 장소
    pageNo: page, // 페이지 번호
    numOfRows: '20', // 행 수
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    console.log(response);
    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const arr = [];
    for (const lostItem of lostItems) {
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
        totalCount,
      };

      arr.push(item);
    }

    console.log('Parsed Body:', arr);
    console.log(
      `Num of Rows:${numOfRows}, Page No. : ${pageNo}, Total Count : ${totalCount}`,
    );

    return arr;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchCommunity(searchTerm, category) {
  const url = 'http://kdt-sw-6-team10.elicecoding.com/api/post';

  const queryParams = {
    word: searchTerm, // 상품명
    board_category: category, // 카테고리
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    console.log(response);

    const arr = [];
    for (const res of response.data) {
      const item = {
        category: res.board_category,
        id: res._id,
        content: res.content,
        name: res.title,
        imageUrl: res.picture,
        date: res.event_date,
        location: res.event_location,
      };

      arr.push(item);
    }

    return arr;
  } catch (error) {
    console.error('Error:', error);
  }
}
