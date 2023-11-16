import Header from '../components/UI/Header';
import React from 'react';
import styled from 'styled-components';
import SearchResultBar from '../components/SearchResult/SearchResultBar';

const Container = styled.div`
  width: 1200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchResult = () => {
  return (
    <>
      <Header />
      <Container>
        <SearchResultBar />
      </Container>
    </>
  );
};

export default SearchResult;
