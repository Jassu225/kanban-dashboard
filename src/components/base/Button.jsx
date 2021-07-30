import styled from '@emotion/styled';

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  width: 128px;
  text-align: center;
  border-radius: 0.25rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  background-color: rgb(48, 50, 54);
  color: rgb(215, 216, 219);
  cursor: pointer;
  border: none;
`;

const Button = (props) => {
  return <StyledButton type="button" {...props} />;
};

export default Button;
