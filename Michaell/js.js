function search() {
    var searchInput = document.getElementById('searchInput').value;
    var apiKey = 'AIzaSyAmCLwuc94_hiXPDcVsYWV7toMyPqsrot8';
    var spreadsheetId = '1rqNAGffOaYMPLsvZneuDdAS6p-u2GEHDnZhLD2S7jrg'; 
    var range = 'INDUCCION';
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data.values, searchInput))
        .catch(error => console.error('Error:', error));
}