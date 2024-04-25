import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { promisify } from 'util';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private readonly client: Redis;
  private readonly getAsync: (key: string) => Promise<string | null>;
  private readonly setAsync: (
    key: string,
    value: string,
    mode?: string,
    duration?: number | string,
  ) => Promise<'OK'>;
  private readonly delAsync: (key: string) => Promise<number>;

  constructor() {
    this.client = Redis.createClient(); // Assuming Redis is running locally on default port

    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  getRedisClient(): Redis | null {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    return this.getAsync(key);
  }

  async set(
    key: string,
    value: string,
    mode: string = 'EX',
    duration: number | string = process.env.REDIS_EXPIRATION_TIME || 3600,
  ): Promise<'OK'> {
    return this.setAsync(key, value, mode, duration);
  }

  async del(key: string): Promise<number> {
    return this.delAsync(key);
  }

  async close(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.quit((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  onApplicationShutdown(): void {
    this.close().then(() => {
      Logger.warn('Redis client disconnected');
    });
  }
}
