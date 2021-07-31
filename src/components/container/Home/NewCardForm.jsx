import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@modules/Dialog/Dialog';
import { addNewCard } from '@features/board';
import { Wrapper, Form, Header, Submit } from './FormElements';

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
          <div>
            <Submit type="submit">Submit</Submit>
          </div>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

export default NewCardForm;
