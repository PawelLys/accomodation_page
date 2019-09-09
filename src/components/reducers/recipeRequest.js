export default (store = [], action) => {
    if(action.type === 'FETCH_RECIPE') return action.payload;
    if(action.type === 'FETCH_RECIPE_ERR') return 'err';
    if(action.type === 'DELETE_FETCH' || action.type === 'DELETE_FETCH_RECIPE') return [];
    return store;
}