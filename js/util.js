function getRelativeClientRect(el, parent) {
	var rect = el.getBoundingClientRect(),
	parentRect = parent.get()[0].getBoundingClientRect();

	return {
		bottom: parentRect.bottom - rect.bottom,
		height: rect.height,
		left: rect.left - parentRect.left - 1,
		right: parentRect.right - rect.right,
		top: rect.top - parentRect.top,
		width: rect.width
	};
}