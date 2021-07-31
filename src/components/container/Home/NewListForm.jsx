import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@modules/Dialog/Dialog';
import { addNewList } from '@features/board';
import { Wrapper, Form, Header, Submit } from './FormElements';

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
          <div>
            <Submit type="submit">Submit</Submit>
          </div>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

export default NewListForm;
