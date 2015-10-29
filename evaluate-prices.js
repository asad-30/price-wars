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
      var totalBrands = Brands.find({}).count();

      $('#goal-text').html('Your Goal <small>' + String(totalBrands - currentBrandID) + ' clicks</small>');
      $('#total-clicks').html('');
      $('#total-clicks').attr('aria-valuenow', currentBrandID);
      $('#total-clicks').attr('aria-valuemax', totalBrands);
      $('#total-clicks').attr( 'style', 'width:' + String(currentBrandID/totalBrands * 100) + "%");


      var previousBrand = Brands.findOne({bid: currentBrandID});

      var prevCount = Tasks.find({bid: currentBrandID});
      $('#num-econ').html(Tasks.find({bid: currentBrandID, price_category: "Economy"}).count());
      $('#num-ib').html(Tasks.find({bid: currentBrandID, price_category: "In Between"}).count());
      $('#num-lux').html(Tasks.find({bid: currentBrandID, price_category: "Luxury"}).count());

      currentBrandID++;

      if(currentBrandID >= Brands.find({}).count())
        currentBrandID = 1;

      var currentBrand = Brands.findOne({bid: currentBrandID});
      $("#curr-img").attr('src', currentBrand.blurred_img_url);
      $('#prev-img').attr('src', previousBrand.img_url);
      $('#prev-website-url').html(previousBrand.name);
      $('#prev-website-url').attr('href', previousBrand.website_url);
      $('#actual_price_category').text(previousBrand.actual_price_category);

      Session.set('currBid', currentBrandID);
    }
  })
}
