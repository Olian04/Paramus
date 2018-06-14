window.onload = function() {
	const increment = document.createElement('button');
	const decrement = document.createElement('button');
	const output = document.createElement('p');
	const root = document.getElementById('root');

  	increment.innerHTML = '+';
  	decrement.innerHTML = '-';
	root.innerHTML = '';
	root.appendChild(increment);
	root.appendChild(decrement);
	root.appendChild(output);

	Paramus('url', { 
	  count: 0
	}, store => {
	  output.innerHTML = ''+store.count;
    	  increment.onclick = () => store.count++;
    	  decrement.onclick = () => store.count--;
    	  console.log(location.href);
	});
}
