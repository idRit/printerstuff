const getPageCount = require('docx-pdf-pagecount');

exports.estimatePrice = async (req, res) => {
    let files = req.files;
    let rateLow = req.body.ratePerPageLow;
    let rateHigh = req.body.ratePerPageHigh;
    var totalPrice = 0;

    for (let i = 0; i < files.length; i++) {
        let pages = await getPageCount(files[i].path);
        if (pages >= 10) {
            totalPrice += (rateLow * pages);
        } else {
            totalPrice += (rateHigh * pages);
        }
    }
    
    return res.json({
        totalPrice: totalPrice
    });
}