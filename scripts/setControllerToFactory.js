const NEST3PriceOracleMock = artifacts.require("NEST3PriceOracleConstMock");
const CoFiXController = artifacts.require("CoFiXController");
const CoFiXFactory = artifacts.require("CoFiXFactory");
const CoFiXKTable = artifacts.require("CoFiXKTable");
const ERC20 = artifacts.require("ERC20");
const { BN } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-environment');
const Decimal = require('decimal.js');

const argv = require('yargs').argv;

module.exports = async function (callback) {

    try {
        console.log(`argv> nest=${argv.nest}, factory=${argv.factory}, table=${argv.controller}`);

        const Factory = await CoFiXFactory.at(argv.factory);
        const Controller = await CoFiXController.at(argv.controller);

        let controller = await Factory.getController();
        console.log("before> controller:", controller);

        await Factory.setController(Controller.address);

        controller = await Factory.getController();
        console.log("after> controller:", controller);

        callback();
    } catch (e) {
        callback(e);
    }
}