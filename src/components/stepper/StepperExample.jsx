import { Add, AlarmOn, Cancel, CopyAllOutlined, HomeOutlined, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, RefreshOutlined } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, Fab, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import PopupState, { bindMenu, bindToggle } from "material-ui-popup-state";
import { Helmet } from "react-helmet-async";
import { StepperPage } from "../../common/StepperPage/StepperPage";

export const StepperExample = ({
}) => {
    const { globalState, setTopNavigationComponent } = useContext(AppContext);

    // ---

    const steps = [
        { title: "AA", component: <>A</> },
        {
            title: "BB", component: <>
                <Typography>B</Typography>
                <Fab variant="extended" size="large"
                    color="info"
                    sx={{
                        position: "fixed",
                        right: "0px", mr: 1,
                        bottom: "100px"
                    }}>
                    <AlarmOn sx={{ mr: 2 }} fontSize="large" />
                    Add
                </Fab>
            </>
        },
        { title: "CCC", component: <>C</> },
        { title: "DDDD Testing Test", component: <>D</> },
    ];
    const [currentStep, setCurrentStep] = useState(0);

    // ---

    return <>
        <Helmet>
            <title>Stepper</title>
        </Helmet>

        <StepperPage steps={steps} defaultStep={currentStep} />
    </>
}