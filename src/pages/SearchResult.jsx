import Header from '../components/UI/Header';
import React from 'react';
import styled from 'styled-components';
import SearchResultBar from '../components/SearchResult/SearchResultBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
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
