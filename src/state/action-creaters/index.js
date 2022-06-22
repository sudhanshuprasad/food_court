export const dectotal = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type: "decrease",
            payload: amount,
        })
    }
}

export const inctotal = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type: "increase",
            payload: amount,
        })
    }
}