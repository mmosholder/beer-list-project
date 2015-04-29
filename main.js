// Beer Constructor 
var Brewery = function(name, location, logo) {
    this.logo = logo;
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

    this.el.find('.logo-img').attr('src', this.logo);
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
        
        var library = this;

        // Decide what breweries to render first based on check boxes for favorites.
        this.el.find('.beer-chooser-form').on('submit', function (e) {
            e.preventDefault();
            var checked = $(this).find('.brewery-list-name:checked')
                .map(function() {
                    return $(this).closest('label').find('span').text();
                })
                .toArray();

            var elementsRender = library.breweries.filter(function (brewery) {
                return checked.indexOf(brewery.name) > -1;
            }).map(function (brewery) {
                return brewery.render();
            });

            library.el.find('.saved-list').empty().append(elementsRender);
        });
    }

    var beerElements = this.breweries.map(function (brewery) {
        return brewery.render();
    });

    this.el.find('.locations-list').append(beerElements);

    return this.el;
};

BreweryLibrary.prototype.renderCheckboxes = function () {
    
    for(var i = 0; i < this.breweries.length; i++) {
        this.element = $('#checklist-item')
            .clone()
            .attr('id', null)
            .addClass('checklist-item');

        this.el.find('.checkbox').prepend(this.element); 
        this.element.find('.checkbox-brewery-name').text(this.breweries[i].name);
    }

};

// Initialize a new brewery library
var beerLibrary = new BreweryLibrary();

// Dummy Data
var avery = new Brewery (
    'Avery Brewing',
    'Boulder, CO',
    'avery-logo.png'
);

var wildwoods = new Brewery (
    'Wildwoods',
    'Boulder, CO',
    'wildwoods-logo.png'
);

var suns = new Brewery (
    '300 Suns',
    'Longmont, CO',
    '300-logo.png'
);

var greatDivide = new Brewery (
    'Great Divide Brewing',
    'Denver, CO',
    'gd-logo.jpeg'
);

var boulderBeer = new Brewery (
    'Boulder Beer',
    'Boulder, CO',
    'boulder-beer-logo.png'
);
// Add static breweries to brewery library
beerLibrary.addBrewery(avery);
beerLibrary.addBrewery(wildwoods);
beerLibrary.addBrewery(suns);
beerLibrary.addBrewery(greatDivide);
beerLibrary.addBrewery(boulderBeer);
beerLibrary.renderCheckboxes();
//Render library to page
$('.content').prepend(beerLibrary.render());
