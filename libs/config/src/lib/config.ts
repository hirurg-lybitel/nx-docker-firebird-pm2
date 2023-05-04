interface IConfig {
  host: string;
  serverPort: number;
  appPort: number;
}

const host = (() => {
  return process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.NX_HOST_IP || '';
})();

const serverPort = (() => {
  return process.env.NODE_ENV === 'development'
    ? Number(process.env.NX_DEV_SERVER_PORT)
    : Number(process.env.NX_SERVER_PORT);
})();

const appPort = (() => {
  return process.env.NODE_ENV === 'development'
    ? Number(process.env.NX_APP_PORT)
    : Number(process.env.NX_SERVER_PORT);
})();

export const config: IConfig = {
  host,
  serverPort,
  appPort
};
