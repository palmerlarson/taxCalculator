//Runs listed methods upon loading
window.onload = function() {
	init();
};

//Initial method to run upon loading
const init = () => {
	let button = document.getElementById("submit");
	let input = document.getElementById("userInput");
	button.addEventListener("click", function() {
		run();
	});

}


//Main run method
const run = () => {
	let userInput = document.querySelector("#userInput").value;
	let fedTax = federalTaxCalculation(userInput);
	let stateTax = stateTaxCalculation(userInput);
	let ssTax = ssTaxCalculation(userInput);
	let medTax = medicareTaxCalculation(userInput);
	let totalTaxes = calculateTotalTaxes(fedTax, stateTax, ssTax, medTax);
	let totalNetPay = calculateNetPay(userInput, totalTaxes);

	let display = userDisplay(userInput, fedTax, stateTax, ssTax, medTax,
		totalTaxes, totalNetPay);

}

//outputs the display table to the user
const userDisplay = (gross, fed, state, ss, med, totalTax, netpay) => {

	let displayDiv = document.querySelector(".output");
	displayDiv.innerHTML = `<table class="displayTable">
								<tr>
									<td>Gross Pay</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(gross)}</td>
								</tr>
								<tr>
									<td>Federal Taxes</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(fed)}</td>
								</tr>
								<tr>
									<td>State Taxes</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(state)}</td>
								</tr>
								<tr>
									<td>Social Security Taxes</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(ss)}</td>
								</tr>
								<tr>
									<td>Medicare Taxes</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(med)}</td>
								</tr>
								<tr>
									<td>Total Taxes</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(totalTax)}</td>
								</tr>
								<tr>
									<td>Net Pay</td>
									<td>${new Intl.NumberFormat('en-US',
								  		{ style: 'currency', currency: 'USD' }
										).format(netpay)}</td>
								</tr>
							</table>
							<button type="button" name="button" id="clear">Clear</button>`;

	//clears entered data
	let clear = document.getElementById("clear");
	clear.addEventListener("click", function() {
		displayDiv.innerHTML = "";
		let userInput = document.querySelector("#userInput").value = "";
		console.log("Data has been cleared");
	});
}


//Calculate Federal Tax - algorithm broken into sections - assigning brackets separately
const federalTaxCalculation = userInput => {
	const TAX_BRACKET_A = .10;
	const TAX_BRACKET_B = .12;
	const TAX_BRACKET_C = .22;
	const TAX_BRACKET_D = .24;
	const TAX_BRACKET_E = .32;
	const TAX_BRACKET_F = .35;
	const TAX_BRACKET_G = .37;
	const TAX_CUTOFF_A = 9875;
	const TAX_CUTOFF_B = 30250;
	const TAX_CUTOFF_C = 45399;
	const TAX_CUTOFF_D = 77774;
	const TAX_CUTOFF_E = 44049;
	const TAX_CUTOFF_F = 311049;
	const BRACKET_A_PRETAX = 987.5;
	const BRACKET_B_PRETAX = 3629.88;
	const BRACKET_C_PRETAX = 9987.78;
	const BRACKET_D_PRETAX = 18665.76;
	const BRACKET_E_PRETAX = 14095.68;
	const BRACKET_F_PRETAX = 108867.15;


	let totalFedTaxes = 0;
	let bracket = "";
	let overflow = 0;
	let preTaxTotal = 0;
	let backTaxes = 0;

	//Assign tax bracket
	if (userInput <= 9875) {
		bracket = "a";
	} else if (userInput > 9875 && userInput <= 40125) {
		bracket = "b";
	} else if (userInput > 40125 && userInput <= 85525) {
		bracket = "c";
	} else if (userInput > 85525 && userInput <= 163300) {
		bracket = "d";
	} else if (userInput > 163300 && userInput <= 207350) {
		bracket = "e";
	} else if (userInput > 207350 && userInput <= 518400) {
		bracket = "f";
	} else {
		bracket = "g";
	}

	//Calculate Taxes
	if (bracket === "a") {
		totalFedTaxes = userInput * TAX_BRACKET_A;
	} else if (bracket === "b") {
		preTaxTotal = TAX_CUTOFF_A;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_B;
		backTaxes = BRACKET_A_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	} else if (bracket === "c") {
		preTaxTotal = TAX_CUTOFF_A + TAX_CUTOFF_B;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_C;
		backTaxes = BRACKET_A_PRETAX + BRACKET_B_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	} else if (bracket === "d") {
		preTaxTotal = TAX_CUTOFF_A + TAX_CUTOFF_B + TAX_CUTOFF_C;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_D;
		backTaxes = BRACKET_A_PRETAX + BRACKET_B_PRETAX + BRACKET_C_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	} else if (bracket === "e") {
		preTaxTotal = TAX_CUTOFF_A + TAX_CUTOFF_B + TAX_CUTOFF_C + TAX_CUTOFF_D;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_E;
		backTaxes = BRACKET_A_PRETAX + BRACKET_B_PRETAX + BRACKET_C_PRETAX
			+ BRACKET_D_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	} else if (bracket === "f") {
		preTaxTotal = TAX_CUTOFF_A + TAX_CUTOFF_B + TAX_CUTOFF_C + TAX_CUTOFF_D
			+ TAX_CUTOFF_E;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_F;
		backTaxes = BRACKET_A_PRETAX + BRACKET_B_PRETAX + BRACKET_C_PRETAX
			+ BRACKET_D_PRETAX + BRACKET_E_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	} else {
		preTaxTotal = TAX_CUTOFF_A + TAX_CUTOFF_B + TAX_CUTOFF_C + TAX_CUTOFF_D
			+ TAX_CUTOFF_E + TAX_CUTOFF_F;
		overflow = (userInput - preTaxTotal) * TAX_BRACKET_G;
		backTaxes = BRACKET_A_PRETAX + BRACKET_B_PRETAX + BRACKET_C_PRETAX
			+ BRACKET_D_PRETAX + BRACKET_E_PRETAX + BRACKET_F_PRETAX;
		totalFedTaxes =  overflow + backTaxes;
	}

	return totalFedTaxes;
}

