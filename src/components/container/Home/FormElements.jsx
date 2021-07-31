import styled from '@emotion/styled';
import Button from '@base/Button';

export const Wrapper = styled.div`
  padding: 1rem;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
  width: 560px;
  max-width: 100%;
`;

export const Header = styled.h3`
  line-height: 150%;
  margin: 0;
  margin-bottom: 1rem;
`;

export const Submit = styled(Button)`
  float: right;
`;
