'use strict';

/*
 * An Simple AngularJS Gravatar Directive
 *
 * Written by Jim Lavin
 * http://codingsmackdown.tv
 * Modifications by Johnathan Gilday to work with Angular 1.2.0
 */

angular.module('ui-gravatar', ['md5']).
    factory('gravatarImageService', ['md5', function (md5) {
        return {
            getImageSrc : function(value, size, rating, defaultUrl, secure) {
                // convert the value to lower case and then to a md5 hash
                var hash = md5.createHash(value.toLowerCase());
                var src = (secure ? 'https://secure' : 'http://www' ) + '.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl;
                return src;
            }
        };
    }]).
    directive('gravatarImage', ['gravatarImageService', function (gravatarImageService) {
        return {
            restrict:'EAC',
            replace: true,
            scope: {
                email: '@'
            },
            link:function (scope, elm, attrs) {
                // parse the size attribute
                var size = attrs.size || 40;
                // parse the ratings attribute
                var rating = attrs.rating || 'pg';
                // parse the default image url
                var defaultUrl = attrs.defaulturl || '404';
                // get image src from service
                var src = gravatarImageService.getImageSrc(scope.email, size, rating, defaultUrl, attrs.gravatarSecure);
                // construct the tag to insert into the element
                var tag = '<img src="' + src + '" >';
                //remove any existing imgs
                elm.find('img').remove();
                // insert the tag into the element
                elm.append(tag);
            }
        };
    }]);
