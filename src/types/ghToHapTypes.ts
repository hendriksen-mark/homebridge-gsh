import { ServiceType } from '@homebridge/hap-client';
import type { SmartHomeV1ExecuteRequestCommands, SmartHomeV1ExecuteResponseCommands, SmartHomeV1SyncDevices } from 'actions-on-google';

export abstract class ghToHap {
  protected createSyncData(service: ServiceType, typeTraits: any) {
    return {
      id: service.uniqueId,
      ...typeTraits,
      name: {
        defaultNames: [
          ...(service.serviceName ? [service.serviceName] : []),
          ...(service.accessoryInformation.Name ? [service.accessoryInformation.Name] : []),
        ],
        name: service.serviceName || service.accessoryInformation.Name || 'Missing Name',
        nicknames: [],
      },
      willReportState: true,
      deviceInfo: {
        manufacturer: service.accessoryInformation.Manufacturer,
        model: service.accessoryInformation.Model,
      },
      customData: {
        aid: service.aid,
        iid: service.iid,
        instanceUsername: service.instance.username,
        instanceIpAddress: service.instance.ipAddress,
        instancePort: service.instance.port,
      },
    };
  }
}

export interface ghToHap_t {
  sync: (service: ServiceType) => Record<string, any>;
  query: (service: ServiceType) => Record<string, any>;
  execute: (service: ServiceType, command: SmartHomeV1ExecuteRequestCommands) => Promise<SmartHomeV1ExecuteResponseCommands>;
}