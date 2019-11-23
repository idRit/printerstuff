module.exports = (app, upload) => {
    let filesController = require('../controllers/files.controller');

    app.post('/api/estimatePrice', upload, filesController.estimatePrice)
}