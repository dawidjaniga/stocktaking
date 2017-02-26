const INDEX_URL = '/';
const CREATE_THINGS_URL = '/things/create';
const GET_STUFF_API_URL = '/api/things/';
const CREATE_THINGS_API_URL = '/api/things';
const IMAGE_STORAGE_PATH = '/storage/images/';

const APP_TITLE = 'Stocktaking';
const express = require('express');
const router = express.Router();

router.get(INDEX_URL, function (req, res) {
    res.render('index', {
        title: APP_TITLE,
        subTitle: 'Stuff',
        getStuffApiUrl: GET_STUFF_API_URL,
        imageStoragePath: IMAGE_STORAGE_PATH
    })
});

router.get(CREATE_THINGS_URL, function (req, res) {
    res.render('createThings', { title: APP_TITLE, subTitle: 'Create things', createThingsApiUrl: CREATE_THINGS_API_URL })
});

module.exports = router;