import { useTheme } from "@emotion/react";
import { ChildCare, Cookie, DirectionsRun, Gamepad, KeyboardArrowLeft, MenuOutlined, QuestionMark } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Button, Drawer, Fade, IconButton, Stack, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import classNames from "classnames";
import { makeStyles } from "mui-styles";
import { useCallback, useEffect, useReducer } from "react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGameScores } from "../Game/useGameScores";
import { AppContext } from "./App";
import { propUpdateReducer } from "./common/utility/propUpdateReducer";
import { NavigationMenu } from "./navigation/NavigationMenu";
import NavigationRoutes from "./navigation/NavigationRoutes";

const DRAWER_WIDTH_EXPANDED = 240;
const DRAWER_WIDTH_EXPANDED_MOBILE = 350;
const DRAWER_WIDTH_COLLAPSED = 60;

const useStyles = makeStyles(theme => {
    return {
        appFrame: {
            zIndex: 1,
            overflow: "hidden",
            // height: "100vh"
        },
        appBar: {
            width: "100%",
            zIndex: 1400,
            // borderBottom: "1px solid",
            // borderBottomColor: theme.palette.text.disabled,
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 20
        },
        drawerPaper: {
            position: "fixed",
            width: DRAWER_WIDTH_EXPANDED,
            borderRadius: 0,
            borderTop: "none",
            borderBottom: "none",
            top: theme.spacing(7),
            height: `calc(100% - ${theme.spacing(7)})`
        },
        drawerPaperCollapsed: {
            position: "fixed",
            width: DRAWER_WIDTH_COLLAPSED,
            borderRadius: 0,
            borderTop: "none",
            borderBottom: "none",
            top: theme.spacing(7),
            height: `calc(100% - ${theme.spacing(7)})`,
        },
        drawerPaperMobile: {
            borderRadius: 0,
            borderTop: "none",
            borderBottom: "none",
            width: "100vw",
            zIndex: 2000,
        },
        drawerContent: {
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            width: DRAWER_WIDTH_EXPANDED,
            height: `calc(100% - ${theme.spacing(8)})`,
            paddingTop: theme.spacing(8),
        },
        drawerContentCollapsed: {
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            width: DRAWER_WIDTH_COLLAPSED,
            height: `calc(100% - ${theme.spacing(8)})`,
            paddingTop: theme.spacing(8),
        },
        drawerContentMobile: {
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            // width: "75vw",
            width: DRAWER_WIDTH_EXPANDED_MOBILE,
            height: "100%",
            paddingTop: theme.spacing(2),
            boxSizing: "border-box"
        },
        contentWrapper: {
            paddingTop: theme.spacing(8),
            width: "100%",
            // height: `calc(150% - ${theme.spacing(7)})`, // subtract appbar height
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        },
        contentWrapperFull: {
            paddingTop: theme.spacing(8),
            width: "100%",
            // height: "150%",
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        },
        contentLeft: {
            width: "100%",
            paddingLeft: DRAWER_WIDTH_EXPANDED,
            boxSizing: "border-box",
        },
        contentLeftCollapsed: {
            width: "100%",
            paddingLeft: DRAWER_WIDTH_COLLAPSED,
            boxSizing: "border-box",
        },
        contentShift: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        contentPadding: {
            padding: theme.spacing(3)
        },
        contentPaddingMobile: {
            padding: theme.spacing(1)
        },
    }
});

