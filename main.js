// Beer Constructor 
var Brewery = function(name, location) {
    this.name = name;
    this.location = location;

    this.render();
};

// Render method 
Brewery.prototype.render = function () {
    if (!this.el) {
        this.el = $('#saved-location-tpl')
            .clone()
            .attr('id',null)
            .addClass('beer-item-block');
    }

    this.el.find('.brewery-name').text(this.name);
    this.el.find('.brewery-location').text(this.location);

    return this.el;
};

// Saved Locations Library Constructor
var BreweryLibrary = function () {
    this.breweries = [];
    this.render();
};

// Add Brewery Method
BreweryLibrary.prototype.addBrewery = function (brewery) {
    this.breweries.push(brewery);
    this.render();
};

// Render Library Method 
BreweryLibrary.prototype.render = function () {
    if (!this.el) {
        this.el = $('#library-tpl')
            .clone()
            .attr('id', null)
            .addClass('brewery-library');    
    }

    var breweryElements = this.breweries.map(function (brewery) {
        return brewery.render();
    });

    this.el.find('.location-list').append(breweryElements);

    return this.el;
};

// Render checkboxes with names of breweries 
// BreweryLibrary.prototype.checkboxes = function () {
//     var checklist = this.breweries.map(function (brewery) {
//         this.breweries.name
//     });
// };

// Initialize a new brewery library
var beerLibrary = new BreweryLibrary();

// Dummy Data
var avery = new Brewery (
    'Avery Brewing',
    'Boulder, CO'
);

var wildwoods = new Brewery (
    'Wildwoods',
    'Boulder, CO'
);

var suns = new Brewery (
    '300 Suns',
    'Longmont, CO'
);

var greatDivide = new Brewery (
    'Great Divide Brewing',
    'Denver, CO'
);
// Add static breweries to brewery library
beerLibrary.addBrewery(avery);
beerLibrary.addBrewery(wildwoods);
beerLibrary.addBrewery(suns);
beerLibrary.addBrewery(greatDivide);

//Render library to page
$('.content').append(beerLibrary.render());
