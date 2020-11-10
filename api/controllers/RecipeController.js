/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function(req, res) {
        Recipe.find({}).exec(function(err, recipes) {
            if (err) {
                res.send(500, {error: 'Database error'});
            }
            res.view('list', {recipes: recipes});
        });
    },
    
    add: function(req, res) {
        res.view('add');
    },
    create: function(req, res) {
        var name = req.body.name;
        var ingredients = req.body.ingredients;
        var portions = req.body.portions;

        Recipe.create({name:name, ingredients:ingredients, portions:portions}).exec(function(err) {
          if (err) {
              res.send(500, {error: 'Database error'});
          }
  
          res.redirect('/recipe/list');
        });
    },
    delete: function(req, res) {
        Recipe.destroy({id:req.params.id}).exec(function(err) {
          if (err) {
              res.send(500, {error: 'Database error'});
          }
  
          res.redirect('/recipe/list');
        });
        
        return false
    },
    edit: function(req, res) {
        Recipe.findOne({id:req.params.id}).exec(function(err, recipe) {
            if (err) {
                res.send(500, {error: 'Database error'})
            }
  
            res.view('edit', {recipe: recipe});
        });
    },
    update: function(req, res) {
        var name = req.body.name;
        var ingredients = req.body.ingredients;
        var portions = req.body.portions;
        
        Recipe.update({id:req.params.id}, {name:name, ingredients:ingredients, portions:portions}).exec(function(err) {
            if (err) {
                res.send(500, {error: 'Database error'});
              }
  
              res.redirect('/recipe/list');
          });
          
          return false;
      }
};

