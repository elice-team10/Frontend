import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import SubwayIcon from '@mui/icons-material/DirectionsSubway'; // 지하철 아이콘
import styled from 'styled-components';
import theme from '../../config/theme';
import { useSearch } from '../../context/SearchProvider';

// Styled Components
const StyledFormControl = styled(FormControl)`
  width: 15rem; // 폼 컨트롤의 너비 설정
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
    border-radius: 20px; // 아웃라인에도 같은 border-radius 값을 적용시킴
  }
  && .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    outline: #ff6700; // Replace with your desired color
  }
`;

const StyledIcon = styled(SubwayIcon)`
  font-size: 2.5rem !important;
`;

const ColorCircle = styled.span`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin-right: 10px;
`;

// 지하철 아이콘과 텍스트를 포함하는 버튼 레이블 스타일
const SelectLabel = styled('div')`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const LabelText = styled('span')`
  margin-left: 1rem;
  font-size: ${theme.fontSizes.medium};
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 적용 */
`;

const StyledMenuItem = styled(MenuItem)`
  font-family: 'Noto Sans KR';
  font-size: ${theme.fontSizes.medium};
  background-color: #393d3f;
`;

const subwayLines = [
  { name: '1호선', color: '#003688' },
  { name: '2호선', color: '#009246' },
  { name: '3호선', color: '#EF7C1C' },
  { name: '4호선', color: '#00A4E3' },
  { name: '5호선', color: '#996CAC' },
  { name: '6호선', color: '#CD7C2F' },
  { name: '7호선', color: '#747F00' },
  { name: '8호선', color: '#E6186C' },
  { name: '9호선', color: '#BDB092' },
  { name: '신분당선', color: '#D31145' },
  { name: '경의중앙선', color: '#77C4A3' },
];

// 컴포넌트
const SubwaySelector = () => {
  const { subwayLine, setSubwayLine } = useSearch('');

  const handleChange = (event) => {
    let line;

    if (event.target.value === '신분당선') {
      line = '신분당선';
    } else if (event.target.value === '경의중앙선') {
      line = '경의중앙선';
    } else {
      line = event.target.value;
    }

    setSubwayLine(line);
  };

  return (
    <StyledFormControl
      variant="outlined"
      sx={{
        ':focus': { borderColor: '#ff6700' },
      }}
    >
      <InputLabel htmlFor="subway-line-select"></InputLabel>
      <StyledSelect
        onChange={handleChange}
        displayEmpty
        defaultValue=""
        inputProps={{ id: 'subway-line-select' }}
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
                <LabelText>지하철 노선</LabelText>
              </SelectLabel>
            );
          }
          // 선택된 노선의 색상과 이름을 표시
          const line = subwayLines.find((line) => line.name === selected);
          return (
            <SelectLabel>
              <ColorCircle color={line ? line.color : ''} />
              <LabelText>{selected}</LabelText>
            </SelectLabel>
          );
        }}
      >
        {subwayLines.map((line) => (
          <StyledMenuItem key={line.color} value={line.name}>
            <ColorCircle color={line.color} />
            {line.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default SubwaySelector;
