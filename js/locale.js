/*jslint browser: true*/
/*global
    $,
    jQuery,
    alert,
    dir_lookup,
    language_lookup,
    FALLBACK_LOCALE,
    region_lookup*/

(function () {
    "use strict";
    
    var 
		LOCAL_STORAGE = 'localStorage',
		LOCALE_ITEM = 'locale',
		$locale;

    function checkLocale(loc) {
        return loc && dir_lookup[loc];
    }

    function fixLocale(loc) {
        if (loc) {
            loc = loc.toLocaleLowerCase();  // en_US to en_us
            loc = loc.replace(/_/g, '-');   // en_us to en-us
        }
        return loc;
    }

    function localStorageAvailable() {
        try {
            if (window.hasOwnProperty(LOCAL_STORAGE) && window[LOCAL_STORAGE]) {
                var storage = window[LOCAL_STORAGE],
                    x = '_x_';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    function storeLocale() {
        if (localStorageAvailable()) {
            window.localStorage.setItem(LOCALE_ITEM, $locale);
        }
    }

    function removeLocale() {
        window.localStorage.removeItem(LOCALE_ITEM);
    }
    
    function switchToLocale(loc) {
        $locale = loc;
        window.location.href = dir_lookup[loc] + "index.html";
    }

    // Select language selector items 
    $(document).ready(function () {
        
        function selectLocale() {
            if (!$locale) {
                return;
            }
            
            var item = $('#' + $locale);
            if (!item) {
                return;
            }

            $('#language-selector ul.nav > li').removeClass('active');
            item.addClass('active');
        }

        $('#language-selector ul.nav > li').click(function (e) {
            e.preventDefault();
            var newLoc = $(this).attr('id');
            if (newLoc !== $locale) {
                switchToLocale(newLoc);
                storeLocale();
            }
        });
        
        $locale = language_lookup[$('html').attr('lang')];
        
        // If the local storage contains a different locale, switch to it
        if (localStorageAvailable()) {
            var loc =  window.localStorage.getItem(LOCALE_ITEM);
            
            if (!checkLocale(loc)) {
                loc = fixLocale(loc);
            }
            if (checkLocale(loc) && loc !== $locale) {
                // Locale found in LS, switch to the locale
                switchToLocale(loc);
            }
        }
                
        
        // If locale was read from LS, select it on the loaded page
        if (checkLocale($locale)) {
            selectLocale();
            // No need to store the same thing again
            return;
        }
        
        // If something was found in LS, but doesn't look good, try to fix
        $locale = fixLocale($locale);
        if (checkLocale($locale)) {
            selectLocale();
            storeLocale();
            return;
        }
        
        // Still no good, try the browser setting
        if (navigator.userLanguage) {
            $locale = navigator.userLanguage;
        } else if (navigator.language) { // FF
            $locale = navigator.language;
        } else {
            $locale = FALLBACK_LOCALE;
        }
        
        if ($locale !== FALLBACK_LOCALE) {
            $locale = language_lookup[$locale];
            if (checkLocale($locale)) {
                selectLocale();
                storeLocale();
                return;
            }
        }
        
        // Still no good, try geolocation
        jQuery.ajax({
            url: '//freegeoip.net/json/',
            type: 'POST',
            dataType: 'jsonp',
            success: function (location) {
                var loc = fixLocale(location.country_code);
                $locale = region_lookup[loc];
                
                if (!checkLocale($locale)) {
                    $locale = FALLBACK_LOCALE;
                }
                
                selectLocale();
                storeLocale();
            },
            error: function (request, status, error) {
                $locale = FALLBACK_LOCALE;
                selectLocale();
                storeLocale();
            }
        });
    });
    
}());