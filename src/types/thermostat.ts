/* eslint-disable max-len */

import type { SmartHomeV1ExecuteRequestCommands, SmartHomeV1ExecuteResponseCommands } from 'actions-on-google';
import { ServiceType } from '@homebridge/hap-client';
import { Hap } from '../hap';
import { Characteristic } from '../hap-types';
import { hapBaseType, hapBaseType_t } from './hapBaseType';

export class Thermostat extends hapBaseType implements hapBaseType_t {
  constructor(
    private hap: Hap,
  ) {
    super();
  }

  sync(service: ServiceType) {
    const availableThermostatModes = ['off', 'heat', 'cool'];

    if (service.serviceCharacteristics.find(x => x.uuid === Characteristic.CoolingThresholdTemperature)
      && service.serviceCharacteristics.find(x => x.uuid === Characteristic.HeatingThresholdTemperature)) {
      availableThermostatModes.push('heatcool');
    } else {
      availableThermostatModes.push('auto');
    }

    return this.createSyncData(service, {
      type: 'action.devices.types.THERMOSTAT',
      traits: [
        'action.devices.traits.TemperatureSetting',
      ],
      attributes: {
        availableThermostatModes: availableThermostatModes.join(','),
        thermostatTemperatureUnit: this.hap.config.forceFahrenheit
          ? 'F'
          : service.serviceCharacteristics.find(x => x.uuid === Characteristic.TemperatureDisplayUnits).value ? 'F' : 'C',
      },
    });
  }

  query(service: ServiceType) {
    const targetHeatingCoolingState: number = Number(service.serviceCharacteristics.find(x => x.uuid === Characteristic.TargetHeatingCoolingState).value);
    const thermostatMode = ['off', 'heat', 'cool', 'auto'][targetHeatingCoolingState];

    const response = {
      online: true,
      thermostatMode,
      thermostatTemperatureSetpoint: service.serviceCharacteristics.find(x => x.uuid === Characteristic.TargetTemperature).value,
      thermostatTemperatureAmbient: service.serviceCharacteristics.find(x => x.uuid === Characteristic.CurrentTemperature).value,
    } as any;

    // check if device reports CurrentRelativeHumidity
    if (service.serviceCharacteristics.find(x => x.uuid === Characteristic.CurrentRelativeHumidity)) {
      response.thermostatHumidityAmbient = service.serviceCharacteristics.find(x => x.uuid === Characteristic.CurrentRelativeHumidity).value;
    }

    // check if device reports CoolingThresholdTemperature and HeatingThresholdTemperature
    if (service.serviceCharacteristics.find(x => x.uuid === Characteristic.CoolingThresholdTemperature)
      && service.serviceCharacteristics.find(x => x.uuid === Characteristic.HeatingThresholdTemperature)) {
      // translate mode
      if (response.thermostatMode === 'auto') {
        response.thermostatMode = 'heatcool';
      }

      response.thermostatTemperatureSetpointLow = service.serviceCharacteristics.find(x => x.uuid === Characteristic.HeatingThresholdTemperature).value;
      response.thermostatTemperatureSetpointHigh = service.serviceCharacteristics.find(x => x.uuid === Characteristic.CoolingThresholdTemperature).value;
    }

    return response;
  }

  async execute(service: ServiceType, command: SmartHomeV1ExecuteRequestCommands): Promise<SmartHomeV1ExecuteResponseCommands> {
    if (!command.execution.length) {
      return { ids: [service.uniqueId], status: 'ERROR', debugString: 'missing command' };
    }

    switch (command.execution[0].command) {
      case ('action.devices.commands.ThermostatSetMode'): {
        const mode = {
          off: 0,
          heat: 1,
          cool: 2,
          auto: 3,
          heatcool: 3,
        };
        await service.serviceCharacteristics.find(x => x.uuid === Characteristic.TargetHeaterCoolerState).setValue(mode[command.execution[0].params.thermostatMode]);
        return { ids: [service.uniqueId], status: 'SUCCESS' };
      }
      case ('action.devices.commands.ThermostatTemperatureSetpoint'): {
        await service.serviceCharacteristics.find(x => x.uuid === Characteristic.TargetTemperature).setValue(command.execution[0].params.thermostatTemperatureSetpoint);
        return { ids: [service.uniqueId], status: 'SUCCESS' };
      }
      case ('action.devices.commands.ThermostatTemperatureSetRange'): {
        await service.serviceCharacteristics.find(x => x.uuid === Characteristic.CoolingThresholdTemperature).setValue(command.execution[0].params.thermostatTemperatureSetpointHigh);
        await service.serviceCharacteristics.find(x => x.uuid === Characteristic.HeatingThresholdTemperature).setValue(command.execution[0].params.thermostatTemperatureSetpointLow);
        return { ids: [service.uniqueId], status: 'SUCCESS' };
      }
      default: { return { ids: [service.uniqueId], status: 'ERROR', debugString: `unknown command ${command.execution[0].command}` }; }
    }
  }
}
