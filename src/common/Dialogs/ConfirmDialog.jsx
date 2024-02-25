import { Warning } from '@mui/icons-material'
import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import React from 'react'

export function ConfirmDialog({
    title,
    prompt,
    promptDetail,
    open,

    okText,
    cancelText,

    onClickConfirm,
    onClickCancel
}) {

    return (
        <Dialog open={open} onClose={onClickCancel}
            sx={{ zIndex: 16000 }}
            onKeyUp={e => {
                e?.key == "Escape" && onClickCancel();
            }}>
            <DialogTitle id="alert-dialog-title" textAlign="center">
                <Warning fontSize="large" color="warning" />
            </DialogTitle>

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {prompt}
                </DialogContentText>
                {promptDetail && <>
                    <br />
                    <DialogContentText id="alert-dialog-description">
                        {promptDetail}
                    </DialogContentText>
                </>}
            </DialogContent>

            <Divider variant="middle" />
            
            <DialogActions>
                <Stack direction="column" spacing={3} sx={{ mt: 2, mb: 2 }} width="100%">
                    <Button variant='contained' color='primary' fullWidth onClick={onClickConfirm}>
                        {okText || "Ok"}
                    </Button>
                    <Button variant='outlined' color='secondary' fullWidth autoFocus onClick={onClickCancel}>
                        {cancelText || "Cancel"}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog >
    );
}
