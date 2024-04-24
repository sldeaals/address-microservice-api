import { Injectable } from '@nestjs/common';

@Injectable()
export class IpWhitelistService {
  private readonly allowedIps: string[] = process.env.IP_WHITELISTED.split(',');

  isIpAllowed(ip: string): boolean {
    return this.allowedIps.includes(ip);
  }

  getAllowedIps(): string[] {
    return this.allowedIps;
  }
}
