import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // 위치 아이콘
import styled from 'styled-components';
import theme from '../../config/theme';
import { useSearch } from '../../context/SearchProvider';
import { LOCATION_CATEGORY } from '../../config/constants';

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

const StyledMenuItem = styled(MenuItem)`
  font-family: 'Noto Sans KR';
  font-size: ${theme.fontSizes.medium};
  background-color: #393d3f;
`;

// 컴포넌트
const DistrictSelector = () => {
  const { district, setDistrict } = useSearch();

  const handleChange = (event) => {
    const value = event.target.value;
    let districtName;

    if (value === '중구') {
      districtName = '서울중부';
    } else {
      districtName = value.slice(0, -1); // 마지막 글자 제거
    }

    setDistrict(districtName);
  };

  return (
    <StyledFormControl variant="outlined">
      <InputLabel htmlFor="district-select"></InputLabel>
      <StyledSelect
        onChange={handleChange}
        defaultValue=""
        displayEmpty
        inputProps={{ id: 'district-select' }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getcontentanchorel: null, // This will make it expand downwards only
          PaperProps: {
            style: {
              maxHeight: 150,
              width: 100,
            },
          },
        }}
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
        {LOCATION_CATEGORY.map((area) => (
          <StyledMenuItem key={area} value={area}>
            {area}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default DistrictSelector;
