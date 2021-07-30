import styled from '@emotion/styled';
import { removeList, switchCardBetweenLists } from '@features/board';
import { getListData } from '@selectors/board';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import NewCardForm from './NewCardForm';

const Wrapper = styled.div`
  width: 344px;
  height: calc(100% - 1rem);
  display: grid;
  grid-template: max-content 1fr max-content / 1fr;
  margin-right: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.25);
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  background-color: #1c1d1f;
  border-radius: 0.375rem;
`;

const Header = styled.h3`
  margin: 0;
  line-height: 150%;
  padding: 0.75rem 0.5rem;
  text-transform: capitalize;
  border-bottom: 1px solid rgb(48, 50, 54);
  display: grid;
  align-items: center;
  grid-template: 1fr / 1fr max-content max-content;
  grid-gap: 0.5rem;
`;

const Icon = styled.span`
  font-size: 20px;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  padding-top: 0.5rem;
  min-height: 0;
  overflow-y: auto;
`;

const ActionContainer = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddIcon = styled.span`
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;

const allowDrop = (e) => e.preventDefault();

const List = ({ listID }) => {
  const [showAddNewCardForm, setShowAddNewCardForm] = useState(false);
  const onAddNewCardButtonClicked = () => setShowAddNewCardForm(true);
  const closeAddNewCardDialog = () => setShowAddNewCardForm(false);

  const listData = useSelector((state) => getListData(state, listID));
  const dispatch = useDispatch();
  const onDrop = (e) => {
    e.preventDefault();
    const listIdAndCardId = e.dataTransfer.getData('text');
    const [sourceListID, cardID] = listIdAndCardId
      .split(':')
      .map((id) => Number(id));
    if (sourceListID === listID) return;
    dispatch(
      switchCardBetweenLists({
        sourceListID,
        targetListID: listID,
        cardID,
      })
    );
  };

  const deleteList = () => dispatch(removeList(listID));

  return (
    <>
      <Wrapper onDragOver={allowDrop} onDrop={onDrop}>
        <Header>
          {listData.title}
          <Icon onClick={deleteList}>&times;</Icon>
        </Header>
        <CardsContainer>
          {listData.cardsIDs.map((cardID) => (
            <Card key={cardID} cardID={cardID} listID={listID} />
          ))}
        </CardsContainer>
        <ActionContainer>
          <AddIcon onClick={onAddNewCardButtonClicked}>+</AddIcon>
        </ActionContainer>
      </Wrapper>
      <NewCardForm
        open={showAddNewCardForm}
        onClose={closeAddNewCardDialog}
        listID={listID}
      />
    </>
  );
};

export default List;
