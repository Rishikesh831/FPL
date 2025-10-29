// Let's Explain the Code

// This JavaScript code is designed to handle the submission of a proposal form on a webpage. 
// When the form is submitted, it prevents the default behavior (which would refresh the page), 
// calculates the total estimated cost based on the hourly rate and number of hours provided by the user, 
// and then generates a proposal summary that is displayed on the page.

// Here's a breakdown of how it works:
// 1. The code waits for the DOM content to be fully loaded before executing any scripts 
// to ensure all elements are accessible.
// 2. It selects various elements from the DOM using their IDs, including the form, input fields, 
// and the output area where the proposal will be displayed.
// 3. An event listener is added to the form that listens for the "submit" event.
// 4. When the form is submitted, the default action is prevented using `e.preventDefault()`.
// 5. The total cost is calculated by multiplying the hourly rate by the number of hours, 
// and it is formatted to two decimal places.
// 6. A proposal string is created using template literals, incorporating the values from the input fields.
// 7. Finally, the generated proposal is inserted into the output area of the webpage.

document.addEventListener('DOMContentLoaded', () => {
    const clientName = document.getElementById("name");
    const hourlyRate = document.getElementById("rate");
    const hours = document.getElementById("hours");
    const jobDesc = document.getElementById("jobDesc");
    const template = document.getElementById("templateDropdown");
    const output = document.getElementById("proposalOutput");
    const generate = document.getElementById("generate");

    generate.addEventListener("click", () => {
    const total = (parseFloat(hourlyRate.value) * parseFloat(hours.value)).toFixed(2);

    const proposal = `
        <h3>Proposal for ${clientName.value}</h3>
        <p><strong>Project:</strong> ${jobDesc.value}</p>
        <p><strong>Estimated Hours:</strong> ${hours.value}</p>
        <p><strong>Hourly Rate:</strong> $${hourlyRate.value}/hr</p>
        <p><strong>Total Estimated Cost:</strong> $${total}</p>
        <p><strong>Selected Template:</strong> ${template.value}</p>
        <p>Thank you for considering this proposal. Looking forward to collaborating!</p>
    `;

    output.innerHTML = proposal;
    });
});


// Let,s Explain the whole code step by step definig pupose of each funtion and each line 
// 1. `document.addEventListener('DOMContentLoaded', () => { ... });`
// - This line sets up an event listener that waits for the entire HTML document 
// to be fully loaded and parsed before executing the code inside 
// the callback function. This ensures that all DOM elements are accessible when the script runs.
// 2. `const clientName = document.getElementById("name");`
// - This line selects the HTML element with the ID "name" 
// (which is expected to be an input field for the client's name) 
// and assigns it to the variable `clientName` for later use.
// 3. `const hourlyRate = document.getElementById("rate");`
// - Similar to the previous line, this selects the input field for the hourly rate 
// and assigns it to the variable `hourlyRate`.
// 4. `const hours = document.getElementById("hours");`
// - This line selects the input field for the number of hours 
// and assigns it to the variable `hours`.
// 5. `const jobDesc = document.getElementById("jobDesc");`
// - This line selects the input field for the job description 
// and assigns it to the variable `jobDesc`.
// 6. `const template = document.getElementById("templateDropdown");`
// - This line selects the dropdown menu for selecting a template 
// and assigns it to the variable `template`.
// 7. `const output = document.getElementById("proposalOutput");`
// - This line selects the HTML element where the generated proposal will be displayed 
// and assigns it to the variable `output`.
// 8. `const generate = document.getElementById("generate");`
// - This line selects the button that will trigger the proposal generation 
// and assigns it to the variable `generate`.
// 9. `generate.addEventListener("click", () => { ... });`
// - This line sets up an event listener on the "generate" button 
// that listens for a "click" event. When the button is clicked, 
// the code inside the callback function will be executed.
// 10. `const total = (parseFloat(hourlyRate.value) * parseFloat(hours.value)).toFixed(2);`
// - This line calculates the total estimated cost by multiplying 
// the hourly rate by the number of hours. 
// It uses `parseFloat` to convert the string values from the input fields 
// into floating-point numbers. The result is then formatted to two decimal places 
// using `toFixed(2)` and assigned to the variable `total`.
// 11. `const proposal = \` ... \`;`
// - This block creates a multi-line string (using template literals) 
// that contains the formatted proposal. It incorporates the values 
// from the input fields and the calculated total cost. 
// The proposal includes headings and paragraphs to structure the information.
// 12. `output.innerHTML = proposal;`
// - This line sets the inner HTML of the `output` element 
// to the generated proposal string. This effectively displays 
// the proposal on the webpage for the user to see.
// 13. `});`
// - This closes the event listener callback function for the "click" event on the "generate" button.
// 14. `});`
// - This closes the event listener callback function for the 'DOMContentLoaded' event.