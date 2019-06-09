export declare class BluetoothPermissions {
    bluetoothManager: android.bluetooth.BluetoothManager;
    adapter: android.bluetooth.BluetoothAdapter;
    gattServer: android.bluetooth.BluetoothGattServer;
    constructor();
    readonly enabled: boolean;
    coarseLocationPermissionGranted(): boolean;
    requestCoarseLocationPermission(callback?: () => void): Promise<boolean>;
    isBluetoothEnabled(): Promise<{}>;
    uuidToString(uuid: any): any;
    encodeValue(val: any): any;
    stringToUuid(uuidStr: any): java.util.UUID;
    private _isEnabled;
    private _getContext;
    private _getActivity;
}
