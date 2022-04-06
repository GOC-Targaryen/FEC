import React from 'react';
import styled from 'styled-components';

const DescriptionBox = styled.div`
  height: 300px;
  width: 250px;
  border: none;
  margin: 5px;
  padding: 20px;
`;

const BigBox = styled.div`
  height: 500px;
  width: 600px;
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;

`;

const LittleBox = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid #000;
  margin: 5px;
  padding: 10px;
`;

const ReviewBox = styled(BigBox)`
  height: 100%;
  display: flex;
  border: 1px dashed #000;
  flex-direction: column;
`;
const ReviewTop = styled.div`
  height: 20px;
  width: 550px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ReviewsContainer = styled(BigBox)`
  height: 100%;
  width: 100%;
  border: 1px hidden;
  display: flex;
  flex-direction: column;
`;

const BreakdownBox = styled(DescriptionBox)`
  height: 100%;
  width: 330px;
  display: flex;
  flex-direction: column;
`;

const ReallyBigBox = styled(BigBox)`
  height: 120%;
  width: 1200px;
  display: flex;
`;



export {DescriptionBox, BigBox, LittleBox, ReviewBox, ReviewTop, ReviewsContainer, BreakdownBox, ReallyBigBox}