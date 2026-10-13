/*
 * Offline-only sample content.
 * The restaurant app uses the live JHU Coursera menu API whenever reachable.
 * These representative samples allow the exercise to run if that server is
 * offline or the visitor has no internet connection.
 */
(function (global) {
  'use strict';
  var categories = [
    {name:'Lunch',short_name:'L',special_instructions:'Served Sunday–Friday, 11:15am–3:00pm.'},
    {name:'Soup',short_name:'A',special_instructions:''},
    {name:'Appetizers',short_name:'B',special_instructions:''},
    {name:"Chef's Recommendations",short_name:'SP',special_instructions:''},
    {name:'Chicken',short_name:'C',special_instructions:''},
    {name:'Beef',short_name:'F',special_instructions:''},
    {name:'Veal',short_name:'V',special_instructions:''},
    {name:'Duck',short_name:'DK',special_instructions:''},
    {name:'Vegetables',short_name:'VG',special_instructions:''},
    {name:'Curry',short_name:'CU',special_instructions:''},
    {name:'Noodles (Lo Mein)',short_name:'NL',special_instructions:''},
    {name:'Mei Fan (Very Fine Noodles)',short_name:'NF',special_instructions:''},
    {name:'Pan Fried Noodles',short_name:'PF',special_instructions:''},
    {name:'Fried Rice',short_name:'FR',special_instructions:''},
    {name:'Chow Mein',short_name:'CM',special_instructions:''},
    {name:'Egg Foo Young',short_name:'FY',special_instructions:''},
    {name:'Side Orders',short_name:'SO',special_instructions:''},
    {name:'Desserts',short_name:'DS',special_instructions:''},
    {name:'Dinner Combo',short_name:'D',special_instructions:'Served with your choice of rice.'},
    {name:'Sushi Menu',short_name:'SR',special_instructions:'Contains raw ingredients; please ask about allergens.'}
  ];
  var demos = {
    L: [['L1','Lunch Chicken & Rice','Sample lunch plate with steamed rice.'],['L2','Vegetable Lunch Plate','Sample vegetable entrée with rice.']],
    A: [['A1','Wonton Soup','Sample savory broth with wontons.'],['A2','Hot & Sour Soup','Sample spicy and tangy soup.']],
    B: [['B1','Spring Rolls','Sample crispy vegetable rolls.'],['B2','Steamed Dumplings','Sample dumplings and dipping sauce.']],
    SP: [['SP1','Chef’s Special Chicken','Sample signature chicken entrée.'],['SP2','House Combination','Sample selection from the chef.']],
    C: [['C1','Sesame Chicken','Sample sesame-glazed chicken dish.'],['C2','Chicken and Broccoli','Sample stir-fried chicken with broccoli.']],
    F: [['F1','Beef with Broccoli','Sample beef and fresh broccoli.'],['F2','Mongolian Beef','Sample savory beef and scallions.']],
    SR: [['SR1','California Roll','Sample imitation crab and avocado roll.'],['SR2','Vegetable Roll','Sample cucumber and avocado roll.']],
    FR: [['FR1','Vegetable Fried Rice','Sample wok-tossed fried rice.'],['FR2','Chicken Fried Rice','Sample fried rice with chicken.']],
    DS: [['DS1','Sweet Rice Pudding','Sample dessert selection.'],['DS2','Seasonal Fruit','Sample fresh fruit plate.']]
  };
  function itemsFor(category) {
    var rows = demos[category.short_name] || [
      [category.short_name + '1',category.name + ' Selection','Representative menu sample for offline viewing.'],
      [category.short_name + '2','House ' + category.name + ' Special','Representative menu sample for offline viewing.']
    ];
    return rows.map(function (row) {
      return {short_name:row[0],name:row[1],description:row[2],
        price_small:10.95,small_portion_name:'Small',price_large:14.95,large_portion_name:'Large'};
    });
  }
  global.$menuFallback = {
    categories:categories,
    get:function (requestUrl) {
      if (/\/categories\.json(?:\?.*)?$/.test(requestUrl)) {return categories;}
      var match = /\/menu_items\/([^/?]+)\.json(?:\?.*)?$/.exec(requestUrl);
      if (!match) {return null;}
      var category = categories.find(function (item) {return item.short_name === decodeURIComponent(match[1]);});
      return category ? {category:category,menu_items:itemsFor(category)} : null;
    }
  };
})(window);
