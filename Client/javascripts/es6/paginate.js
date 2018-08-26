// eslint-disable-next-line
function paginate(totalNoEntries, startFrom, perPage, allEntries, arrows) {
	const noEntries = totalNoEntries <= perPage ? perPage : totalNoEntries;
	const remainder = (noEntries % perPage) > 0 ? 1 : 0;
	const no = noEntries / perPage + remainder;
	const array = [];
	let li = '<li class="list-inline"></li>';
	let offset = startFrom;
	for (let i = 1; i <= no; i += 1) {
		array.push(i);
		li += `<li class="list-inline" onclick="insertEntriesList(${offset}, ${perPage})">${i}</li>`;
		offset += perPage;
	}
	document.querySelector('.pagination').innerHTML = `<ul class="no-styling">
		${li}<li class="list-inline"></li>
	</ul>`;
}
