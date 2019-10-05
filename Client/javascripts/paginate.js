'use strict';

// eslint-disable-next-line
function paginate(totalNoEntries, startFrom, perPage, allEntries, arrows) {
	var noEntries = totalNoEntries <= perPage ? perPage : totalNoEntries;
	var remainder = noEntries % perPage > 0 ? 1 : 0;
	var no = noEntries / perPage + remainder;
	var array = [];
	var li = '<li class="list-inline"></li>';
	var offset = startFrom;
	for (var i = 1; i <= no; i += 1) {
		array.push(i);
		li += '<li class="list-inline" onclick="insertEntriesList(' + offset + ', ' + perPage + ')">' + i + '</li>';
		offset += perPage;
	}
	document.querySelector('.pagination').innerHTML = '<ul class="no-styling">\n\t\t' + li + '<li class="list-inline"></li>\n\t</ul>';
}
//# sourceMappingURL=paginate.js.map
