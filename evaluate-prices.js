Brands = new Mongo.Collection("brands");
Tasks = new Mongo.Collection("tasks");
NewBrands = new Mongo.Collection("newbrands");
NewTasks = new Mongo.Collection("newtasks");

var count = 0;

if (Meteor.isClient) {
  Template.body.helpers({
    'brands': function(){
      return Brands.find({});
    },

    'nextBrand': function(){
      Session.setDefault('currBid', 0);
      var myBID = Session.get('currBid');
      return Brands.findOne({bid: arr[myBID]});
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


      var previousBrand = Brands.findOne({bid: arr[currentBrandID]});

      var prevCount = Tasks.find({bid: arr[currentBrandID]});
      var econ_count = Tasks.find({bid: arr[currentBrandID], price_category: "Economy"}).count();
      var ib_count = Tasks.find({bid: arr[currentBrandID], price_category: "Premium"}).count();
      var lux_count = Tasks.find({bid: arr[currentBrandID], price_category: "Luxury"}).count();
      var total_count = econ_count + ib_count + lux_count;
      $('#num-econ').html(econ_count);
      $('#num-ib').html(ib_count);
      $('#num-lux').html(lux_count);
      $('#progress-econ').attr( 'style', 'width:' + String(econ_count/total_count * 100) + "%");
      $('#progress-ib').attr( 'style', 'width:' + String(ib_count/total_count * 100) + "%");
      $('#progress-lux').attr( 'style', 'width:' + String(lux_count/total_count * 100) + "%");


      currentBrandID++;

      if(currentBrandID >= Brands.find({}).count()-1) {
        currentBrandID = 0;
      }

      var currentBrand = Brands.findOne({bid: arr[currentBrandID]});
      console.log(currentBrand);
      console.log(previousBrand);

      $("#curr-img").attr('src', currentBrand.blurred_img_url);
      $('#prev-img').attr('src', previousBrand.img_url);
      $('#prev-website-url').html(previousBrand.name);
      $('#prev-website-url').attr('href', previousBrand.website_url);
      // $('#actual_price_category').html('<mark class="'+previousBrand.actual_price_category.toLowerCase()+'-label"><em>'+previousBrand.actual_price_category+'</em></mark><small>');
      $('#actual_price_category').html('View At End');

      Session.set('currBid', currentBrandID);
    }
  })
}
