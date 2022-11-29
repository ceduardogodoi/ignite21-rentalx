import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async function (host = 'database_ignite'): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
}
