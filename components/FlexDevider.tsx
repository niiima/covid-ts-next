import styled from 'styled-components'
export const EqualDivider = styled.div`
  display: flex;
  margin: 0.25rem;
  padding: 0.1rem;
  //background: papayawhip;
  ${props => props.vertical && "flex-direction: column;"}

  > * {
    flex: 1;

    &:not(:first-child) {
      ${props => props.vertical ? "margin-top" : "margin-left"}: 0.1rem;
    }
  }
`;

export const EDChild = styled.div`
  padding: 0.025rem 0.05rem;
  /* background: ${props => props.color ? props.color : "rgba(0,0,0,0.1)"}; */
  vertical-align: middle;
`;