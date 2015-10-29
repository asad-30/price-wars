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

      /* Analysis */
      var prevCount = Tasks.find({bid: String(currentBrandID)});
      $('#num-econ').html("Economy: " + Tasks.find({bid: currentBrandID, price_category: "Economy"}).count());
      $('#num-ib').html("In Between: " + Tasks.find({bid: currentBrandID, price_category: "In Between"}).count());
      $('#num-lux').html("Luxury: " + Tasks.find({bid: currentBrandID, price_category: "Luxury"}).count());


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
