import cluster from 'cluster';
import os from 'os';
import { Injectable, Logger } from '@nestjs/common';

type AsyncVoidFunction = () => Promise<void>;

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
  static clusterize(callback: AsyncVoidFunction): void {
    if (cluster.isPrimary) {
      Logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        Logger.warn(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      Logger.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
