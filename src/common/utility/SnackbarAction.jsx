import { ErrorOutlined, WarningOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";

export const postSnackbarMessage = async (message, variant) => {
    enqueueSnackbar(<Typography variant="h6">{message}</Typography>,
        { preventDuplicate: true, variant: variant || "info" })
}

export function SnackbarAction({
    id
}) {
    const { closeSnackbar } = useSnackbar();

    return (<>
        <Button
            onClick={() => closeSnackbar(id)}
            style={{
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                border: 'none'
            }}
            variant="text"
        />
    </>);
}
