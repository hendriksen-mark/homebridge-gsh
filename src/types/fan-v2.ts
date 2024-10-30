import { ServiceType } from '@homebridge/hap-client';
import { SmartHomeV1ExecuteRequestCommands, SmartHomeV1ExecuteResponseCommands } from 'actions-on-google';
import { Characteristic } from '../hap-types';
import { hapBaseType, hapBaseType_t } from './hapBaseType';

export class Fanv2 extends hapBaseType implements hapBaseType_t {
  sync(service: ServiceType) {
    return this.createSyncData(service, {
      type: 'action.devices.types.FAN',
      traits: [
        'action.devices.traits.OnOff',
      ],
    });
  }


  query(service: ServiceType) {
    return {
      on: !!service.serviceCharacteristics.find(x => x.uuid === Characteristic.Active).value,
      online: true,
    };
  }

  async execute(service: ServiceType, command: SmartHomeV1ExecuteRequestCommands): Promise<SmartHomeV1ExecuteResponseCommands> {
    if (!command.execution.length) {
      return { ids: [service.uniqueId], status: 'ERROR', debugString: 'missing command' };
    }
    switch (command.execution[0].command) {
      case ('action.devices.commands.OnOff'): {
        await service.serviceCharacteristics.find(x => x.uuid === Characteristic.Active).setValue(command.execution[0].params.on ? 1 : 0);
        return { ids: [service.uniqueId], status: 'SUCCESS' };
      }
      default: { return { ids: [service.uniqueId], status: 'ERROR', debugString: `unknown command ${command.execution[0].command}` }; }
    }
  }
}
