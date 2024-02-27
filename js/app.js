window.onload = function() {
    // Fetch JSON data from the provided URL
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())
    .then(data => {
        // Get the current date
        let currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

// Sort data by currency code
data.sort((a, b) => (a.cc > b.cc) ? 1 : ((b.cc > a.cc) ? -1 : 0));

let filteredData = data.filter(item => item.cc === 'USD' || item.cc === 'EUR' || item.cc === 'GBP' || item.cc === 'PLN');

// Create the table header with the current date
let table = '<table><thead><tr>';
table += '<th class="center-align">Currency</th>';
table += '<th class="center-align">Exchange Rate</th>';
table += '<th class="center-align">Date</th>';
table += '</tr></thead><tbody>';

// Iterate over the data and populate the table rows
filteredData.forEach((item, index) => {
    table += '<tr class="' + (index % 2 === 0 ? 'even-row' : '') + '">';
    table += '<td class="center-align">' + item.cc + '</td>';
    table += '<td class="right-align">' + parseFloat(item.rate).toFixed(2) + '</td>';
    table += '<td class="center-align">' + item.exchangedate + '</td>';
    table += '</tr>';
});

table += '</tbody></table>';

// Display the table in the HTML page
document.getElementById('exchangeTable').innerHTML = table;
})
.catch(error => console.error('Error fetching data:', error));
}