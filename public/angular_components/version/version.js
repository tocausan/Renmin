'use strict';

angular.module('renmin.version', [
  'renmin.version.interpolate-filter',
  'renmin.version.version-directive'
])

.value('version', '0.1');
