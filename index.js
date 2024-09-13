const dataUrl = 'https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json'
fetch(dataUrl)
	.then(response => response.json())
	.then(data => {

		// Setting the variables
		let most_sugar_doughnut             = ["", 0]
		let most_iron_doughnut              = ["", 0]
		let most_protein_doughnut           = ["", 0]
		let most_fiber_doughnut             = ["", 0]

		let list_of_doughnuts_calories      	= []
		let list_of_doughnuts_carbohydrates 	= []
		let list_of_doughnuts_vitamines      = []

		let sum_of_doughnuts_calories 		= 0
		let sum_of_doughnuts_saturated_fats = 0
		let sum_of_doughnuts_vitamines      = []

		// Iterate data
		for (let i = 0; i < data.items.item.length; i++) {
			const item = data.items.item[i];
			const name = item.name

			//Look for the asked vitamine
			let ironPercent = '';

			for (const  [index, vitamin] of item.nutrition_facts.nutrition.vitamines.entries()) {
				if (vitamin.type === "Iron") {
				ironPercent = vitamin.percent;
				}

				const exists = list_of_doughnuts_vitamines.includes(vitamin.type)
				if (!exists) {
					list_of_doughnuts_vitamines.push(vitamin.type)
					sum_of_doughnuts_vitamines.push(parseFloat(vitamin.percent.replace('%', '')))
				}
				sum_of_doughnuts_vitamines[index] += parseFloat(vitamin.percent.replace('%', ''))
			}
			
			// Parse Values
  			const sugar = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
  			const iron = parseInt(ironPercent.replace('%', ''));
  			const protein = parseInt(item.nutrition_facts.nutrition.proteine)
  			const fiber = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)
			const saturated_fat = parseFloat(item.nutrition_facts.nutrition.fat.fat_type.saturated.replace("g", ""))

			//Make Lists
			list_of_doughnuts_calories.push([name,item.nutrition_facts.nutrition.calories])
			sum_of_doughnuts_calories += item.nutrition_facts.nutrition.calories
			const carbsAmount = item.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount
			list_of_doughnuts_carbohydrates.push([carbsAmount, fiber, sugar])
			sum_of_doughnuts_saturated_fats += saturated_fat

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

		console.log("-----------Exercise 2-------------");
		console.log()
		for (let i = 0; i < list_of_doughnuts_calories.length; i++) {
		const calories = list_of_doughnuts_calories[i];
		const carbohydrate = list_of_doughnuts_carbohydrates[i]
		console.log(calories[0]," has ", calories[1], " calories and contains ", carbohydrate[0], " of carbohydrates.");
		}

		console.log()
		console.log('The average of calories is: ', (sum_of_doughnuts_calories/data.items.item.length).toFixed(1), "g.")

		console.log()
		console.log("The total amount of saturated fats from all the doughnuts is: ", sum_of_doughnuts_saturated_fats, "g");
		
		console.log()
		for (let i = 0; i < sum_of_doughnuts_vitamines.length; i++) {
			const vitamine = sum_of_doughnuts_vitamines[i];
			console.log("The average amount of " + list_of_doughnuts_vitamines[i] + " is: " + vitamine);
		}
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