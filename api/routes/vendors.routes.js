module.exports = (app) => {
    let vendorController = require('../controllers/vendor.controller');

    app.post('/api/enrollVendor', vendorController.enrollVendor);
    app.get('/api/getAllVendors', vendorController.getAllVendors);
    app.get('/api/getVendorById/:id', vendorController.getVendorById);
}