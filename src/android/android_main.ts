
import * as utils from 'tns-core-modules/utils/utils';
import * as application from 'tns-core-modules/application';
import {
  CLog,
  CLogTypes,

} from '../log-helper';

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

  // Getter/Setters
  get enabled() {
    if (this.adapter !== null && this.adapter.isEnabled()) {
      return true;
    } else {
      return false;
    }
  }

  public coarseLocationPermissionGranted() {
    let hasPermission = android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.M;
    if (!hasPermission) {
      const ctx = this._getContext();
      CLog(CLogTypes.info, `app context ${ctx}`);

      hasPermission =
        android.content.pm.PackageManager.PERMISSION_GRANTED ===
        (android.support.v4.content.ContextCompat as any).checkSelfPermission(ctx, android.Manifest.permission.ACCESS_COARSE_LOCATION);
    }
    CLog(CLogTypes.info, 'Bluetooth.coarseLocationPermissionGranted ---- ACCESS_COARSE_LOCATION permission granted?', hasPermission);
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


  public isBluetoothEnabled() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this._isEnabled());
      } catch (ex) {
        CLog(CLogTypes.error, `Bluetooth.isBluetoothEnabled ---- error: ${ex}`);
        reject(ex);
      }
    });
  }



  // Java UUID -> JS
  public uuidToString(uuid) {
    const uuidStr = uuid.toString();
    const pattern = java.util.regex.Pattern.compile('0000(.{4})-0000-1000-8000-00805f9b34fb', 2);
    const matcher = pattern.matcher(uuidStr);
    return matcher.matches() ? matcher.group(1) : uuidStr;
  }

  // val must be a Uint8Array or Uint16Array or a string like '0x01' or '0x007F' or '0x01,0x02', or '0x007F,'0x006F''
  public encodeValue(val) {
    let parts = val;
    // if it's not a string assume it's a byte array already
    if (typeof val === 'string') {
      parts = val.split(',');

      if (parts[0].indexOf('x') === -1) {
        return null;
      }
    }

    const result = Array.create('byte', parts.length);

    for (let i = 0; i < parts.length; i++) {
      result[i] = parts[i];
    }
    return result;
  }

  // JS UUID -> Java
  public stringToUuid(uuidStr) {
    if (uuidStr.length === 4) {
      uuidStr = '0000' + uuidStr + '-0000-1000-8000-00805f9b34fb';
    }
    return java.util.UUID.fromString(uuidStr);
  }


  private _isEnabled() {
    return this.adapter && this.adapter.isEnabled();
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
