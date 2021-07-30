import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@modules/Dialog/Dialog';
import { addNewList } from '@features/board';
import Button from '@base/Button';
import { useState } from 'react';

const Wrapper = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
  width: 560px;
`;

const Header = styled.h3`
  line-height: 150%;
  margin: 0;
  margin-bottom: 1rem;
`;

const ActionContainer = styled.div``;
const Submit = styled(Button)`
  float: right;
`;

const formKeys = {
  TITLE: 'title',
};

const NewListForm = ({ className, open, onClose }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get(formKeys.TITLE);
    if (!title?.trim()) {
      setErrors((errorsObject) => ({
        ...errorsObject,
        [formKeys.TITLE]: "Title can't be blank.",
      }));
      return;
    } else {
      setErrors({});
    }
    const id = new Date().getTime();
    dispatch(
      addNewList({
        id,
        title,
      })
    );
    onClose();
  };
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <Wrapper>
        <Header>New List</Header>
        <Form onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            placeholder="placeholder"
            label="Title"
            required
            name={formKeys.TITLE}
            error={!!errors[formKeys.TITLE]}
            helperText={errors[formKeys.TITLE]}
          />
          <ActionContainer>
            <Submit type="submit">Submit</Submit>
          </ActionContainer>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

export default NewListForm;
