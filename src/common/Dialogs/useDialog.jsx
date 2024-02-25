import React, { useEffect, useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog';

// Reducer for card workspaces
export default function useDialog() {
    const [state, setState] = useState({
        open: false,
        title: "Confirm",
        prompt: "Are you sure you wish to perform this action?",
        promptDetail: null,
        callback: null,
        dialogState: null,
    });

    const confirm = ({ title, prompt, promptDetail, okText, cancelText, callback }) => {
        setState({
            ...state,
            open: true,
            title: title,
            prompt: prompt,
            okText,
            cancelText,
            promptDetail: promptDetail,
            callback: callback,
            dialogState: null,
        });
    }

    useEffect(() => {
        if (state.dialogState && state.callback) {
            state.callback();
        }
    }, [state.dialogState])

    const actions = {
        confirm
    };

    const component = <>
        <ConfirmDialog
            title={state.title}
            open={state.open}
            prompt={state.prompt}
            promptDetail={state.promptDetail}
            okText={state.okText}
            cancelText={state.cancelText}
            onClickConfirm={() => setState({ ...state, ...{ open: false, dialogState: true } })}
            onClickCancel={() => setState({ ...state, ...{ open: false, dialogState: false } })}
        />
    </>;

    return {
        state,
        component,
        actions
    };
}
