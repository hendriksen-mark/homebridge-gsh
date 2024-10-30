import { CharacteristicType, ServiceType } from '@homebridge/hap-client';
import { SmartHomeV1QueryRequestDevices, SmartHomeV1SyncDevices } from 'actions-on-google';
import { Hap } from './hap';
import { PluginConfig } from './interfaces';
import { Log } from './logger';
import fs from 'node:fs';
import { expectType } from 'ts-expect';

// socket, log, pin: string, config: PluginConfig

class socketMock {
  on(event: string, callback: any) {
    if (event === 'websocket-status') {
      callback('websocket-status');
    }
    if (event === 'json') {
      callback({ serverMessage: 'serverMessage' });
    }
  }

  sendJson(data: any) {
    // eslint-disable-next-line no-console
    console.log('sendJson', data);
  }
}

const config: PluginConfig = {
  name: 'Google Smart Home',
  token: '1234567890',
  notice: 'Keep your token a secret!',
  debug: false,
  platform: 'google-smarthome',
  twoFactorAuthPin: '123-456',
};

const log = new Log(console, true);

const hap = new Hap(socketMock, log, '031-45-154', config);

describe.skip('process the QUERY intent', () => {
  test('wait for HAP to be Ready', async () => {
    while (!hap.ready) {
      // console.log('waiting for hap to be ready');
      await sleep(500);
    }
    // eslint-disable-next-line no-console
    console.log('hap ready, testing started');
  }, 30000);

  describe('QUERY message with delay to allow manual testing', () => {
    test('lightbulb with On/Off only', async () => {
      const response: any = await hap.query(query);
      // console.log('response', response);
    });
    test('sleeping', async () => {
      await sleep(5000);
    }, 30000);
    test('lightbulb with On/Off only', async () => {
      const response: any = await hap.query(query);
      // console.log('response', response);
    });
    test('sleeping', async () => {
      await sleep(5000);
    }, 30000);
    test('lightbulb with On/Off only', async () => {
      const response: any = await hap.query(query);
      // console.log('response', response);
    });
  });

  afterAll(async () => {
    // eslint-disable-next-line no-console
    console.log('destroy');
    await hap.destroy();
  });
});

describe('process the SYNC intent', () => {
  test('Wait for HAP to be Ready', async () => {
    while (!hap.ready) {
      // console.log('waiting for hap to be ready');
      await sleep(500);
    }
    // eslint-disable-next-line no-console
    console.log('hap ready, testing started');
  }, 30000);

  describe('SYNC message with delay to allow manual testing', () => {
    test('lightbulb with On/Off only', async () => {
      const response: any = await hap.buildSyncResponse();
      expectType<SmartHomeV1SyncDevices[]>(response);
      /*
     // await fs.writeFile('buildSyncResponse.json', JSON.stringify(response, null, 2), (err: any) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
      await fs.writeFile('services.json', JSON.stringify(hap.services, null, 2), (err: any) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
      */
      //      console.log('response', response);
    });
  });

  afterAll(async () => {
    // eslint-disable-next-line no-console
    console.log('destroy');
    await hap.destroy();
  });
});

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const execute = {
  inputs: [
    {
      context: {
        locale_country: 'US',
        locale_language: 'en',
      },
      intent: 'action.devices.EXECUTE',
      payload: {
        commands: [
          {
            devices: [
              {
                customData: {
                  aid: 75,
                  iid: 8,
                  instanceIpAddress: '192.168.1.11',
                  instancePort: 46283,
                  instanceUsername: '1C:22:3D:E3:CF:34',
                },
                id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
              },
            ],
            execution: [
              {
                command: 'action.devices.commands.OnOff',
                params: {
                  on: false,
                },
              },
            ],
          },
        ],
      },
      requestId: '3137481448496135047',
    },
  ],
  requestId: '3137481448496135047',
};

const query: SmartHomeV1QueryRequestDevices[] = [
  {
    customData: {
      aid: 75,
      iid: 8,
      instanceIpAddress: '192.168.1.11',
      instancePort: 46283,
      instanceUsername: '1C:22:3D:E3:CF:34',
    },
    id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
  },
];

/* ----------------- */

const setValue = async function (value: string | number | boolean): Promise<CharacteristicType> {
  // Perform your operations here
  const result: CharacteristicType = {
    aid: 1,
    iid: 1,
    uuid: '00000025-0000-1000-8000-0026BB765291',
    type: 'On',
    serviceType: 'Lightbulb',
    serviceName: 'Trailer Step',
    description: 'On',
    value: 0,
    format: 'bool',
    perms: [
      'ev',
      'pr',
      'pw',
    ],
    canRead: true,
    canWrite: true,
    ev: true,
  };
  return result;
};

