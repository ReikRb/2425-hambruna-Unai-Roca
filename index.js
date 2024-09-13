const dataUrl = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json'
fetch(dataUrl)
	.then(response => response.json())
	.then(data => {

		// Setting the variables
		let most_sugar_doughnut             = ["", 0]
		let most_iron_doughnut              = ["", 0]
		let most_protein_doughnut           = ["", 0]
		let most_fiber_doughnut             = ["", 0]

		for (let i = 0; i < data.items.item.length; i++) {
			const item = data.items.item[i];
			const name = item.name

			//Look for the asked vitamine
			let ironPercent = '';
			for (const  vitamin of item.nutrition_facts.nutrition.vitamines) {
				if (vitamin.type === "Iron") {
				ironPercent = vitamin.percent;
				break;
				}
			}

			// Parse Values
  			const sugar = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
  			const iron = parseInt(ironPercent.replace('%', ''));
  			const protein = parseInt(item.nutrition_facts.nutrition.proteine)
  			const fiber = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)




			//  Check highest or Lowest values
  			checkIfMostPropertyOf(name, sugar, most_sugar_doughnut);
  			checkIfMostPropertyOf(name, iron, most_iron_doughnut);
  			checkIfMostPropertyOf(name, protein, most_protein_doughnut);
  			checkIfMostPropertyOf(name, fiber, most_fiber_doughnut, false);

		}








		console.log("-----------Exercise 1-------------");
		console.log()
		console.log("Most sugar doughnut is:", most_sugar_doughnut[0], "with ", most_sugar_doughnut[1]);
		console.log("Most iron doughnut is:", most_iron_doughnut[0], "with ", most_iron_doughnut[1]);
		console.log("Most protein doughnut is:", most_protein_doughnut[0], "with ", most_protein_doughnut[1]);
		console.log("Most fiber doughnut is: ", most_fiber_doughnut[0], "with ", most_fiber_doughnut[1]);
		console.log()
	});

	// Function to update the highest value if the current one is greater or lower if last param is set to false
function checkIfMostPropertyOf(itemName, property, previousDoughnut, calculateMost=true) {
	if (calculateMost) {
	  if (property > previousDoughnut[1]) {
		previousDoughnut[0] = itemName;
		previousDoughnut[1] = property;
	  }
	}else{
	  if (property < previousDoughnut[1]|| previousDoughnut[0] === "" && previousDoughnut[1] === 0) {
		previousDoughnut[0] = itemName;
		previousDoughnut[1] = property;
	  }
	}
  }