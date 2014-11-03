(function(root, factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(['chai', 'addresscompiler'], factory);
    } else if (typeof exports === 'object') {
        factory(require('chai'), require('../src/addresscompiler'));
    }
}(this, function(chai, addresscompiler) {
    'use strict';

    var expect = chai.expect;
    chai.Assertion.includeStack = true;

    describe('addresscompiler', function() {
        describe('#compile', function() {
            it("should handle single address correctly in list notation", function() {
                var input = [{
                    address: "andris@tr.ee",
                    name: ""
                }];
                var expected = "andris@tr.ee";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle single address correctly without list notation", function() {
                var input = {
                    address: "andris@tr.ee",
                    name: ""
                };
                var expected = "andris@tr.ee";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle multiple addresses correctly", function() {
                var input = [{
                    address: "andris@tr.ee",
                    name: ""
                }, {
                    address: "andris@example.com",
                    name: ""
                }];
                var expected = "andris@tr.ee, andris@example.com";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle unquoted name correctly", function() {
                var input = [{
                    name: "andris",
                    address: "andris@tr.ee"
                }];
                var expected = "andris <andris@tr.ee>";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle quoted name correctly", function() {
                var input = [{
                    name: "reinman, andris",
                    address: "andris@tr.ee"
                }];
                var expected = '"reinman, andris" <andris@tr.ee>';
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle empty group correctly", function() {
                var input = [{
                    "name": "Undisclosed",
                    "group": []
                }];
                var expected = "Undisclosed:;";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle address group correctly", function() {
                var input = [{
                    "name": "Disclosed",
                    "group": [{
                        "address": "andris@tr.ee",
                        "name": ""
                    }, {
                        "address": "andris@example.com",
                        "name": ""
                    }]
                }];
                var expected = "Disclosed:andris@tr.ee, andris@example.com;";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle mixed group correctly", function() {
                var input = [{
                    "address": "test.user@mail.ee",
                    "name": "Test User"
                }, {
                    "name": "Disclosed",
                    "group": [{
                        "address": "andris@tr.ee",
                        "name": ""
                    }, {
                        "address": "andris@example.com",
                        "name": ""
                    }]
                }, {
                    "name": "Undisclosed",
                    "group": []
                }];
                var expected = "Test User <test.user@mail.ee>, Disclosed:andris@tr.ee, andris@example.com;, Undisclosed:;";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle apostrophe in name correctly", function() {
                var input = [{
                    name: "O'Neill",
                    address: "a@a.com"
                }];
                var expected = "O'Neill <a@a.com>";
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

            it("should handle quote in name correctly", function() {
                var input = [{
                    name: 'Phil "Cool Guy" Freo',
                    address: "a@a.com"
                }];
                var expected = '"Phil \\"Cool Guy\\" Freo" <a@a.com>';
                expect(addresscompiler.compile(input)).to.deep.equal(expected);
            });

        });
    });
}));
