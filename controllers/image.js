const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f3f6e3d73a3342ab8fee38e7ad3d3539'
});

const handleClarifaiApi = (req, res) => {
    app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    // let found = false;

    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })

    // if (!found) {
    //     res.status(404).json('User not found');
    // }

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleClarifaiApi
}