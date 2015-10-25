Brands = new Mongo.Collection("brands");

if (Meteor.isClient) {
  Template.body.helpers({
    'brands': function(){
      return Brands.find({});
    }
  });
}
