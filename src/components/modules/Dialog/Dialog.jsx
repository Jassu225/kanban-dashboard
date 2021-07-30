import { forwardRef } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import MuiSlide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { doNotForwardTransientProp } from '@utils/styles';

const StyledDialog = styled(MuiDialog, {
  shouldForwardProp: doNotForwardTransientProp,
})``;

const useStyles = makeStyles({
  paperScrollPaper: {
    padding: '0.5rem',
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <MuiSlide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

const Dialog = ({ className, children, open, onClose }) => {
  const classes = useStyles();
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      className={className}
      closeAfterTransition
      classes={classes}
    >
      {children}
    </StyledDialog>
  );
};

export default Dialog;
