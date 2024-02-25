import { DeleteForever, NearMe, Phone, Stars } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

export const SampleCard = ({
    onClick,
    onAction,
}) => {
    return <Card sx={{}}>
        <CardActionArea sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            onClick={onClick}
            component={Box}
        >
            <CardHeader
                title={"Card Title"}
                subheader={"Sub header"}
                avatar={<Stars color="warning" />}
                action={<>
                    <IconButton
                        onMouseDown={e => {
                            e.stopPropagation();
                        }}
                        onMouseUp={e => {
                            e.stopPropagation();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction && onAction("delete")
                        }}>
                        <DeleteForever color="secondary" />
                    </IconButton>
                </>
                }
            />
            <CardContent>
                <Typography variant="h5">
                    Supporting info
                </Typography>
                <Typography variant="subTitle1">
                    More info
                </Typography>
            </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions display="flex" direction="row">
            <Button type="text" size="large" onClick={async () => {
                onAction && onAction("test")
            }}>
                Test
            </Button>
            <Stack direction="row" spacing={2}
                sx={{ flexGrow: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                <IconButton>
                    <Phone color="primary" />
                </IconButton>
                <IconButton>
                    <NearMe color="primary" />
                </IconButton>
            </Stack>
        </CardActions>
    </Card>;
}