export const AppShell = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
    const classes = useStyles(theme);
    const isMobile = useMediaQuery("(max-width:767px)");

    const scrollTrigger = useScrollTrigger({ target: document.querySelector(".contentWrapper") || window });

    // ---

    const { globalState, globalDispatch, topNavigationComponent } = useContext(AppContext);

    // const { scores, gameScoreActions } = useGameScores();

    // ---

    const [state, setState] = useState({ isExpanded: !isMobile });

    const isOpen = (!isMobile || state.isExpanded);
    const isExpanded = (isMobile || state?.isExpanded);

    const handleDrawerClose = async () => {
        setState({ isExpanded: false });
    };

    // ---

    const handleDrawerToggle = async () => {
        setState({ isExpanded: !state.isExpanded });
    };

    const handleNavigate = async (path) => {
        navigate(path);
        if (isMobile) {
            handleDrawerClose();
        }
    }

    // ---

    const scoresInitializer = () => {
        return {
            primary: [],
            secondary: [],
        };
    };
    const [scores, dispatchScores] = useReducer(propUpdateReducer, {}, scoresInitializer);

    useEffect(() => {
        const onMessage = event => {
            console.log("msg! ??? ???", event?.data?.func);

            // console.log("msg!", "onMessage", event);
            // Check sender origin to be trusted
            // if (event.origin !== "http://example.com") return;

            var data = event.data;

            if (data.func == "targetHit") {
                console.log("msg!", "onMessage", data.func);
                targetHit(data.message);
            }
        }

        if (window.addEventListener) {
            window.addEventListener("message", onMessage, false);
            return () => {
                window.removeEventListener("message", onMessage);
            };
        }
        else if (window.attachEvent) {
            window.attachEvent("onmessage", onMessage, false);
            return () => {
                window.detachEvent("onmessage", onMessage);
            };
        }
    }, []);

    const targetHit = message => {
        // Function to be called from iframe
        // function targetHit(message) {
        const [targetType, targetID] = message?.split("_");
        console.log("msg! pushing", targetType, targetID);
        // gameScoreActions.pushTarget(targetType, targetID);

        if (!scores[targetType]?.includes(targetID)) {
            dispatchScores({
                type: 'push',
                payload: {
                    key: targetType,
                    value: targetID
                },
            });
        }
    };

    // --- --- ---

    const [isTransitionEnd, setIsTransitionEnd] = useState(false);

    const drawer = (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            anchor="left"
            open={isOpen}
            elevation={0}
            PaperProps={{
                variant: "outlined",
            }}
            onClose={handleDrawerClose}
            onClick={handleDrawerClose}
            className={classNames(
                {
                    [classes.drawerPaper]: (!isMobile && isExpanded),
                    [classes.drawerPaperCollapsed]: (!isMobile && !isExpanded),
                    [classes.drawerPaperMobile]: (isMobile),
                })}
            onTransitionEnter={() => { setIsTransitionEnd(false); }}
            onTransitionEnd={() => { setIsTransitionEnd(true); }}
        >
            {isMobile && isTransitionEnd &&
                <Fade in={isTransitionEnd}>
                    <Button variant="outlined" sx={{
                        bgcolor: "background.paper", border: "none",
                        position: "fixed", left: DRAWER_WIDTH_EXPANDED_MOBILE - 40, top: "1rem",
                        zIndex: 3000,
                        ":hover": {
                            border: 0,
                        }
                    }}>
                        <KeyboardArrowLeft color="info" fontSize="large" />
                    </Button>
                </Fade>}

            <Stack direction="column"
                display="flex"
                className={classNames(
                    {
                        [classes.drawerContent]: (!isMobile && isExpanded),
                        [classes.drawerContentCollapsed]: (!isMobile && !isExpanded),
                        [classes.drawerContentMobile]: (isMobile),
                    })}
            >
                <NavigationMenu isExpanded={isExpanded} handleNavigate={handleNavigate} />
            </Stack >

        </Drawer>
    );

    return (<>
        <Stack direction="column" display="flex" sx={{ height: "100%", boxSizing: "border-box" }}>
            <Box>
                <Stack direction="row" alignItems="center" sx={{ p: 2, width: "100%", display: "flex", boxSizing: "border-box" }}>
                    <Typography sx={{ flexGrow: 1 }}>
                        Hide and Seek
                    </Typography>
                    <Button variant="outlined" sx={{ justifySelf: "flex-end" }}>
                        <QuestionMark />
                    </Button>
                </Stack>
            </Box>
            <iframe src="./Game/index.html" width="100%" style={{ border: 0, flexGrow: 1, boxSizing: "border-box" }}>
            </iframe>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={3}>
                    <Badge badgeContent={scores?.primary?.length}>
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                            <ChildCare fontSize="large" />
                        </Avatar>
                    </Badge>
                    <Badge badgeContent={scores?.secondary?.length}>
                        <Avatar sx={{ bgcolor: "primary.light" }}>
                            <Cookie fontSize="large" />
                        </Avatar>
                    </Badge>
                </Stack>
                {JSON.stringify(scores)}
            </Box>
        </Stack>
    </>);
}
