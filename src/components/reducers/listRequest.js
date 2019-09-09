export default (store = [], action) => {
    if(action.type === 'FETCH_LIST') return action.payload;
    if(action.type === 'FETCH_LIST_ERR') return 'err';
    if(action.type === 'FETCH_LIST_INGERR') return 'ingErr';
    if(action.type === 'DELETE_FETCH') return [];
    return store;
}