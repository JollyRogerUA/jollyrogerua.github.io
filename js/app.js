window.onload = function() {
    
    // Set current version
    let ver = '0.8';

    // Get the current date
    let currentDate = new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    // Fetch JSON data from the provided URL
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())
    .then(data => {

        // Sort data by currency code
        data.sort((a, b) => (a.cc > b.cc) ? 1 : ((b.cc > a.cc) ? -1 : 0));

        let filteredData = data.filter(item => item.cc === 'USD' || item.cc === 'EUR' || item.cc === 'GBP' || item.cc === 'PLN');

        // Create the table header with the current date
        let table = '<table>';
        table += '<tr><th colspan=3>Exchange Rates by NBU for ' + currentDate + ' ver=' + ver + '</th></tr>';
        table += '<tr>';
        table += '<th class="center-align">Currency</th>';
        table += '<th class="center-align">Exchange Rate</th>';
        table += '<th class="center-align">Date</th>';
        table += '</tr>';

        // Iterate over the data and populate the table rows
        filteredData.forEach((item, index) => {
            table += '<tr class="' + (index % 2 === 0 ? 'even-row' : 'odd-row') + '">';
            table += '<td class="center-align">' + item.cc + '</td>';
            table += '<td class="right-align">' + parseFloat(item.rate).toFixed(2) + '</td>';
            table += '<td class="center-align">' + item.exchangedate + '</td>';
            table += '</tr>';
        });

        table += '</table>';

    // Display the table in the HTML page
    document.getElementById('exchangeTable1').innerHTML = table;
    })
    .catch(error => console.error('Error fetching data:', error));
    // --- End of the 1st table ---
/*
    // Fetch JSON data from the second provided URL
    fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5&cors=true')
    .then(response => response.json())
    .then(data => {
        // Create the table header for the second table
        let table2 = '<table><thead>';
        table2 += '<th colspan=3 class="center-align">Exchange Rates by PrivatBank for ' + currentDate + ' ver=' + ver + '</th>';
        table2 += '</tr><tr>';
        table2 += '<th class="center-align">Currency</th>';
        table2 += '<th class="center-align">Exchange Rate</th>';
        table2 += '<th class="center-align">Date</th>';
        table2 += '</tr>';
        table2 += '</thead><tbody>';

        // Iterate over the data and populate the table rows
        data.forEach((item, index) => {
            table2 += '<tr class="' + (index % 2 === 0 ? 'even-row' : 'odd-row') + '">';
            table2 += '<td class="center-align">' + item.ccy + '</td>';
            table2 += '<td class="right-align">' + parseFloat(item.buy).toFixed(2) + '</td>';
            table2 += '</tr>';
        });

        table2 += '</tbody></table>';

        // Display the second table in the HTML page
        document.getElementById('exchangeTable2').innerHTML = table2;
    })
    .catch(error => console.error('Error fetching data:', error));
*/

}