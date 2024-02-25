import { useTheme } from "@emotion/react";
import { InsertPhoto } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppContext } from "../../App";
import useDialog from "../../common/Dialogs/useDialog";
import { SideSheet } from "../../common/SideSheet/SideSheet";
import { useViewport } from "../../common/utility/useViewport";
import { SampleCard } from "./SampleCard";

export const Home = () => {
    const { globalState, globalDispatch, setTopNavigationComponent } = useContext(AppContext);

    const theme = useTheme();
    const { isMobile, breakpoint } = useViewport();
    const { component: confirmDialogComponent, actions: confirmDialogActions } = useDialog();

    // ---

    const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

    // ---

    useEffect(() => {
        setTopNavigationComponent(<Typography variant="h6">
            Home
        </Typography>);
    }, [globalState?.theme])

    // ---

    return <>
        <Helmet>
            <title>
                Home
            </title>
        </Helmet>

        <Typography variant="h4" color="primary" paragraph>
            Home
        </Typography>

        <Grid container spacing={1} sx={{ maxWidth: "1400px" }}>
            {(new Array(10).fill(0)).map((v, index) =>
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <SampleCard
                        onClick={async () => { setIsDetailSheetOpen(true); }}
                        onChange={async () => { }}
                        onAction={async (action) => {
                            if (action == "test") {
                                enqueueSnackbar("Testing toast message:" + action,
                                    { preventDuplicate: true, persist: false, variant: 'info' });
                            } else if (action == "delete") {
                                confirmDialogActions.confirm({
                                    title: "Delete this record?",
                                    prompt: "Are you sure you want to do this?",
                                    promptDetail: "(Optional) Details can go here.  Description of the item affected.",
                                    okText: "Delete this record", cancelText: "Cancel",
                                    callback: () => {
                                        alert("Confirmed!")
                                    }
                                });
                            }
                        }}
                    />
                </Grid>
            )}
        </Grid>

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

        {confirmDialogComponent}
    </>
}