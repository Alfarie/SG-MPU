
var config = require('../args/config')
const { execSync } = require('child_process');
var fs = require('fs');
var dhcpcd_file = "/etc/dhcpcd.conf"
var wifiHookTemplate = `hostname
clientid
persistent
option rapid_commit
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes
option ntp_servers
option interface_mtu
require dhcp_server_identifier
slaac private
interface wlan0
static ip_address=192.168.100.1/24
static routers=192.168.100.1
static domain_name_servers=192.168.100.1 8.8.8.8 fd51:42f8:caae:d92e::1
`


var hostapd_file = '/etc/hostapd/hostapd.conf'


var StartAP = function (SSID, PASS) {
    if (!config.wifiCustom) {
        console.log('[Info] Wifi Customization flag is not granted');
        return;
    }
    //add nohook
var hostapdTemplate = `interface=wlan0
driver=nl80211
ssid=`+ SSID + `
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=`+ PASS + `
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
`
    console.log('[Info] Add SSID');
    fs.writeFileSync(hostapd_file, hostapdTemplate);

    console.log('[Info] Add nohook wpa_supplicant');
    fs.writeFileSync(dhcpcd_file, wifiHookTemplate);
    fs.appendFileSync(dhcpcd_file, "nohook wpa_supplicant")

    // console.log('[Info] Set static Ip');;
    // var stdout = execSync('sudo ifconfig wlan0 192.168.100.1 netmask 255.255.255.0');

    console.log('[Info] dhcpcd restart');
    execSync('sudo service dhcpcd restart');

    console.log('[Info] Start hostapd, dnsmasq');
    execSync('sudo systemctl start hostapd');
    execSync('sudo systemctl start dnsmasq');
    setTimeout(()=>{execSync('sudo reboot')}, 5000)
}

module.exports = {
    StartAP
}