import { useTheme } from "@emotion/react";
import { AssignmentOutlined, AssignmentReturn, ChevronRight, ListAlt, LogoutOutlined, Pages, SettingsOutlined } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


export const NavigationMenu = ({
    isExpanded,
    handleNavigate
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:767px)");

    return <>
        {isMobile && <>
            <Box sx={{ width: "300px", height: "50px", pt: "1rem", pl: 2, pr: 2, mb: 3, boxSizing: "border-box" }}>
                <Box sx={{ border: "1px solid #c0c0c0", flexGrow: 1 }}>
                    (logo)
                </Box>
            </Box>
        </>}
        
        <List sx={{ flexGrow: 1 }}>
            <ListItemButton
                onClick={async () => handleNavigate && handleNavigate("/")}
                selected={/\/Home/.test(location?.pathname) || location?.pathname == "/"}
                sx={{ pt: 3, pb: 3, mb: 1, alignItems: "center" }}>
                <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                    <AssignmentOutlined />
                </ListItemIcon>
                {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                    <Typography variant="display3">Home</Typography>
                </ListItemText>}
            </ListItemButton>
            <ListItemButton
                onClick={async () => handleNavigate && handleNavigate("/Stepper")}
                selected={/\/Stepper/.test(location?.pathname)}
                sx={{ pt: 3, pb: 3, mb: 1, alignItems: "center" }}>
                <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                    <AssignmentReturn sx={{ transform: "scaleX(-1)" }} />
                </ListItemIcon>
                {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                    <Typography variant="display3">Stepper Example</Typography>
                </ListItemText>}
            </ListItemButton>
            <ListItemButton
                onClick={async () => handleNavigate && handleNavigate("/List")}
                selected={/\/List/.test(location?.pathname)}
                sx={{ pt: 3, pb: 3, mb: 1, alignItems: "center" }}>
                <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                    <ListAlt sx={{ transform: "scaleX(-1)" }} />
                </ListItemIcon>
                {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                    <Typography variant="display3">List Example</Typography>
                </ListItemText>}
            </ListItemButton>
            <ListItemButton
                href="./Game/"
                selected={/\/Game/.test(location?.pathname)}
                sx={{ pt: 3, pb: 3, mb: 1, alignItems: "center" }}>
                <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                    <ListAlt sx={{ transform: "scaleX(-1)" }} />
                </ListItemIcon>
                {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                    <Typography variant="display3">Game</Typography>
                </ListItemText>}
            </ListItemButton>
        </List>

        <List sx={{ flexGrow: 0 }}>
            <Divider />
            <ListItemButton
                onClick={async () => handleNavigate && handleNavigate("/Settings")}
                selected={/\/Settings/.test(location?.pathname)}
                sx={{ pt: 3, pb: 3, alignItems: "center" }}>
                <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                    <SettingsOutlined />
                </ListItemIcon>
                {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                    <Typography variant="display3">Settings</Typography>
                </ListItemText>}
            </ListItemButton>
            <Divider />
        </List>

        <Box sx={{ flexGrow: 0 }}>
            <List>
                {isExpanded &&
                    <ListItem sx={{ pt: 1, pb: 1, mt: 1, mb: 1 }}>
                        <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                        </ListItemIcon>
                        <ListItemText sx={{ p: 0, m: 0 }}>
                            <Typography variant="body2">
                                Test User
                            </Typography>
                            <Typography variant="body2">
                                test@test.com
                            </Typography>
                        </ListItemText>
                    </ListItem>}
                <ListItemButton sx={{ mt: 1, mb: 1, pt: 3, pb: 3, alignItems: "center" }}>
                    <ListItemIcon sx={!isExpanded ? { minWidth: 0 } : {}}>
                        <LogoutOutlined />
                    </ListItemIcon>
                    {isExpanded && <ListItemText sx={{ p: 0, m: 0 }}>
                        <Typography variant="display3">Logout</Typography>
                    </ListItemText>}
                </ListItemButton>
            </List>
        </Box>
    </>;
}