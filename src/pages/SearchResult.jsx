import Header from '../components/UI/Header';
import React from 'react';
import styled from 'styled-components';
import SearchResultBar from '../components/SearchResult/SearchResultBar';
import SearchResultTab from '../components/SearchResult/SearchResultTab';

const Container = styled.div`
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
