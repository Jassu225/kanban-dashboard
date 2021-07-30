import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@modules/Dialog/Dialog';
import { addNewCard } from '@features/board';
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
  DESCRIPTION: 'description',
};

const getTitle = (formData) => formData.get(formKeys.TITLE) || '';
const getDescription = (formData) => formData.get(formKeys.DESCRIPTION) || '';

const NewCardForm = ({ className, open, onClose, listID }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const isFormValid = (formData) => {
    const title = getTitle(formData);
    const description = getDescription(formData);
    let isValid = true;
    const errors = {};
    if (!title.trim()) {
      errors[formKeys.TITLE] = "Title can't be blank.";
      isValid = false;
    }
    if (!description.trim()) {
      errors[formKeys.DESCRIPTION] = "Description can't be blank.";
      isValid = false;
    }

    setErrors((errorsObject) => ({
      ...errorsObject,
      ...errors,
    }));

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!isFormValid(formData)) {
      return;
    }
    const id = new Date().getTime();
    dispatch(
      addNewCard({
        listID,
        card: {
          id,
          title: getTitle(formData),
          description: getDescription(formData),
          createdAt: id,
        },
      })
    );
    onClose();
  };
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <Wrapper>
        <Header>New Task</Header>
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
          <TextField
            variant="outlined"
            placeholder="placeholder"
            label="Description"
            required
            name={formKeys.DESCRIPTION}
            error={!!errors[formKeys.DESCRIPTION]}
            helperText={errors[formKeys.DESCRIPTION]}
          />
          <ActionContainer>
            <Submit type="submit">Submit</Submit>
          </ActionContainer>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

export default NewCardForm;
