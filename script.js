const url = 'https://api.covid19api.com/summary';
const corsEnabledUrl = 'http://noroffcors.herokuapp.com/' + url;

async function getCoronaCasualties() {
	try {
		const response = await fetch(corsEnabledUrl);
		const result = await response.json();

		selectConutries(result.Countries);
	} catch (error) {
		result.innerHTML = 'There was an error';
		console.log(error);
	}
}
getCoronaCasualties();

function selectConutries(countries) {
	const selector = document.querySelector('.selector');
	const template = document.getElementById('template');
	const totalDeath = document.getElementById('sum');
	let html = '';
	let sum = 0;

	for (let i = 0; i < countries.length; i++) {
		html += `
         <option value="${countries[i].Country}" data-deaths="${countries[i].TotalDeaths}">${countries[i].Country}</option>
      `;
		sum += countries[i].TotalDeaths;
	}
	selector.innerHTML = html;
	totalDeath.innerHTML = sum;

	//Select country from the select tag
	selector.addEventListener('change', function (e) {
		e.stopPropagation();
		e.preventDefault();

		//Get values and data-attribute values from selector
		const country = this.value;
		const deaths = this.selectedOptions[0].dataset.deaths;

		template.innerHTML += ` 
								<tr>
                                    <td class="country">${country}</td>
                                    <td class="total">${deaths}</td>
                                    <td class="remove"><i class="fa fa-trash"></i></td>
                                </tr>   
								`;
//Delete table row 
template.childNodes.forEach((childNode) => {
			childNode.addEventListener('click', function (e) {
				e.target.parentElement.remove();
			});
			
		});
	});
}


