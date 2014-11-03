(function(root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.addresscompiler = factory();
    }
}(this, function() {
    "use strict";

    /**
     * Defines an object as a namespace
     */
    var addresscompiler = {};

    /**
     * Builds RFC 2822 name-addr string based on address objects.
     *
     * Example input:
     *    {name: 'John Smith', address: 'john@example.com'}
     * Output:
     *    'John Smith <john@example.com>'
     *
     * Example input:
     *    [{name: 'Jack Sparrow, CPA', address: 'jack@example.com'}, {name: 'John Smith', address: 'john@example.com'}]
     * Output:
     *    '"Jack Sparrow, CPA" <jack@example.com>, John Smith <john@example.com>'
     *
     * @param {Object|Array} addresses An address object or array of address objects
     * @param {Array} [uniqueList] An array to be populated with addresses
     * @return {String} address string
     */
    addresscompiler.compile = function(addresses, uniqueList) {
        var values = [];

        uniqueList = uniqueList || [];

        [].concat(addresses || []).forEach(function(address) {
            if (address.address) {
                if (!address.name) {
                    values.push(address.address);
                } else if (address.name) {
                    values.push(addresscompiler._encodeAddressName(address.name) + ' <' + address.address + '>');
                }

                if (uniqueList.indexOf(address.address) < 0) {
                    uniqueList.push(address.address);
                }
            } else if (address.group) {
                values.push(addresscompiler._encodeAddressName(address.name) + ':' + (address.group.length ? addresscompiler.compile(address.group, uniqueList) : '').trim() + ';');
            }
        });

        return values.join(', ');
    };

    /**
     * If needed, encodes the name part
     *
     * @param {String} name Name part of an address
     * @returns {String} Mime word encoded string if needed
     */
    addresscompiler._encodeAddressName = function(name) {
        if (!/^[\w ']*$/.test(name)) {
            if (/^[\x20-\x7e]*$/.test(name)) {
                return '"' + name.replace(/([\\"])/g, '\\$1') + '"';
            }
        }
        return name;
    };

    return addresscompiler;
}));
