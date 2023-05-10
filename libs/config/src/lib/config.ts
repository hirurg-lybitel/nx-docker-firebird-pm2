interface IConfig {
  host: string;
  serverHost: string;
  serverPort: number;
  appPort: number;
}

/** Host where back/container is running  */
const host = (() => {
  return process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.NX_HOST_IP || '';
})();

/** Listening host */
const serverHost = (() => {
  return process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.NX_SERVER_HOST || '';
})();

/** Listening port */
const serverPort = (() => {
  return process.env.NODE_ENV === 'development'
    ? Number(process.env.NX_DEV_SERVER_PORT)
    : Number(process.env.NX_SERVER_PORT);
})();

const appPort = Number(process.env.NX_APP_PORT);

export const config: IConfig = {
  host,
  serverHost,
  serverPort,
  appPort
};
