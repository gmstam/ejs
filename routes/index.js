// Homepage
exports.index = function(req, res){
  res.render('index', {title: 'Welcome!'});
};

// User list
exports.userlist = function(db){
  return function(req, res){
    var collection = db.get('utenti');
    collection.find({},{},function(e,docs){
      res.render('userlist', {
        "userlist" : docs,
        title : "User List"
      });
    });
  };
};

// Add user
exports.adduser = function(db){
  return function(req, res){
    // Get input submissions
    var nome = req.body.nome;
    var cognome = req.body.cognome;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    // Set collection
    var collection = db.get('utenti');

    // Submit to DB
    collection.insert({
      "nome" : nome,
      "cognome" : cognome,
      "username" : username,
      "email" : email,
      "password" : password
    },function(err, doc){
      if(err){
        res.send('Errore nell\'inserimento');
      } else {
        res.location('userlist');
        res.redirect('userlist');
      }
    });
  }
}
