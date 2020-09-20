import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
   root: {
       textAlign: "center",
       marginTop: "2rem"
   },
   modal: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     "& #transition-modal-title": {
         lineHeight: "1.8"
     },
   },
   paper: {
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       flexDirection: "column",
       fontFamily: "Roboto", 
       backgroundColor: "white",
       border: `2px solid ${theme.palette.primary.main}`,
       boxShadow: theme.shadows[5],
       padding: theme.spacing(2, 4, 3),
   },
   hr: {
    color: `${theme.palette.secondary.main}`
}
}));

export default function CustoModal(props) {
    const classes = useStyles();
    const {open, onDismiss} = props;
    return (
        <div className={classes.root} onClick={onDismiss}>
            <Modal
               aria-labelledby="transition-modal-title"
               aria-describedby="transition-modal-description"
               className={classes.modal}
               open={open}
               onClose={onDismiss}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{
                 timeout: 500,
               }}
               onClick={(e) => e.stopPropagation()}
            >
            <Fade in={open}>
             <div className={classes.paper}>
             <div className="">
                 <Typography id="transition-modal-title" variant="h4">{props.title}</Typography>
                 <hr className={classes.hr}/>
                 <Typography id="transition-modal-title" variant="body1">{props.description}</Typography>
                 <hr className={classes.hr}/>
             </div>
                {props.actions}
            </div>
            </Fade>
     </Modal>
   </div>
 );
}
