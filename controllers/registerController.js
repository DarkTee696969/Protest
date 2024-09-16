module.exports = (req, res) => {

    let email = ""
    let password = ""
    let username = ""
    let tel = ""
    let location = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        email  = data.email;
        password = data.password
        username = data.username
        tel = data.tel
        location = data.location
    }

    res.render('register',{
        errors: req.flash('validationErrors'),
        email: email,
        password: password,
        username: username,
        tel: tel,
        location: location
    })
}