import React from 'react';
import styled, { css } from 'styled-components';
const Inner = ({children}) => {
   return (
      <Main>
      {children}
      </Main>
   );
};

export default Inner;

const Main = styled.div`
overflow: scroll;
height: 84%;
`;