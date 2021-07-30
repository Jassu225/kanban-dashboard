import styled from '@emotion/styled';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@base/Button';
import { useSelector } from 'react-redux';
import { getListsIDs } from '@selectors/board';
import List from '@cont/Home/List';

const NewListForm = dynamic(() => import('@cont/Home/NewListForm'), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 0.75rem 1rem;
  background-color: #1f2123;
  border-bottom: 1px solid rgb(48, 50, 54);
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  line-height: 150%;
  font-weight: 600;
  margin: 0;
`;

const AddListButton = styled(Button)`
  margin-left: auto;
`;

const ListsContainer = styled.div`
  padding: 1rem;
  padding-top: 0;
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const HomePage = () => {
  const [showAddNewListForm, setShowAddNewListForm] = useState(false);
  const onAddNewListButtonClicked = () => setShowAddNewListForm(true);
  const closeAddNewListDialog = () => setShowAddNewListForm(false);

  const listsIDs = useSelector(getListsIDs);
  return (
    <>
      <Wrapper>
        <Header>
          <Title>Trello Board</Title>
          <AddListButton onClick={onAddNewListButtonClicked}>
            Add List
          </AddListButton>
        </Header>
        <ListsContainer>
          {listsIDs.map((listID) => (
            <List listID={listID} key={listID} />
          ))}
        </ListsContainer>
      </Wrapper>
      <NewListForm open={showAddNewListForm} onClose={closeAddNewListDialog} />
    </>
  );
};

export default HomePage;
