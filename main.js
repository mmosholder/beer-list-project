// Beer Constructor 
var Brewery = function(name, location, logo) {
    this.logo = logo;
    this.name = name;
    this.location = location;
    this.clones = [];

    this.render();
};

Brewery.prototype.createClone = function () {
    // 'this' = checkmarked brewery. Need to clone the referenced checked breweries (names not elements), 
    //  keep reference to original item, keep item in array of clones, render.

    // Each time the .map is running over the beer library, it is returning brewery.createClone -- this method
    // will define what is needed to be performed for each item in the beer library that has been checkmarked.
    var clone = this.el.clone();
    this.clones.push(clone);

    return clone;

    // goal is to return this.el.clone();
};

// Render method 
Brewery.prototype.render = function () {   
    if (!this.el) {
        this.el = $('#saved-location-tpl')
            .clone()
            .attr('id',null)
            .addClass('beer-item-block');
    }

    this.clones = this.clones.filter(function (clone) {
        return clone.parent().length;
    });
    var elements = this.clones.concat([this.el]);
    var brewery = this;
    elements.forEach(function (element) {
        element.find('.logo-img').attr('src', brewery.logo);
        element.find('.brewery-name').text(brewery.name);
        element.find('.brewery-location').text(brewery.location);
    });

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
                return brewery.createClone();
            });

            library.el.find('.saved-list').empty().append(elementsRender);
            library.el.find('.favorites-container').css('display', 'none');
            library.el.find('.saved-locations').removeClass('col-sm-offset-1 col-sm-8').addClass('col-sm-12');
            library.el.find('.edit-favorites').css('display', 'inline-block').on('click', function () {       
                library.el.find('.saved-locations').removeClass('col-sm-12').addClass('col-sm-offset-1 col-sm-8');
                library.el.find('.favorites-container').css('display','inline-block');
                library.el.find('.edit-favorites').css('display', 'none');
            });

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

        this.el.find('.checkbox').append(this.element); 
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

var wildWoods = new Brewery (
    'Wild Woods Brewery',
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
    'Boulder Beer Company',
    'Boulder, CO',
    'boulder-beer-logo.png'
);
var twistedPine = new Brewery (
    'Twisted Pine',
    'Boulder, CO',
    'twisted-logo.png'
);
var leftHand = new Brewery (
    'Left Hand Brewing Company',
    'Longmont, CO',
    'left-hand-logo.png'
);
// Add static breweries to brewery library
beerLibrary.addBrewery(suns);
beerLibrary.addBrewery(avery);
beerLibrary.addBrewery(boulderBeer);
beerLibrary.addBrewery(greatDivide);
beerLibrary.addBrewery(leftHand);
beerLibrary.addBrewery(twistedPine);
beerLibrary.addBrewery(wildWoods);
beerLibrary.renderCheckboxes();
//Render library to page
$('.content').prepend(beerLibrary.render());
