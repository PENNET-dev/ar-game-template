import { Avatar, Box, Button } from "@mui/material"
import { useContext } from "react";
import { AppContext } from "../src/App";

export const GameFooter = () => {
    const { globalState, globalDispatch } = useContext(AppContext);

    // ---

    return <>
        <Box sx={{ zIndex: 9999 }}>
        </Box>
    </>
}