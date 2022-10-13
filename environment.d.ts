declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MIDDLEWARE_SCHEME: 'http' | 'https';
            MIDDLEWARE_HOST: string;
            MIDDLEWARE_PORT: number;
        }
    }
}

export { }