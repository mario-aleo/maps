cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.OrientationLock/www/orientationLock.js",
        "id": "com.phonegap.plugins.OrientationLock.OrientationLock",
        "clobbers": [
            "OrientationLock"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
        "id": "cordova-plugin-device-orientation.CompassError",
        "clobbers": [
            "CompassError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
        "id": "cordova-plugin-device-orientation.CompassHeading",
        "clobbers": [
            "CompassHeading"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
        "id": "cordova-plugin-device-orientation.compass",
        "clobbers": [
            "navigator.compass"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.OrientationLock": "0.1",
    "cordova-plugin-device-orientation": "1.0.1",
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-statusbar": "2.0.0-dev",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});