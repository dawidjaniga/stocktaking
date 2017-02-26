const API_THINGS_URL = '/things';
const IMAGE_STORAGE_PATH = 'public/storage/images/';

const os = require('os');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('./../db');

function performResult(error, results, res) {
    if (error) {
        res.status(400).json(error);
    } else {
        res.json(results)
    }
}

// GET things
router.get(API_THINGS_URL, function (req, res) {
    console.log('GET things:', os.EOL);
    db.getThings((error, results) =>
        performResult(error, results, res)
    );
});

// PUT things
router.put(API_THINGS_URL, function (req, res) {
    const timestamp = Math.ceil((new Date).getTime() / 1000);
    const imageFile = timestamp + '.jpg';
    const imagePath = path.join(IMAGE_STORAGE_PATH, imageFile);

    fs.writeFile(imagePath, req.body.image, 'base64', function (err) {
        console.log(err);
    });

    const things = [{
        'name': req.body.name,
        'quantity': req.body.quantity,
        // 'barcode': req.body.barcode,
        'size': req.body.size,
        'image': imageFile
    }];

    db.createThings(things, (error, results) => {
        performResult(error, results, res)
    });
});

module.exports = router;
