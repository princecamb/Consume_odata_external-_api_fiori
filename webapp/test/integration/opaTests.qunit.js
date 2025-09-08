/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["vat/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
