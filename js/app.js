window.onload = function() {
    // Fetch JSON data from the provided URL
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())

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
        table += '<tr class="' + (index % 2 === 0 ? 'even-row' : 'odd-row') + '">';
        table += '<td class="center-align">' + item.cc + '</td>';
        table += '<td class="right-align">' + parseFloat(item.rate).toFixed(2) + '</td>';
        table += '<td class="center-align">' + item.exchangedate + '</td>';
        table += '</tr>';
    });

    table += '</tbody></table>';

    // Fetch JSON data from the second provided URL
    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(response => response.json())
    .then(data => {
        // Create the table header for the second table
        let table2 = '<table><thead><tr><th>Currency</th><th class="right-align">Exchange Rate</th><th>Units</th></tr></thead><tbody>';

        // Iterate over the data and populate the table rows
        data.forEach((item, index) => {
            table2 += '<tr class="' + (index % 2 === 0 ? 'even-row' : '') + '">';
            table2 += '<td>' + item.ccy + '</td>';
            table2 += '<td class="right-align">' + parseFloat(item.buy).toFixed(2) + '</td>';
            table2 += '<td>' + item.base_ccy + '</td>';
            table2 += '</tr>';
        });

        table2 += '</tbody></table>';

        // Display the second table in the HTML page
        document.getElementById('exchangeTable2').innerHTML = table2;
    })
    .catch(error => console.error('Error fetching data:', error));
}