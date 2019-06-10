export declare class BluetoothPermissions {
    bluetoothManager: android.bluetooth.BluetoothManager;
    adapter: android.bluetooth.BluetoothAdapter;
    gattServer: android.bluetooth.BluetoothGattServer;
    constructor();
    coarseLocationPermissionGranted(): boolean;
    requestCoarseLocationPermission(callback?: () => void): Promise<boolean>;
    private _getContext;
    private _getActivity;
}
