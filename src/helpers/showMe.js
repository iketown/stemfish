import React from "react";
import styled from "styled-components";
const Info = styled.div`
  font-family: monospace;
  font-size: 10px;
  color: dimgrey;
`;
export const showMe = (obj, name = "") => {
  return <Info>{JSON.stringify(obj, null, 2)}</Info>;
};
