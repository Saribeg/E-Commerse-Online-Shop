export const myLogger = store => next => action => {
    console.log(`Action: ${action.type}, data:`, action.payload)
    return next(action)
}