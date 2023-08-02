function groupAccountsAndCalculateTotals() {
  var devSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("dev");
  var valuesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("values");
  
  var devData = devSheet.getDataRange().getValues();
  var groupedAccounts = {};
  
  // Loop through each row in the "dev" sheet (skipping the header row)
  for (var i = 1; i < devData.length; i++) {
    var accountNumber = devData[i][2]; // Replace 2 with the column index that contains the account numbers
    var amount = devData[i][4]; // Replace 4 with the column index that contains the amount values
    var response = devData[i][5]; // Replace 5 with the column index that contains the response field
    
    // Exclude rows with 'fail' response and empty account numbers
    if (response !== 'fail' && accountNumber) {
      if (!groupedAccounts[accountNumber]) {
        groupedAccounts[accountNumber] = {
          count: 1,
          sum: amount
        };
      } else {
        groupedAccounts[accountNumber].count++;
        groupedAccounts[accountNumber].sum += amount;
      }
    }
  }
  
  // Prepare data for the "values" sheet
  var valuesData = [];
  for (var account in groupedAccounts) {
    var count = groupedAccounts[account].count;
    var sum = groupedAccounts[account].sum;
    var average = sum / count; // Calculate the average
    valuesData.push([account, count, sum, average]);
  }
  
  // Clear existing data and write the new data to the "values" sheet starting from row 3
  valuesSheet.getRange(3, 1, valuesSheet.getLastRow() - 2, 4).clearContent();
  
  // Check if there is any data to write
  if (valuesData.length > 0) {
    valuesSheet.getRange(3, 1, valuesData.length, 4).setValues(valuesData);
  } else {
    // If there is no data, write a single row with a message
    valuesSheet.getRange(2, 1, 1, 4).setValues([["No data available", "", "", ""]]);
  }
}

