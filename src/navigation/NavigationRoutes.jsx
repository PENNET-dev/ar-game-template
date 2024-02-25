import { Route, Routes } from "react-router-dom";
import { Home } from "../components/home/Home";
import { SettingsMain } from "../components/settings/SettingsMain";
import { StepperExample } from "../components/stepper/StepperExample";
import { ListExample } from "../components/list/ListExample";

export default function NavigationRoutes({
}) {

    return (<>
        <Routes>
            <Route exact path="/"
                element={
                    <Home />
                }
                errorElement={<>Error</>} />
            <Route exact path="/Home"
                element={
                    <Home />
                }
                errorElement={<>Error</>} />
            <Route exact path="/Stepper"
                element={
                    <StepperExample />
                }
                errorElement={<>Error</>} />
            <Route exact path="/List"
                element={
                    <ListExample />
                }
                errorElement={<>Error</>} />

            <Route exact path="/Settings"
                element={
                    <SettingsMain />
                }
                errorElement={<>Error</>} />
        </Routes>
    </>);
}
