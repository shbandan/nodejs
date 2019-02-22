module.exports = (app) => {

    const userdetail = require('../controllers/userdetail.controller.js');

    app.post('/userdetail', userdetail.create);

    app.get('/userdetail', userdetail.findAll);

    app.get('/userdetail/:userid', userdetail.findOne);

    app.put('/userdetail/:userid', userdetail.update);

    app.delete('/userdetail/:userid', userdetail.delete);
}