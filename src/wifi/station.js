
var config = require('../args/config')
const { execSync } = require('child_process');
var fs = require('fs');
var dhcpcd_file = "/etc/dhcpcd.conf"
var wifiNoHookTemplate = `hostname
clientid
persistent
option rapid_commit
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes
option ntp_servers
option interface_mtu
require dhcp_server_identifier
slaac private
`

var wpa_supplicant_dir = "/etc/wpa_supplicant/wpa_supplicant.conf"
var template = `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=GB
`
var StartWifi = function (ssid, password) {
    if (!config.wifiCustom) {
        console.log('[Info] Wifi Customization flag is not granted');
        return;
    }
    console.log('[Info] Add Wifi Data');
    fs.writeFileSync(wpa_supplicant_dir, template);
    var cmd = 'wpa_passphrase "' + ssid + '" "' + password + '"';
    var stdout = execSync(cmd).toString();
    fs.appendFileSync(wpa_supplicant_dir, stdout);

    console.log('[Info] Clear nohook wpa_supplicant');
    fs.writeFileSync(dhcpcd_file, wifiNoHookTemplate);

    console.log('[Info] Stop hostapd');
    execSync('sudo systemctl stop hostapd');
    execSync('sudo systemctl stop dnsmasq');
    
    console.log('[Info] dhcpcd restart');
    execSync('sudo service dhcpcd restart');
}

module.exports = {
    StartWifi
}