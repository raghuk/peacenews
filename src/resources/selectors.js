
// App
export function getIsFetching(state) {
    return Boolean(state.app.isFetching);
}

// Categories
export function getCategories(state) {
    return state.categories.allIds.map(id => getCategory(state, id));
}

export function getCategory(state, id) {
    return state.categories.byId[id] || {};
}

// Posts
export function getPosts(state) {
    return state.posts.allIds.map(id => getPost(state, id));
}

export function getPost(state, id) {
    return state.posts.byId[id] || {};
}

export function getSelectedPost(state) {
    return getPost(state, state.posts.selectedId);
}

// Events
export function getEvents(state) {
    return state.events.allIds.map(id => getEvent(state, id));
}

export function getEvent(state, id) {
    return state.events.byId[id] || {};
}

export function getSelectedEvent(state) {
    return getEvent(state, state.events.selectedId);
}
