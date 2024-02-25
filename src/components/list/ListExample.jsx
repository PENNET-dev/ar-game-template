import { Add, Circle, Delete, InsertPhoto, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import PopupState, { bindMenu, bindToggle } from "material-ui-popup-state";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { SideSheet } from "../../common/SideSheet/SideSheet";


export const ListExample = ({
}) => {
    const { globalState, setTopNavigationComponent } = useContext(AppContext);

    // ---

    const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

    // ---

    useEffect(() => {
        setTopNavigationComponent(<Typography variant="h6">
            List Example
        </Typography>);
    }, [globalState?.theme])

    return <>
        <List>
            <ListSubheader>
                <Typography variant="h6">
                    Header
                </Typography>
            </ListSubheader>
            <ListItemButton onClick={() => setIsDetailSheetOpen(true)}>
                <ListItem
                    secondaryAction={
                        <KeyboardArrowRight fontSize="large" />
                    }
                >
                    <ListItemText
                        primary="Test"
                        secondary="Test Test"
                    />
                </ListItem>
            </ListItemButton>
            <Divider variant="inset" component="li" sx={{ mt: 1, mb: 1 }} />
            <ListItemButton onClick={() => setIsDetailSheetOpen(true)}>
                <ListItem
                    secondaryAction={
                        <KeyboardArrowRight fontSize="large" />
                    }
                >
                    <ListItemText
                        primary="Test"
                        secondary="Test Test"
                    />
                </ListItem>
            </ListItemButton>
        </List>

        <SideSheet
            title="Details Sheet" open={isDetailSheetOpen}
            icon={<InsertPhoto sx={{ color: "primary.contrastText" }} />}
            actionText="Edit" cancelActionText={null}
            onClose={async () => setIsDetailSheetOpen(false)}
        >
            <Typography variant="h6">
                Testing
            </Typography>
            <Typography paragraph variant="body1">
                Testing:
            </Typography>
        </SideSheet>

        <Fab variant="extended" size="large"
            color="info"
            sx={{
                position: "fixed",
                right: "0px", mr: 2,
                bottom: "0px", mb: 2
            }}>
            <Add sx={{ mr: 2 }} fontSize="large" />
            Add
        </Fab>
    </>;
}