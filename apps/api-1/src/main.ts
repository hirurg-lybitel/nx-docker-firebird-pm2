import express, { Request, Response } from 'express';
import { createNativeClient, getDefaultLibraryFilename } from 'node-firebird-driver-native';
import * as dotenv from 'dotenv';
import { config } from '@nx-docker-firebird-pm2/config';
import cors from 'cors';
import path from 'path';
import { wrapForNamedParams } from './named-params';

dotenv.config({ path: path.join(__dirname, '.env') });

const host = config.serverHost;
const port = config.serverPort;

const dataBaseName = process.env.NODE_FB_DB ?? '';
const fb_port = process.env.NODE_FB_PORT ? Number(process.env.NODE_FB_PORT) : 3050;
const fb_host = process.env.NODE_FB_HOST ?? 'localhost';

const username = process.env.SYSDBA ?? '';
const password = process.env.masterkey ?? '';

const app = express();

app.use(cors({
  credentials: true,
  origin: `http://${config.host}:${config.appPort}`,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/usersCount', async (req: Request, res: Response) => {
  const client = createNativeClient(getDefaultLibraryFilename());

  const fullDbName = `${fb_host}/${fb_port}:${dataBaseName}`;
  const attachment = await client.connect(fullDbName, { username, password });
	const transaction = await attachment.startTransaction();

	const result = await attachment.executeSingletonAsObject<{ NUMBER: number }>(transaction, 'select count(*) as NUMBER from gd_user');

	await transaction.commit();
  await attachment.disconnect()
	await client.dispose();

  res.status(200).json({result});
})

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
