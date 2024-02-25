import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export const useViewport = () => {
    const theme = useTheme();

    const isMobile = useMediaQuery("(max-width:767px)");

    const keys = [...theme.breakpoints.keys]
    const breakpoint = (
        keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key))
            return matches ? key : output
        }, null) ?? 'xs'
    )

    return {
        isMobile,
        breakpoint
    }
}