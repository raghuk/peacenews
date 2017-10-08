export default class AppSdk {

    constructor(client) {
        this._client = client;
    }

    getMethods() {
        let result = {};
        result.version = 1;

        ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
            result[method] = (path, options = {}) => {
                console.warn("deprecated api call: ", method, path, options);
                return this._client[method](path, options);
            }
        });

        result.getCategories = () => this._client.get('/categories?per_page=50');
        result.getPosts = (page, exclude) => this._client.get(`/posts?per_page=30&page=${page}&categories_exclude=${exclude}`);
        result.getEvents = (id, page) => this._client.get(`/posts?categories=${id}&page=${page}&per_page=20`);

        return result;
    }
}
