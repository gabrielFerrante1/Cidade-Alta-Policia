import * as React from 'react';

//Import components --Mui
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Component alert
const AlertMui = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alert  = (props: {mensage: string, type?: string}) => {
    return (
        <Snackbar open={true} >
            <AlertMui style={{background:props.type}}  sx={{ width: '100%' }}>
                {props.mensage}
            </AlertMui>
        </Snackbar>
    )
}