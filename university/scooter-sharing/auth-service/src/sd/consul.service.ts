import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Consul from 'consul';

@Injectable()
export class ConsulService implements OnModuleInit, OnModuleDestroy {
  private readonly consul: Consul;
  private readonly serviceId: string;
  private readonly consulPort: number;
  private readonly consulHost: string;
  private readonly serviceHost: string;
  private readonly servicePort: number;

  constructor() {
    this.consulHost = process.env.CONSUL_HOST || 'sd';
    this.consulPort = parseInt(process.env.CONSUL_PORT, 10) || 8500;
    this.servicePort = parseInt(process.env.SERVER_PORT, 10) || 3000;
    this.consul = new Consul({
      host: this.consulHost,
      port: this.consulPort,
    });
    this.serviceId = 'auth-service';
    this.serviceHost = process.env.SERVER_HOST || 'auth-service';
  }

  async onModuleInit() {
    await this.registerService();
  }

  async onModuleDestroy() {
    await this.deregisterService();
  }

  private async registerService() {
    try {
      await this.consul.agent.service.register({
        id: this.serviceId,
        name: this.serviceHost,
        address: this.serviceHost,
        port: this.servicePort,
        tags: [
          'traefik.enable=true',
          // 'traefik.http.middlewares.jwt-auth.forwardauth.address=http://auth-service:3000/api/auth/check',
          // 'traefik.http.middlewares.jwt-auth.forwardauth.authresponseheaders=Authorization,X-User-ID,X-User-Role',
          // 'traefik.http.middlewares.jwt-auth.headers.customrequestheaders.Authorization=Bearer .*',
          // 'traefik.http.routers.default.middlewares=jwt-auth', 


          // 'traefik.http.routers.api.rule=PathPrefix(`/api`) && !PathPrefix(`/api/auth`)', 
          // 'traefik.http.routers.api.middlewares=jwt-auth', 
          
          'traefik.http.routers.'+this.serviceHost+'.rule=PathPrefix(`/api/auth`)',  

        ],
        check: {
          name: this.serviceHost+'-check',
          timeout: '10s',
          http: `http://${this.serviceHost}:${this.servicePort}/api/health`,
          interval: '10s',
        },
      });
      console.log('Service registered in Consul successfully');
    } catch (err) {
      console.error('Failed to register service in Consul:', err);
    }
  }

  private async deregisterService() {
    try {
      await this.consul.agent.service.deregister(this.serviceId);
      console.log('Service deregistered from Consul successfully');
    } catch (err) {
      console.error('Failed to deregister service from Consul:', err);
    }
  }
}
