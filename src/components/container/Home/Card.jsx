import styled from '@emotion/styled';
import { removeCard } from '@features/board';
import { getCardData } from '@selectors/board';
import { lineClampStyle } from '@utils/styles';
import { useDispatch, useSelector } from 'react-redux';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-column-gap: 0.75rem;
  grid-row-gap: 0.375rem;
  border: 1px solid rgb(39, 40, 43);
  background-color: rgb(39, 40, 43);
  border-radius: 0.25rem;
  box-shadow: 0px 0px 1px rgb(0 0 0 / 6%);
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &:hover {
    background-color: rgb(42, 43, 46);
  }
`;

const IconContainer = styled.div`
  color: rgb(138, 143, 152);
  grid-row: 1 / 3;
  grid-column: 2 / 3;
`;

const Icon = styled.span`
  font-size: 20px;
  cursor: pointer;
  line-height: 12px;
`;

const Title = styled.span`
  font-size: 12px;
  color: rgb(138, 143, 152);
  ${lineClampStyle(1)};
`;

const Description = styled.span`
  color: rgb(247, 248, 248);
  font-weight: 500;
  font-size: 13px;
  ${lineClampStyle(3)};
`;

const getFormattedDate = (dateInMs) => {
  const date = new Date(dateInMs);
  const time = new Intl.DateTimeFormat(window.navigator.language || 'en-IN', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
  const day = new Intl.DateTimeFormat(window.navigator.language || 'en-IN', {
    day: '2-digit',
  }).format(date);
  const month = date.toLocaleString('default', {
    month: 'short',
  });
  return `${month} ${day}, ${date.getFullYear()} - ${time}`;
};

const Card = ({ cardID, listID }) => {
  const cardData = useSelector((state) => getCardData(state, cardID));
  const onDragStart = (e) => {
    e.dataTransfer.setData('text', `${listID}:${cardID}`);
  };
  const dispatch = useDispatch();
  const deleteCard = () => dispatch(removeCard({ cardID, listID }));
  return (
    <Wrapper draggable onDragStart={onDragStart}>
      <Title>{cardData.title}</Title>
      <Description>{cardData.description}</Description>
      <Title>{`Created at ${getFormattedDate(cardData.createdAt)}`}</Title>
      <IconContainer>
        <Icon onClick={deleteCard}>&times;</Icon>
      </IconContainer>
    </Wrapper>
  );
};

export default Card;