const getValue = async function (): Promise<CharacteristicType> {
  // Perform your operations here
  const result: CharacteristicType = {
    aid: 1,
    iid: 1,
    uuid: '00000025-0000-1000-8000-0026BB765291',
    type: 'On',
    serviceType: 'Lightbulb',
    serviceName: 'Trailer Step',
    description: 'On',
    value: 0,
    format: 'bool',
    perms: [
      'ev',
      'pr',
      'pw',
    ],
    canRead: true,
    canWrite: true,
    ev: true,
  };
  return result;
};

const refreshCharacteristics = async function (): Promise<ServiceType> {
  return hapServiceHue;
};

const setCharacteristic = async function (value: string | number | boolean): Promise<ServiceType> {
  // Perform your operations here
  const result: CharacteristicType = {
    aid: 1,
    iid: 1,
    uuid: '00000025-0000-1000-8000-0026BB765291',
    type: 'On',
    serviceType: 'Lightbulb',
    serviceName: 'Trailer Step',
    description: 'On',
    value: 0,
    format: 'bool',
    perms: [
      'ev',
      'pr',
      'pw',
    ],
    canRead: true,
    canWrite: true,
    ev: true,
  };
  return hapServiceHue;
};

const getCharacteristic = function (): CharacteristicType {
  // Perform your operations here
  const result: CharacteristicType = {
    aid: 1,
    iid: 1,
    uuid: '00000025-0000-1000-8000-0026BB765291',
    type: 'On',
    serviceType: 'Lightbulb',
    serviceName: 'Trailer Step',
    description: 'On',
    value: 0,
    format: 'bool',
    perms: [
      'ev',
      'pr',
      'pw',
    ],
    canRead: true,
    canWrite: true,
    ev: true,
  };
  return result;
};

