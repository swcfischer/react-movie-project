import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPage } from '../reducer/exploreActions';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';

const breakpoint = 760;

const Pagination = ({ page, setPage }) => {
  const numberPage = Number(page);
  const [limit, setLimit] = useState(window.innerWidth < breakpoint ? 5 : 10);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < breakpoint) {
        setLimit(5);
      } else {
        setLimit(10);
      }
    });
  }, [limit]);

  const clickHandler = newPage => event => {
    setPage(newPage);
  };
  const handleLimitPlacePage =
    numberPage % limit === 0 ? numberPage - 1 : numberPage;
  const startingPlace = Math.floor(handleLimitPlacePage / limit) * limit;
  return (
    <PaginationContainer>
      <LinkArrowLeft
        to={`/discover/page/${Number(page) - 1}`}
        onClick={clickHandler(Number(page) - 1)}
        isShow={page - 1 > 0}
      >
        <IoMdArrowBack className="arrow-back" />
      </LinkArrowLeft>
      {renderLinks(startingPlace, clickHandler, page, limit)}
      <LinkArrowRight
        to={`/discover/page/${Number(page) + 1}`}
        onClick={clickHandler(Number(page) + 1)}
      >
        <IoMdArrowForward className="arrow-forward" />
      </LinkArrowRight>
    </PaginationContainer>
  );
};

const renderLinks = (startingPlace, clickHandler, page, limit) => {
  const linksArray = [];

  for (let i = startingPlace + 1; i < startingPlace + limit + 1; i++) {
    linksArray.push(
      <PageLink isSelected={i === Number(page)} key={i}>
        <Link to={`/discover/page/${i}`} onClick={clickHandler(i)}>
          {i}
        </Link>
      </PageLink>
    );
  }

  return linksArray;
};

const mapStateToProps = state => ({
  reduxPage: state.explore.page
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

const PaginationContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  max-width: 600px;
  padding: 35px 0 75px 0;
  margin: 0 auto;
`;

const LinkArrowLeft = styled(Link)`
  position: absolute;
  top: 35px;
  left: 15px;
  font-size: 40px;
  pointer-events: ${props => (props.isShow ? 'auto' : 'none')};
  svg {
    color: ${props => (props.isShow ? '#000' : 'transparent')};
  }
`;

const LinkArrowRight = styled(Link)`
  position: absolute;
  top: 35px;
  right: 15px;
  font-size: 40px;
  color: #000;
  svg {
    color: #000;
  }
`;

const PageLink = styled.div`
  background: ${props => (props.isSelected ? '#999' : '#000')};
  color: #fff;
  text-decoration: none;
  border-right: 1px solid #${props => (props.isSelected ? '999' : '333')};
  transition: all 0.35s;
  cursor: pointer;

  &:hover {
    background: #999;
    border-right: 1px solid #999;
  }

  &:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-right: none;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: #fff !important;
    font-style: italic;
  }
`;
