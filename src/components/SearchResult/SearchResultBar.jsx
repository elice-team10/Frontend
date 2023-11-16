import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

function SearchResultBar() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const chips = [
    { key: 'bus', label: '지하철' },
    { key: 'happy', label: '서울에서 찾았어요' },
    { key: 'game', label: '게시판' },
  ];

  const handleChipClick = (chipKey) => {
    setSelectedChip(chipKey);
    // TODO: 검색 결과를 가져오는 로직을 여기에 구현
    // 예를 들어, API 호출 등을 통해 검색 결과를 설정할 수 있습니다.
    setSearchResults([
      // 검색 결과 데이터의 예시
      { title: '결과 1', description: '이것은 첫 번째 검색 결과입니다.' },
      { title: '결과 2', description: '이것은 두 번째 검색 결과입니다.' },
      // ... 추가 결과
    ]);
  };

  return (
    <div>
      <Stack direction="row" spacing={1}>
        {chips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onClick={() => handleChipClick(chip.key)}
            color={selectedChip === chip.key ? 'primary' : 'default'}
            variant={selectedChip === chip.key ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>
      <hr />
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((result, index) => (
            <Card key={index} variant="outlined" style={{ margin: '8px' }}>
              <div style={{ padding: '16px' }}>
                <strong>{result.title}</strong>
                <p>{result.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultBar;
