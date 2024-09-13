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
		let list_of_doughnuts_vitamines      	= []
		let list_of_doughnuts_possible_doughs 	= []
		let list_of_doughnuts_possible_toppings = []
		let list_of_purchasable_doughnuts_and_spare_coins = []

		let sum_of_doughnuts_calories 		= 0
		let sum_of_doughnuts_saturated_fats = 0
		let sum_of_doughnuts_vitamines      = []

		const silverCoins = 4
		const newTransFatAmount = '3.2g'
		const newCarbsAmount = '42g'
		const mustAddVitamineDoughnut = 'Magic Fusion'
		const newVitamine = ['Nitacina', '0%']
		const newCarbsDailyValue = '53%'
		const mustAddPropertyDoughnut = 'Relaxing Alchemy'
		const propertyName =  'Alergen'
		const alergenName = 'Gluten Free'

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

			//Look for possible doughs
			let doughs = []
			for (const dough of item.batters.batter) {
				doughs.push(dough.type)
			}
			list_of_doughnuts_possible_doughs.push([name, doughs])

			//Look for possible toppings
			let toppings = []
			for (const topping of item.topping) {
				toppings.push(topping.type)
			}
			list_of_doughnuts_possible_toppings.push([name, toppings])
			
			//Check purchasable Amount
			const possibleAmount =  Math.floor(silverCoins / item.ppu)
			const spareCoins = (silverCoins % item.ppu).toFixed(2)
			list_of_purchasable_doughnuts_and_spare_coins.push([item.name, possibleAmount, spareCoins]) 

			// Parse Values
  			const sugar = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars)
  			const iron = parseInt(ironPercent.replace('%', ''));
  			const protein = parseInt(item.nutrition_facts.nutrition.proteine)
  			const fiber = parseInt(item.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre)
			const saturated_fat = parseFloat(item.nutrition_facts.nutrition.fat.fat_type.saturated.replace("g", ""))
			const cholesterol = parseInt(item.nutrition_facts.nutrition.cholesterol.amount.replace("mg", ""))

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

			//Modify JSON Data
			if (cholesterol > 12) 
				data.items.item[i].nutrition_facts.nutrition.fat.fat_type.trans = newTransFatAmount

			if (sugar > 50) 
				data.items.item[i].nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = newCarbsAmount

			if (item.name === mustAddVitamineDoughnut) 
				data.items.item[i].nutrition_facts.nutrition.vitamines.push({type:newVitamine[0], percent:newVitamine[1]})

			data.items.item[i].nutrition_facts.nutrition.carbohydrate.daily_value = newCarbsDailyValue

			if (item.name === mustAddPropertyDoughnut) 
				data.items.item[i].propertyName = {type: alergenName}
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

		console.log("-----------Exercise 3-------------");
		for (let index = 0; index < list_of_doughnuts_possible_doughs.length; index++) {
			let logPhrase = `${list_of_doughnuts_possible_doughs[index][0]} has this possible doughs: ${list_of_doughnuts_possible_doughs[index][1]}`
			console.log(logPhrase)
		}
		console.log();

		for (let index = 0; index < list_of_doughnuts_possible_toppings.length; index++) {
			let logPhrase = `${list_of_doughnuts_possible_toppings[index][0]} has this possible toppings: ${list_of_doughnuts_possible_toppings[index][1]}`
			console.log(logPhrase)
		}
		console.log()

		console.log("-----------Exercise 4-------------");
		for (let index = 0; index < list_of_purchasable_doughnuts_and_spare_coins.length; index++) {
			const logPhrase = `The Party could buy ${list_of_purchasable_doughnuts_and_spare_coins[index][1]} ${list_of_purchasable_doughnuts_and_spare_coins[index][0]} and still have ${list_of_purchasable_doughnuts_and_spare_coins[index][2] * 100} copper coins of pocket money.`
			console.log();
			console.log(logPhrase)
		}
		console.log();

		console.log("-----------Exercise 5-------------");
		for (let i = 0; i < data.items.item.length; i++) {
			const item = data.items.item[i]
			const nutrition = item.nutrition_facts.nutrition
			if (parseInt(nutrition.cholesterol.amount.replace("mg", "")) > 12) 
				console.log(`${item.name} changed his trans fats to -> ${nutrition.fat.fat_type.trans}`) 
			
			if (parseInt(nutrition.carbohydrate.carbs_detail.type.sugars) > 50) 
				console.log(`${item.name} changed his trans carbs details to -> ${nutrition.carbohydrate.carbs_detail.amount}`);
			
			if (item.name === mustAddVitamineDoughnut) 
				console.log(`New vitamine named ${nutrition.vitamines.at(-1).type} added to ${item.name}`);
			
			console.log(`${item.name} changed his daily value carbs % to -> ${nutrition.carbohydrate.daily_value}`) 
			
			if (item.name === mustAddPropertyDoughnut) 
				console.log(`New alergen named ${item.propertyName.type} added to ${item.name}`);
				
			console.log();
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