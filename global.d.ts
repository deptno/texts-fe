interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
}

declare module "*.svg" {
    var resource: string;
    export = resource;
}
declare module "*.json" {
    const packageInfo: {
        texts: {
            endpoint: string;
        }
    };
    export = packageInfo;
}