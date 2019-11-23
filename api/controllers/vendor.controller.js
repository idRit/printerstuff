const vendorSchema = require('../models/vendor.model');

exports.enrollVendor = async (req, res) => {
    let vendorDetails = {
        vandorName: req.body.vendorName,
        ratePerPageLow: req.body.ratePerPageLow,
        ratePerPageHigh: req.body.ratePerPageHigh
    }

    try {
        let obj = new vendorSchema(vendorDetails);
        await obj.save();
        return res.json({
            success: true,
            message: "Vendor enrolled"
        });
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "some error"
        });
    }

}

exports.getAllVendors = async (req, res) => {
    try {   
        let response = await vendorSchema.find({});
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "some error"
        });
    }
}

exports.getVendorById = async (req, res) => {
    try {   
        let response = await vendorSchema.findOne({ _id: req.params.id });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "some error"
        });
    }
}