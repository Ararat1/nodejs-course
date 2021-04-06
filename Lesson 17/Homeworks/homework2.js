const { networkInterfaces } = require("os")

const IPv4 = networkInterfaces().wlo1[0].address

console.log(IPv4)

/* My os.type() === "Linux", therefore os.networkInterfaces() is the following object:
{
    lo: [
        {
        address: '127.0.0.1',
        netmask: '255.0.0.0',
        family: 'IPv4',
        mac: '00:00:00:00:00:00',
        internal: true,
        cidr: '127.0.0.1/8'
        },
        {
        address: '::1',
        netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
        family: 'IPv6',
        mac: '00:00:00:00:00:00',
        internal: true,
        cidr: '::1/128',
        scopeid: 0
        }
    ],
    wlo1: [
        {
        address: '192.168.1.206',
        netmask: '255.255.255.0',
        family: 'IPv4',
        mac: '74:40:bb:40:08:49',
        internal: false,
        cidr: '192.168.1.206/24'
        },
        {
        address: 'fe80::8148:25d1:24e8:d726',
        netmask: 'ffff:ffff:ffff:ffff::',
        family: 'IPv6',
        mac: '74:40:bb:40:08:49',
        internal: false,
        cidr: 'fe80::8148:25d1:24e8:d726/64',
        scopeid: 3
        }
    ]
    }
*/