//Calculate state tax - all in one algo
const stateTaxCalculation = userInput => {
	const WISC_TAX_A = .0354;
	const WISC_TAX_B = .0465;
	const WISC_TAX_C = .0627;
	const WISC_TAX_D = .0765;
	const A_MAX = 423.74;
	const B_MAX = 556.14;
	const C_MAX = 15019.76;
	const BRACKET_A_MAX = 11970;
	const BRACKET_B_MAX = 23930;
	const BRACKET_C_MAX = 263480;

	let stateTaxTotal = 0;

	if (userInput < BRACKET_A_MAX) {
		stateTaxTotal = userInput * WISC_TAX_A;
	} else if (userInput >= BRACKET_A_MAX && userInput < BRACKET_B_MAX) {
		stateTaxTotal = ((userInput - BRACKET_A_MAX) * WISC_TAX_B) + A_MAX;
	} else if (userInput >= BRACKET_B_MAX && userInput < BRACKET_C_MAX) {
		stateTaxTotal = ((userInput - BRACKET_B_MAX) * WISC_TAX_C)
			+ (A_MAX + B_MAX);
	} else {
		stateTaxTotal = ((userInput - BRACKET_C_MAX) * WISC_TAX_D)
			+ (A_MAX + B_MAX + C_MAX);
	}

	return stateTaxTotal;
}

//Calculate SS tax
const ssTaxCalculation = userInput => {
	const SS_TAX_RATE = .062;
	const SS_MAX = 137000;

	let totalSSTax = 0;

	if (userInput <= SS_MAX) {
		totalSSTax = userInput * SS_TAX_RATE;
	} else {
		totalSSTax = SS_MAX * SS_TAX_RATE;
	}

	return totalSSTax;
}

//Calculate Medicare tax
const medicareTaxCalculation = userInput => {
	const M_TAX_RATE_A = .0145;
	const M_TAX_RATE_B = .0235;
	const M_MAX = 200000;
	const M_MAXRATE_A = 2900;

	let overflow = 0;
	let totalMedicare = 0;

	if (userInput <= M_MAX) {
		totalMedicare = userInput * M_TAX_RATE_A;
	} else {
		overflow = userInput - M_MAX;
		totalMedicare = (overflow * M_TAX_RATE_B) + M_MAXRATE_A;
	}

	return totalMedicare;
}

//Calculates total amount paid in taxes
const calculateTotalTaxes = (fed, state, ss, medicare) => {
	let totalTax = fed + state + ss + medicare

	return totalTax;
}

//Calculates Net pay
const calculateNetPay = (gross, taxes) => {
	let netpay = gross - taxes;

	return netpay;
}
