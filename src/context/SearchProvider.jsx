import React, { createContext, useState, useContext, useEffect } from 'react';

// 검색어 Context 생성
const SearchContext = createContext();

// Provider 컴포넌트
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('');
  const [subwayLine, setSubwayLine] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [result, setResult] = useState(() => {
    const savedResult = localStorage.getItem('result');
    return savedResult ? JSON.parse(savedResult) : [];
  });

  useEffect(() => {
    localStorage.setItem('result', JSON.stringify(result));
  }, [result]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        district,
        setDistrict,
        subwayLine,
        setSubwayLine,
        page,
        setPage,
        totalCount,
        setTotalCount,
        result,
        setResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hook for easier consumption of the context
export const useSearch = () => {
  return useContext(SearchContext);
};
