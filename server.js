/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Saeed Bafana 
*  Student ID: 146178223 
*  Date: 20 February 2023
*
*  Published URL: 
*  https://giant-onesies-frog.cyclic.app/
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = 8080;

app.use(express.static('public'));

legoData.initialize().then(() => {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/home.html');
    });

    app.get('/about', (req, res) => {
        res.sendFile(__dirname + '/views/about.html');
    });

    app.get('/lego/sets', (req, res) => {
        const theme = req.query.theme;
        if (theme) {
            legoData.getSetsByTheme(theme)
                .then((sets) => res.json(sets))
                .catch((error) => res.status(404).send('Error: ' + error));
        } else {
            legoData.getAllSets()
                .then((sets) => res.render('sets', { sets, page: '/lego/sets' })) // Add 'page' parameter for active navbar item
                .catch((error) => res.status(404).send('Error: ' + error));
        }
    });

    app.get('/lego/sets/:setNum', (req, res) => {
        const setNum = req.params.setNum;
        legoData.getSetByNum(setNum)
            .then((set) => res.json(set))
            .catch((error) => res.status(404).send('Error: ' + error));
    });

    app.use((req, res) => {
        res.status(404).sendFile(__dirname + '/views/404.html');
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Error initializing Lego data:', error);
});
