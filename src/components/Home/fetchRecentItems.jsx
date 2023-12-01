import axios from 'axios';

export async function fetchRecentItems() {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const formatDateString = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return year + month + day;
  };

  const todayString = formatDateString(today);
  const yesterdayString = formatDateString(yesterday);
  const url =
    'http://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd';
  const serviceKey = decodeURIComponent(
    'ANqqJt8CTWuvlA%2BWsV9WzIpKzY3RQAarn%2F2QkJD1AN3FYzZS6zMsDuq%2B8jDbXE6fXW8u50ZbGWdAWYLEzXK2TQ%3D%3D',
  );

  const queryParams = {
    serviceKey, // 서비스 키
    N_FD_LCT_CD: 'LCA000',
    START_YMD: '20231201',
    END_YMD: todayString,
    pageNo: 1, // 페이지 번호
    numOfRows: '100', // 행 수
  };

  try {
    const response = await axios.get(url, { params: queryParams });

    const lostItems = response.data.response.body.items.item;
    const numOfRows = response.data.response.body.numOfRows;
    const pageNo = response.data.response.body.pageNo;
    const totalCount = response.data.response.body.totalCount;

    const results = [];
    for (const lostItem of lostItems) {
      if (
        lostItem.fdFilePathImg ===
        'https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif'
      ) {
        continue; // 이 이미지 URL을 가진 아이템은 건너뛰고 다음 반복으로 넘어감
      }
      const item = {
        id: lostItem.atcId,
        content: lostItem.fdSbjt,
        name: lostItem.fdPrdtNm,
        imageUrl: lostItem.fdFilePathImg,
        date: lostItem.fdYmd,
        location: lostItem.depPlace,
        productCategory: lostItem.prdtClNm,
        totalCount,
      };

      if (
        item.imageUrl !==
        'https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif'
      ) {
        results.push(item);
      }
    }

    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}
