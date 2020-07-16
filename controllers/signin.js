const handleSignIn = (db, bcrypt) => (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect Form Submission');
    }
    
    // Load hash from your password DB.
    // bcrypt.compare("apples", '$2a$10$ZEmqu6cFcwihtlspxx0lheFmIrWW8EMPJOXkCDkgSQ80WqVqtM.Mm', function(err, res) {
    //     // res == true
    //     console.log("First Guess", res)
    // });
    // bcrypt.compare("veggies", '$2a$10$ZEmqu6cFcwihtlspxx0lheFmIrWW8EMPJOXkCDkgSQ80WqVqtM.Mm', function(err, res) {
    //     // res = false
    //     console.log("Second Guess", res);
    // });

    // if (req.body.email === database.users[0].email && 
    //     req.body.password === database.users[0].password) {

    //         res.json(database.users[0]);

    // } else {
    //     res.status(400).json('Error Logging In');
    // }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('Unable to get user'))
            }
            res.status(400).json('Username or Password is Incorrect')
    })
        .catch(err => res.status(400).json('Username or Password is Incorrect'))
}

module.exports = {
    handleSignIn
}