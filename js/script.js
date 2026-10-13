/*
 * Module 5 Coding Assignment — completed TODO: STEP 0 through STEP 4.
 * Source pattern: jhu-ep-coursera/fullstack-course4/assignments/assignment5.
 * The assigned home-snippet.html has deliberately not been edited.
 */
$(function () {
  $('#navbarToggle').blur(function () {
    if (window.innerWidth < 768) {$('#collapsable-nav').collapse('hide');}
  });
  // Hide the small-screen menu after choosing a navigation link.
  $('#collapsable-nav a').click(function () {
    if (window.innerWidth < 768) {$('#collapsable-nav').collapse('hide');}
  });
});

(function (global) {
  'use strict';
  var dc = {};
  var homeHtmlUrl = 'snippets/home-snippet.html';
  var allCategoriesUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json';
  var categoriesTitleHtml = 'snippets/categories-title-snippet.html';
  var categoryHtml = 'snippets/category-snippet.html';
  var menuItemsUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/';
  var menuItemsTitleHtml = 'snippets/menu-items-title.html';
  var menuItemHtml = 'snippets/menu-item.html';

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    if (targetElem) {targetElem.innerHTML = html;}
  };
  var showLoading = function (selector) {
    insertHtml(selector,'<div class="loader" role="status"><span class="spinner"></span> Loading the menu…</div>');
  };
  // Replace all instances of {{propName}} in an HTML template.
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = '{{' + propName + '}}';
    return string.replace(new RegExp(propToReplace,'g'),String(propValue == null ? '' : propValue));
  };
  var switchMenuToActive = function () {
    var homeButton = document.querySelector('#navHomeButton');
    var menuButton = document.querySelector('#navMenuButton');
    if (homeButton) {homeButton.classList.remove('active');}
    if (menuButton) {menuButton.classList.add('active');}
  };

  // TODO: STEP 0 — Study how the categories response builds the home page.
  document.addEventListener('DOMContentLoaded', function () {
    showLoading('#main-content');
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML, // TODO: STEP 1 — pass the callback itself, not a call to it.
      true
    );
  });

  // The categories come from the server; the home snippet is then fetched.
  function buildAndShowHomeHTML(categories) {
    $ajaxUtils.sendGetRequest(homeHtmlUrl,function (homeHtml) {
      // TODO: STEP 2 — chooseRandomCategory returns an object.
      // We need the object's short_name for loadMenuItems.
      var chosenCategoryShortName = chooseRandomCategory(categories).short_name;

      // TODO: STEP 3 — insert a safely quoted JS string in an HTML attribute.
      // The snippet uses a double-quoted onclick attribute. Bare JSON quotes
      // would terminate it early: onclick="$dc.loadMenuItems("L");".
      // HTML entities decode back into quotes when the browser parses onclick.
      var quotedShortName = JSON.stringify(chosenCategoryShortName).replace(/"/g, '&quot;');
      var homeHtmlToInsertIntoMainPage = insertProperty(
        homeHtml,'randomCategoryShortName',quotedShortName
      );

      // TODO: STEP 4 — insert the generated home HTML into the page.
      insertHtml('#main-content',homeHtmlToInsertIntoMainPage);
    },false);
  }

  function chooseRandomCategory(categories) {
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new Error('No menu categories were provided');
    }
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex];
  }

  dc.loadMenuCategories = function () {
    showLoading('#main-content');
    $ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML,true);
  };
  dc.loadMenuItems = function (categoryShort) {
    showLoading('#main-content');
    $ajaxUtils.sendGetRequest(menuItemsUrl + encodeURIComponent(categoryShort) + '.json',buildAndShowMenuItemsHTML,true);
  };
  function buildAndShowCategoriesHTML(categories) {
    $ajaxUtils.sendGetRequest(categoriesTitleHtml,function (titleHtml) {
      $ajaxUtils.sendGetRequest(categoryHtml,function (itemHtml) {
        switchMenuToActive();
        insertHtml('#main-content',buildCategoriesViewHtml(categories,titleHtml,itemHtml));
      },false);
    },false);
  }
  function buildCategoriesViewHtml(categories,titleHtml,itemHtml) {
    var finalHtml = titleHtml + '<section class="row">';
    for (var i=0;i<categories.length;i++) {
      var html = itemHtml;
      html = insertProperty(html,'name',categories[i].name);
      html = insertProperty(html,'short_name',categories[i].short_name);
      finalHtml += html;
    }
    return finalHtml + '</section>';
  }
  function buildAndShowMenuItemsHTML(categoryMenuItems) {
    $ajaxUtils.sendGetRequest(menuItemsTitleHtml,function (titleHtml) {
      $ajaxUtils.sendGetRequest(menuItemHtml,function (itemHtml) {
        switchMenuToActive();
        insertHtml('#main-content',buildMenuItemsViewHtml(categoryMenuItems,titleHtml,itemHtml));
      },false);
    },false);
  }
  function buildMenuItemsViewHtml(categoryMenuItems,titleHtml,itemHtml) {
    var category = categoryMenuItems.category;
    titleHtml = insertProperty(titleHtml,'name',category.name);
    titleHtml = insertProperty(titleHtml,'special_instructions',category.special_instructions);
    var finalHtml = titleHtml + '<section class="row">';
    var items = categoryMenuItems.menu_items;
    var shortName = category.short_name;
    for (var i=0;i<items.length;i++) {
      var html = itemHtml;
      html = insertProperty(html,'short_name',items[i].short_name);
      html = insertProperty(html,'catShortName',shortName);
      html = insertItemPrice(html,'price_small',items[i].price_small);
      html = insertItemPortionName(html,'small_portion_name',items[i].small_portion_name);
      html = insertItemPrice(html,'price_large',items[i].price_large);
      html = insertItemPortionName(html,'large_portion_name',items[i].large_portion_name);
      html = insertProperty(html,'name',items[i].name);
      html = insertProperty(html,'description',items[i].description);
      if (i%2!==0) {html += '<div class="clearfix visible-lg-block visible-md-block"></div>';}
      finalHtml += html;
    }
    return finalHtml + '</section>';
  }
  function insertItemPrice(html,pricePropName,priceValue) {
    if (!priceValue) {return insertProperty(html,pricePropName,'');}
    return insertProperty(html,pricePropName,'$'+Number(priceValue).toFixed(2));
  }
  function insertItemPortionName(html,portionPropName,portionValue) {
    if (!portionValue) {return insertProperty(html,portionPropName,'');}
    return insertProperty(html,portionPropName,'('+portionValue+')');
  }
  // Small secondary panels; not part of the random Specials assignment.
  dc.showStory = function () {
    insertHtml('#main-content','<section class="simple-panel"><h2>About Our Bistro</h2><p>A family-inspired restaurant experience in Baltimore, with dishes meant for sharing and traditions worth celebrating.</p><a class="back-home" href="index.html">Back to Home</a></section>');
    return false;
  };
  dc.showAwards = function () {
    insertHtml('#main-content','<section class="simple-panel"><h2>Awards & Recognition</h2><p>We appreciate the support of our community and the kind words of our guests.</p><a class="back-home" href="index.html">Back to Home</a></section>');
    return false;
  };
  global.$dc = dc;
})(window);
