import { DeleteForeverOutlined, InfoOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

export const ButtonLargeSquare = ({
    icon,
    title,
    subHeader,
    onClick,

    action,
    actionIcon,

    sx,
    fullWidth,
    disabled,

    props
}) => {
    return <Box sx={{ position: "relative" }}>
        <Button fullWidth={fullWidth} {...props} onClick={onClick} variant="outlined" sx={{ ...sx }} disabled={disabled}>
            <Stack display="flex" direction="column" spacing={1} alignItems="center" justifyItems="center">
                <Box sx={{ p: 2 }}>
                    {icon || <InfoOutlined fontSize="large" />}
                </Box>

                <Box sx={{ pb: 2, pl: 2, pr: 2 }}>
                    <Box alignContent="center">
                        <Typography variant="button" color="primary" sx={{ mb: 3 }}>
                            {title}
                        </Typography>
                    </Box>
                    {subHeader &&
                        <Box alignContent="center">
                            <Typography variant="caption" color="GrayText" sx={{ whiteSpace: "pre-wrap" }}>
                                {subHeader || " "}
                            </Typography>
                        </Box>}
                </Box>
            </Stack>
        </Button>

        {(action || actionIcon) &&
            <Box sx={{ position: "absolute", top: 0, right: 0, p: "2px" }}>
                <IconButton size="large" onClick={(e) => { e.stopPropagation(); action && action(); }} disabled={disabled && !action}>
                    {actionIcon || <DeleteForeverOutlined size="large" />}
                </IconButton>
            </Box>}

    </Box>
}