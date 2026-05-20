export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
  connectionString?: string;
}

export class DatabaseUtils {
  static getConfig(): DatabaseConfig {
    return {
      type: process.env.DB_TYPE?.toLowerCase() || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      ssl: process.env.DB_SSL?.toLowerCase() === 'true',
      connectionString: process.env.DB_CONNECTION_STRING,
    };
  }

  static isConfigured(): boolean {
    const config = this.getConfig();
    return Boolean(config.database && (config.connectionString || config.host));
  }

  static getConnectionString(): string {
    const config = this.getConfig();

    if (config.connectionString) {
      return config.connectionString;
    }

    const credentials = `${encodeURIComponent(config.user)}:${encodeURIComponent(config.password)}`;
    const sslParam = config.ssl ? '?ssl=true' : '';

    switch (config.type) {
      case 'postgres':
      case 'postgresql':
        return `postgresql://${credentials}@${config.host}:${config.port}/${config.database}${sslParam}`;
      case 'mysql':
      default:
        return `mysql://${credentials}@${config.host}:${config.port}/${config.database}${sslParam}`;
    }
  }

  static async connect(): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Database is not configured. Please set DB_HOST, DB_NAME, DB_USER, and DB_PASSWORD or DB_CONNECTION_STRING.');
    }

    const config = this.getConfig();

    switch (config.type) {
      case 'postgres':
      case 'postgresql': {
        const { Client } = await import('pg');
        const client = new Client({ connectionString: this.getConnectionString() });
        await client.connect();
        return client;
      }
      case 'mysql':
      default: {
        const mysql = await import('mysql2/promise');
        const connection = await mysql.createConnection(this.getConnectionString());
        return connection;
      }
    }
  }

  static async disconnect(client: any): Promise<void> {
    if (!client) {
      return;
    }

    if (typeof client.end === 'function') {
      await client.end();
    } else if (typeof client.close === 'function') {
      await client.close();
    }
  }

  static async executeQuery(sql: string, params: any[] = []): Promise<any> {
    const client = await this.connect();

    try {
      if (client.query) {
        return await client.query(sql, params);
      }

      if (client.execute) {
        return await client.execute(sql, params);
      }

      throw new Error('Unsupported database client.');
    } finally {
      await this.disconnect(client);
    }
  }
}
