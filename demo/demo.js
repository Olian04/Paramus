window.onload = function() {
	const increment = document.createElement('button');
	const decrement = document.createElement('button');
	const output = document.createElement('p');
	const root = document.getElementById('root');

	const store = Paramus('url', { 
		count: 0
	}, store => {
	  output.innerHTML = '' + store.count;
	});

	root.innerHTML = '';
	root.appendChild(increment);
	root.appendChild(decrement);
	root.appendChild(output);

	increment.innerHTML = '+';
	increment.onclick = () => store.count++;

	decrement.innerHTML = '-';
	decrement.onclick = () => store.count--;
}
