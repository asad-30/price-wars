Brands = new Mongo.Collection("brands");
Tasks = new Mongo.Collection("tasks");
var count = 0;

if (Meteor.isClient) {
  Template.body.helpers({
    'brands': function(){
      return Brands.find({});
    },

    'nextBrand': function(){
      Session.setDefault('currBid', 1);
      var myBID = Session.get('currBid');
      return Brands.findOne({bid: String(myBID)});
    }
  });

  Template.body.events({
    'click #submit_btn' : function() {

      Tasks.insert({bid: currentBrandID, price_category: currentSliderValue});
      $('#total-clicks').html(Tasks.find({}).count() + " clicks!");

      var previousBrand = Brands.findOne({bid: String(currentBrandID)});
      currentBrandID++;

      $('#prev-name').html(previousBrand.name);

      if(currentBrandID >= Brands.find({}).count())
        currentBrandID = 1;

      var currentBrand = Brands.findOne({bid: String(currentBrandID)});
      $("#curr-img").attr('src', currentBrand.img_url);
      $('#prev-img').attr('src', previousBrand.img_url);

      $('#img-head').html(currentBrand.name);
      Session.set('currBid', currentBrandID);
    }
  })
}
