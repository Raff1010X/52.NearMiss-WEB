import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import messageReducer from '../features/message/messageSlice'
import userReducer from '../features/user/userSlice'
import reportReducer from '../features/report/reportSlice'
import registerReducer from '../features/register/registerSlice'
import statisticsReducer from '../features/statistics/statisticsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import otherReduser from '../api/otherSlice'

const reducer = {
    login: loginReducer,
    message: messageReducer,
    user: userReducer,
    report: reportReducer,
    register: registerReducer,
    statistics: statisticsReducer,
    comments: commentsReducer,
    other: otherReduser,
}

// Middleware to add the property "async dispatch" to actions
const asyncDispatchMiddleware = (store) => (next) => (action) => {
    let syncActivityFinished = false
    let actionQueue = []
    function flushQueue() {
        actionQueue.forEach((a) => store.dispatch(a)) // flush queue
        actionQueue = []
    }
    function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction])
        if (syncActivityFinished) {
            flushQueue()
        }
    }
    const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch })
    const res = next(actionWithAsyncDispatch)
    syncActivityFinished = true
    flushQueue()
    return res
}

const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware(), ...[asyncDispatchMiddleware]]

export const store = configureStore({
    reducer,
    middleware,
})
