"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ytdl = require("ytdl-core");
var express = require("express");
var bodyParser = require("body-parser");
function getInfo(url) {
    return new Promise(function (resolve, reject) {
        ytdl.getInfo(url, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info.formats.map(function (format) {
                    return {
                        url: format.url,
                        quality: format.quality,
                        quality_label: format.quality_label,
                        type: format.type
                    };
                }));
            }
        });
    });
}
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.get('/api', function (request, response) {
    var url = request.query.url;
    if (!url) {
        response.status(400)
            .json({
            success: false,
            message: 'URL must be specified'
        });
        return;
    }
    getInfo(url)
        .then(function (val) { return response.status(200).json(val); })
        .catch(function (err) { return response.status(500).send(err); });
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=index.js.map