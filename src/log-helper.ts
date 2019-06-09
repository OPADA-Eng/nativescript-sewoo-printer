
export enum CLogTypes {
    info,
    warning,
    error
}

export class BluetoothUtil {
    public static debug = false;
}

export interface CRUDOptions {
    peripheralUUID: string;
    serviceUUID: string;
    characteristicUUID: string;
}

export const CLog = (type: CLogTypes = 0, ...args) => {
    if (BluetoothUtil.debug) {
        if (type === 0) {
            // Info
            console.log('NativeScript-Bluetooth: INFO', args);
        } else if (type === 1) {
            // Warning
            console.log('NativeScript-Bluetooth: WARNING', args);
        } else if (type === 2) {
            console.log('NativeScript-Bluetooth: ERROR', args);
        }
    }
};


/**
 * The returned object in several callback functions.
 */
export interface Peripheral {
    /**
     * The UUID of the peripheral.
     */
    UUID: string;

    /**
     * A friendly description of the peripheral as provided by the manufacturer.
     */
    name: string;

    // state: string; // TODO not sure we'll keep this, so not adding it here for now

    /**
     * The relative signal strength which more or less can be used to determine how far away the peripheral is.
     */
    RSSI: number;

    /**
     * Once connected to the peripheral a list of services will be set.
     */
    services?: Service[];

    manufacturerId?: number;

    manufacturerData?: ArrayBuffer;
}
/**
 * A service provided by a periperhal.
 */
export interface Service {
    /**
     * The UUID of the service.
     */
    UUID: string;
    /**
     * Depending on the peripheral and platform this may be a more friendly description of the service.
     */
    name?: string;
    /**
     * A list of service characteristics a client can interact with by reading, writing, subscribing, etc.
     */
    characteristics: Characteristic[];
}

/**
 * A characteristic provided by a service.
 */
export interface Characteristic {
    /**
     * The UUID of the characteristic.
     */
    UUID: string;
    /**
     * Depending on the service and platform (iOS only) this may be a more friendly description of the characteristic.
     * On Android it's always the same as the UUID.
     */
    name: string;
    /**
     * An object containing characteristic properties like read, write and notify.
     */
    properties: {
        read: boolean;
        write: boolean;
        writeWithoutResponse: boolean;
        notify: boolean;
        indicate: boolean;
        broadcast: boolean;
        authenticatedSignedWrites: boolean;
        extendedProperties: boolean;
    };

    /**
     * ignored for now
     */
    descriptors: any;

    /**
     * ignored for now
     */
    permissions: any;
}