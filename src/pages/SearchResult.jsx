import Header from '../components/UI/Header';
import React from 'react';
import styled from 'styled-components';
import SearchResultBar from '../components/SearchResult/SearchResultBar';
import SearchResultDetail from '../components/SearchResult/ResultDetail';
import theme from '../config/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.pastelWhite};
  flex-grow: 1;
`;

const SearchResult = () => {
  return (
    <Container>
      <SearchResultBar />
    </Container>
  );
};

export default SearchResult;
