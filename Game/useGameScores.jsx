import { useContext, useEffect, useReducer } from "react";
import { AppContext } from "../src/App";
import { propUpdateReducer } from "../src/common/utility/propUpdateReducer";

export const useGameScores = () => {
    const { globalState, globalDispatch } = useContext(AppContext);

    useEffect(() => {
        if (!globalState?.scores_primary?.length) {
            globalDispatch({
                type: 'update',
                payload: {
                    key: "scores_primary",
                    value: [-1]
                },
            });
        }
    }, [])

    useEffect(() => {
        if (!globalState?.scores_secondary?.length) {
            globalDispatch({
                type: 'update',
                payload: {
                    key: "scores_secondary",
                    value: [-1]
                },
            });
        }
    }, [])

    const pushTarget = (targetType, targetID) => {
        if (!globalState["scores_" + targetType]?.includes(targetID)) {
            globalDispatch({
                type: 'push',
                payload: {
                    key: "scores_" + targetType,
                    value: targetID
                },
            });
        }
    }

    return {
        scores: {
            primary: globalState?.scores_primary || [],
            secondary: globalState?.scores_secondary || [],
        },
        gameScoreActions: {
            pushTarget
        }
    }
}