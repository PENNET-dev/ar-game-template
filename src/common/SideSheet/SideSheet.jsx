import { Close, InsertPhoto } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useViewport } from "../../common/utility/useViewport";

export const SideSheet = ({
    title,
    icon,

    open,

    actionText,
    cancelActionText,

    onClose,
    onAction,

    children
}) => {
    const { isMobile, breakpoint } = useViewport();

    return <>
        <Drawer anchor="right" open={open}
            onClick={onClose}
            onClose={onClose}
            sx={{
                zIndex: 1500,
            }}
        >
            <Box sx={{
                m: 0, p: 2, pb: 2,
                bgcolor: "background.default",
                height: "100vh",
                width: isMobile ? "80vw" : 500,
            }}
            >
                <Stack direction="column" display="flex" useFlexGap sx={{ height: "100%" }}>
                    <Stack direction="row" display="flex" sx={{ mb: 2, alignItems: "center", }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            {Boolean(icon) && icon}
                            {!icon && <InsertPhoto sx={{ color: "primary.contrastText" }} />}
                        </Avatar>
                        <Typography paragraph variant="h6" color="primary" sx={{ m: 0, ml: 2, p: 0, flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <IconButton color="primary">
                            <Close />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                        {children}
                    </Box>
                    <Stack direction="column" spacing={3}>
                        {actionText &&
                            <Box>
                                <Button variant="contained" fullWidth onClick={e => {
                                    e.stopPropagation();
                                }}>
                                    {actionText}
                                </Button>
                            </Box>}
                        {cancelActionText &&
                            <Box>
                                <Button variant="outlined" fullWidth onClick={e => {
                                    e.stopPropagation();
                                }}>
                                    {cancelActionText}
                                </Button>
                            </Box>}
                    </Stack>
                </Stack>
            </Box>
        </Drawer>
    </>;
}