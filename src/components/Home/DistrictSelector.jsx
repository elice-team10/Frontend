import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // 위치 아이콘
import styled from 'styled-components';
import theme from '../../config/theme';

// Styled Components
const StyledFormControl = styled(FormControl)`
  width: 16rem; // 폼 컨트롤의 너비 설정
  border-radius: 20px;
`;

const StyledSelect = styled(Select)`
  && .MuiSelect-select {
    display: flex;
    align-items: center;
    padding: 0px;
    height: 4rem; // 버튼의 높이 설정
    border-radius: 20px;
  }
  && .MuiOutlinedInput-notchedOutline {
    border-radius: 20px; // 아웃라인에도 같은 border-radius 값을 적용
  }
`;

const StyledIcon = styled(LocationOnIcon)`
  font-size: 2.5rem !important;
`;

const SelectLabel = styled('div')`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const LabelText = styled('span')`
  margin-left: 0.8rem;
  font-size: ${theme.fontSizes.medium};
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
`;

// 컴포넌트
const DistrictSelector = () => {
  const [district, setDistrict] = React.useState('');

  const handleChange = (event) => {
    setDistrict(event.target.value);
  };

  return (
    <StyledFormControl variant="outlined">
      <InputLabel htmlFor="district-select"></InputLabel>
      <StyledSelect
        value={district}
        onChange={handleChange}
        displayEmpty
        inputProps={{ id: 'district-select' }}
        renderValue={(selected) => {
          if (!selected) {
            // 아무것도 선택되지 않았을 때
            return (
              <SelectLabel>
                <StyledIcon />
                <LabelText>지역으로 검색</LabelText>
              </SelectLabel>
            );
          }
          // 선택된 지역의 이름을 표시
          return (
            <SelectLabel>
              <StyledIcon />
              <LabelText>{selected}</LabelText>
            </SelectLabel>
          );
        }}
      >
        {[
          '강남구',
          '강동구',
          '강북구',
          '강서구',
          '관악구',
          '광진구',
          '구로구',
          '금천구',
          '노원구',
          '도봉구',
          '동대문구',
          '동작구',
          '마포구',
          '서대문구',
          '서초구',
          '성동구',
          '성북구',
          '송파구',
          '양천구',
          '영등포구',
          '용산구',
          '은평구',
          '종로구',
          '중구',
          '중랑구',
        ].map((area) => (
          <MenuItem key={area} value={area}>
            {area}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default DistrictSelector;
