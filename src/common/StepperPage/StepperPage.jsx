import { Alarm, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, Warning, WarningOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import PopupState, { bindMenu, bindToggle } from "material-ui-popup-state";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AppContext } from "../../App";

export const StepperPage = ({
    steps,
    defaultStep
}) => {
    const { globalState, setTopNavigationComponent } = useContext(AppContext);

    // ---

    const [currentStep, setCurrentStep] = useState(defaultStep);

    useEffect(() => {
        setCurrentStep(defaultStep);
    }, [defaultStep])

    // ---

    useEffect(() => {
        let errorStep = Infinity;
        setTopNavigationComponent(<>
            <Stack direction="row">
                <PopupState variant="popper" popupId="chat-popper">
                    {(popupState) => (<>
                        <Button variant="text" {...bindToggle(popupState)} >
                            <Stack direction="row" display="flex" sx={{ width: "50rem", }}>
                                <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                                    {steps[currentStep]?.title}
                                </Box>
                                <KeyboardArrowDown />
                            </Stack>
                        </Button>

                        <Menu {...bindMenu(popupState)} sx={{ zIndex: 5000 }}>
                            {steps?.map((s, stepIndex) => {
                                // Simulate error in step [2]
                                const isError = (stepIndex == 2);
                                if (isError && stepIndex < errorStep) {
                                    errorStep = stepIndex;
                                }

                                return <MenuItem key={stepIndex}
                                    selected={stepIndex == currentStep}
                                    onClick={() => {
                                        setCurrentStep(stepIndex);
                                        popupState.close();
                                    }}>
                                    <ListItemIcon>
                                        {/* {stepIndex == currentStep &&
                                    <CheckOutlined />} */}
                                    </ListItemIcon>
                                    <ListItemText sx={{ pl: 3, pr: 3 }}>
                                        <Typography sx={{ opacity: (stepIndex < currentStep && stepIndex < errorStep) ? 0.4 : 1.0 }}>
                                            {s?.title}
                                        </Typography>
                                    </ListItemText>
                                    <ListItemIcon>
                                        {isError && <Warning color="error" />}
                                    </ListItemIcon>
                                </MenuItem>
                            })}
                        </Menu>
                    </>)}
                </PopupState>
            </Stack>
        </>);
    }, [globalState?.theme, currentStep])


    const incrementStep = (increment) => {
        setCurrentStep(currentStep + increment);
    }

    return <>
        <Box>
            {steps[currentStep]?.component}

            <AppBar position="fixed" sx={{ top: 'auto', height: "72px", bottom: 0, pl: 2, pr: 2, p: 0, bgcolor: "primary.light" }}>
                <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        onClick={() => incrementStep(-1)}
                        disabled={currentStep <= 0}
                        sx={{
                            position: "relative", top: "-15px", bgcolor: "primary.light",
                            ml: 1,
                            ":hover": {
                                bgcolor: "primary.light",
                            }
                        }}
                    >
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                            <KeyboardArrowLeft fontSize="large" />
                        </Avatar>
                    </IconButton>
                    {/* <Avatar sx={{ position: "relative", top: "-15px", bgcolor: "primary.light" }}>
                        <Cancel fontSize="large" />
                    </Avatar> */}

                    <Button variant="contained" color="warning"
                        sx={{ mt: 2 }}
                        startIcon={<Alarm />}>
                        Start
                    </Button>

                    <IconButton
                        onClick={() => incrementStep(1)}
                        disabled={currentStep >= steps?.length - 1}
                        sx={{
                            position: "relative", top: "-15px", bgcolor: "primary.light", lineHeight: "normal !important",
                            mr: 1,
                            ":hover": {
                                bgcolor: "primary.light",
                            }
                        }}
                    >
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                            <KeyboardArrowRight fontSize="large" />
                        </Avatar>
                    </IconButton>
                </Stack>
            </AppBar>
        </Box >
    </>
}