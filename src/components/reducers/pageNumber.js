export default (store = null, action) => {
    if(action.type === 'PAGE_NR') return action.payload
    return store;
}