import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { THEME_DARK, THEME_LIGHT } from "../../theme/Themes";
import { AppContext } from "../../App";
import { ButtonLargeSquare } from "../../common/button/ButtonLargeSquare";
import { useViewport } from "../../common/utility/useViewport";

export const SettingsMain = () => {

    const { globalState, globalDispatch, setTopNavigationComponent } = useContext(AppContext);

    // ---

    const { isMobile, breakpoint } = useViewport();

    // ---

    useEffect(() => {
        setTopNavigationComponent(<Typography variant="h6">
            Settings
        </Typography>);
    }, [globalState?.theme])

    const toggleDarkMode = async () => {
        let theme;
        if (globalState?.theme == THEME_DARK) {
            theme = THEME_LIGHT;
        } else {
            theme = THEME_DARK;
        }

        globalDispatch({
            type: 'update',
            payload: {
                key: "theme",
                value: theme
            },
        });
    }

    // ---

    return <>
        <Helmet>
            <title>
                Settings
            </title>
        </Helmet>

        <Box sx={{ width: "100%", textAlign: "center" }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <ButtonLargeSquare
                    title={globalState?.theme == THEME_DARK ? "Light Mode" : "Dark Mode"}
                    icon={globalState?.theme == THEME_DARK ?
                        <LightModeOutlined fontSize="large" />
                        : <DarkModeOutlined fontSize="large" />}
                    onClick={toggleDarkMode}
                    sx={{ borderWidth: "1px" }}
                />
            </Paper>

            <Paper sx={{ p: 2 }}>
                {JSON.stringify({ isMobile, breakpoint })}
            </Paper>
        </Box>
    </>
}