const hapServiceHue: ServiceType = {
  aid: 58,
  iid: 8,
  uuid: '00000043-0000-1000-8000-0026BB765291',
  type: 'Lightbulb',
  humanType: 'Lightbulb',
  serviceName: 'Powder Shower',
  serviceCharacteristics: [
    {
      aid: 58,
      iid: 10,
      uuid: '00000025-0000-1000-8000-0026BB765291',
      type: 'On',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'On',
      value: 0,
      format: 'bool',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 58,
      iid: 11,
      uuid: '000000E3-0000-1000-8000-0026BB765291',
      type: 'ConfiguredName',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'Configured Name',
      value: 'Powder Shower',
      format: 'string',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 58,
      iid: 12,
      uuid: '00000008-0000-1000-8000-0026BB765291',
      type: 'Brightness',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'Brightness',
      value: 65,
      format: 'int',
      perms: ['ev', 'pr', 'pw'],
      unit: 'percentage',
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 58,
      iid: 13,
      uuid: '00000013-0000-1000-8000-0026BB765291',
      type: 'Hue',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'Hue',
      value: 0,
      format: 'float',
      perms: ['ev', 'pr', 'pw'],
      unit: 'arcdegrees',
      maxValue: 360,
      minValue: 0,
      minStep: 1,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 58,
      iid: 14,
      uuid: '0000002F-0000-1000-8000-0026BB765291',
      type: 'Saturation',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'Saturation',
      value: 0,
      format: 'float',
      perms: ['ev', 'pr', 'pw'],
      unit: 'percentage',
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 58,
      iid: 15,
      uuid: '000000CE-0000-1000-8000-0026BB765291',
      type: 'ColorTemperature',
      serviceType: 'Lightbulb',
      serviceName: 'Powder Shower',
      description: 'Color Temperature',
      value: 325,
      format: 'int',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: 500,
      minValue: 140,
      minStep: 1,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
  ],
  accessoryInformation: {
    'Manufacturer': 'Tasmota',
    'Model': 'Tuya MCU',
    'Name': 'Powder Shower',
    'Serial Number': 'ED8243-jessie',
    'Firmware Revision': '9.5.0tasmota',
  },
  values: {
    On: 0,
    ConfiguredName: 'Powder Shower',
    Brightness: 65,
    Hue: 0,
    Saturation: 0,
    ColorTemperature: 325,
  },
  linked: undefined,
  instance: {
    name: 'homebridge',
    username: '1C:22:3D:E3:CF:34',
    ipAddress: '192.168.1.11',
    port: 46283,

  },
  uniqueId: '2a1f1a87419c2afbd847828b96095f892975c36572751ab71f53edf0c5372fdb',
  refreshCharacteristics,
  setCharacteristic,
  getCharacteristic,
};

const hapServiceOnOff: ServiceType = {
  aid: 13,
  iid: 8,
  uuid: '00000043-0000-1000-8000-0026BB765291',
  type: 'Lightbulb',
  humanType: 'Lightbulb',
  serviceName: 'Shed Light',
  serviceCharacteristics: [
    {
      aid: 13,
      iid: 10,
      uuid: '00000025-0000-1000-8000-0026BB765291',
      type: 'On',
      serviceType: 'Lightbulb',
      serviceName: 'Shed Light',
      description: 'On',
      value: 0,
      format: 'bool',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 13,
      iid: 11,
      uuid: '000000E3-0000-1000-8000-0026BB765291',
      type: 'ConfiguredName',
      serviceType: 'Lightbulb',
      serviceName: 'Shed Light',
      description: 'Configured Name',
      value: 'Shed Light',
      format: 'string',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
  ],
  accessoryInformation: {
    'Manufacturer': 'Tasmota',
    'Model': 'WiOn',
    'Name': 'Shed Light',
    'Serial Number': '02231D-jessie',
    'Firmware Revision': '9.5.0tasmota',
  },
  values: { On: 0, ConfiguredName: 'Shed Light' },
  linked: undefined,
  instance: {
    name: 'homebridge',
    username: '1C:22:3D:E3:CF:34',
    ipAddress: '192.168.1.11',
    port: 46283,

  },
  uniqueId: '664195d5556f1e0b424ed32bcd863ec8954c76f8ab81cc399f0e24f8827806d1',
  refreshCharacteristics,
  setCharacteristic,
  getCharacteristic,
};

const hapServiceDimmer: ServiceType = {
  aid: 14,
  iid: 8,
  uuid: '00000043-0000-1000-8000-0026BB765291',
  type: 'Lightbulb',
  humanType: 'Lightbulb',
  serviceName: 'Front Hall',
  serviceCharacteristics: [
    {
      aid: 14,
      iid: 10,
      uuid: '00000025-0000-1000-8000-0026BB765291',
      type: 'On',
      serviceType: 'Lightbulb',
      serviceName: 'Front Hall',
      description: 'On',
      value: 0,
      format: 'bool',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 14,
      iid: 11,
      uuid: '00000008-0000-1000-8000-0026BB765291',
      type: 'Brightness',
      serviceType: 'Lightbulb',
      serviceName: 'Front Hall',
      description: 'Brightness',
      value: 100,
      format: 'int',
      perms: ['ev', 'pr', 'pw'],
      unit: 'percentage',
      maxValue: 100,
      minValue: 0,
      minStep: 1,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
    {
      aid: 14,
      iid: 12,
      uuid: '000000E3-0000-1000-8000-0026BB765291',
      type: 'ConfiguredName',
      serviceType: 'Lightbulb',
      serviceName: 'Front Hall',
      description: 'Configured Name',
      value: 'Front Hall',
      format: 'string',
      perms: ['ev', 'pr', 'pw'],
      unit: undefined,
      maxValue: undefined,
      minValue: undefined,
      minStep: undefined,
      canRead: true,
      canWrite: true,
      ev: true,
      setValue,
      getValue,
    },
  ],
  accessoryInformation: {
    'Manufacturer': 'Tasmota',
    'Model': 'Tuya MCU',
    'Name': 'Front Hall',
    'Serial Number': '23CAC5-jessie',
    'Firmware Revision': '9.5.0tasmota',
  },
  values: { On: 0, Brightness: 100, ConfiguredName: 'Front Hall' },
  linked: undefined,
  instance: {
    name: 'homebridge',
    username: '1C:22:3D:E3:CF:34',
    ipAddress: '192.168.1.11',
    port: 46283,

  },
  uniqueId: '028fc478c0b4b116ead9be0dc8a72251b351b745cbc3961704268737101c803d',
  refreshCharacteristics,
  setCharacteristic,
  getCharacteristic,
};

const commandOnOff = {
  devices: [
    {
      customData: {
        aid: 75,
        iid: 8,
        instanceIpAddress: '192.168.1.11',
        instancePort: 46283,
        instanceUsername: '1C:22:3D:E3:CF:34',
      },
      id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
    },
  ],
  execution: [
    {
      command: 'action.devices.commands.OnOff',
      params: {
        on: true,
      },
    },
  ],
};

const commandBrightness = {
  devices: [
    {
      customData: {
        aid: 75,
        iid: 8,
        instanceIpAddress: '192.168.1.11',
        instancePort: 46283,
        instanceUsername: '1C:22:3D:E3:CF:34',
      },
      id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
    },
  ],
  execution: [
    {
      command: 'action.devices.commands.OnOff',
      params: {
        on: true,
      },
    },
  ],
};

const commandColorHSV = {
  devices: [
    {
      customData: {
        aid: 75,
        iid: 8,
        instanceIpAddress: '192.168.1.11',
        instancePort: 46283,
        instanceUsername: '1C:22:3D:E3:CF:34',
      },
      id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
    },
  ],
  execution: [
    {
      command: 'action.devices.commands.OnOff',
      params: {
        on: true,
      },
    },
  ],
};

const commandColorTemperature = {
  devices: [
    {
      customData: {
        aid: 75,
        iid: 8,
        instanceIpAddress: '192.168.1.11',
        instancePort: 46283,
        instanceUsername: '1C:22:3D:E3:CF:34',
      },
      id: 'b9245954ec41632a14076df3bbb7336f756c17ca4b040914a593e14d652d5738',
    },
  ],
  execution: [
    {
      command: 'action.devices.commands.OnOff',
      params: {
        on: true,
      },
    },
  ],
};
