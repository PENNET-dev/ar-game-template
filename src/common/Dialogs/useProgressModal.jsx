import { Box, CircularProgress, Modal, Paper } from "@mui/material";
import { useState } from "react";

export const useProgressModal = ({
    isOpen,
    handleClose
}) => {
    const [_isOpen, setIsOpen] = useState(isOpen || false);

    const show = async () => {
        setIsOpen(true);
    }

    const close = async () => {
        setIsOpen(false);
    }

    const modal = <>
        <Modal open={_isOpen} fullWidth onClose={handleClose}>
            <Box sx={{
                position: "absolute",
                top: "20%", left: "5%",
                width: "90%",
            }}>
                <Paper elevation={24} sx={{ textAlign: "center", p: 4 }}>
                    <CircularProgress />
                </Paper>
            </Box>
        </Modal>
    </>;

    return {
        modal,

        // Actions
        show,
        close
    }
}