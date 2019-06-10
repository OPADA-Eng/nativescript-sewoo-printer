
import * as utils from 'tns-core-modules/utils/utils';
import * as application from 'tns-core-modules/application';
const ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE = 222;

export class BluetoothPermissions {
  // @link - https://developer.android.com/reference/android/content/Context.html#BLUETOOTH_SERVICE
  public bluetoothManager: android.bluetooth.BluetoothManager = utils.ad
    .getApplicationContext()
    .getSystemService(android.content.Context.BLUETOOTH_SERVICE);
  public adapter: android.bluetooth.BluetoothAdapter = this.bluetoothManager.getAdapter();
  public gattServer: android.bluetooth.BluetoothGattServer;
  // not initializing here, if the Android API is < 21  use LeScanCallback


  constructor() {
  }



  public coarseLocationPermissionGranted() {
    let hasPermission = android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.M;
    if (!hasPermission) {
      const ctx = this._getContext();

      hasPermission =
        android.content.pm.PackageManager.PERMISSION_GRANTED ===
        (android.support.v4.content.ContextCompat as any).checkSelfPermission(ctx, android.Manifest.permission.ACCESS_COARSE_LOCATION);
    }
    return hasPermission;
  }

  public requestCoarseLocationPermission(callback?: () => void): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const permissionCb = (args: application.AndroidActivityRequestPermissionsEventData) => {
        if (args.requestCode === ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE) {
          application.android.off(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb);

          for (let i = 0; i < args.permissions.length; i++) {
            if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
              reject('Permission denied');
              return;
            }
          }

          if (callback) {
            callback();
          }
          resolve();
        }
      };

      // grab the permission dialog result
      application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb);

      // invoke the permission dialog
      (android.support.v4.app.ActivityCompat as any).requestPermissions(
        this._getActivity(),
        [android.Manifest.permission.ACCESS_COARSE_LOCATION],
        ACCESS_COARSE_LOCATION_PERMISSION_REQUEST_CODE
      );
    });
  }



  private _getContext() {
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    const ctx = java.lang.Class.forName('android.app.AppGlobals')
      .getMethod('getInitialApplication', null)
      .invoke(null, null);
    if (ctx) {
      return ctx;
    }

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    return java.lang.Class.forName('android.app.ActivityThread')
      .getMethod('currentApplication', null)
      .invoke(null, null);
  }

  private _getActivity() {
    const activity = application.android.foregroundActivity || application.android.startActivity;
    if (activity === null) {
      // Throw this off into the future since an activity is not available....
      setTimeout(() => {
        this._getActivity();
      }, 250);
      return;
    } else {
      return activity;
    }
  }
}
