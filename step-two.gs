function calculateAverageTransactions() {
  var valuesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("values");
  var lastRow = valuesSheet.getLastRow();
  
  // Get the data in column C (amounts)
  var amountValues = valuesSheet.getRange(3, 3, lastRow - 2, 1).getValues();
  
  // Calculate the total sum of transactions
  var totalSum = 0;
  amountValues.forEach(function(row) {
    totalSum += row[0];
  });
  
  // Calculate the average of all transactions
  var average = totalSum / (lastRow - 2);
  
  // Write the average to cell F3 of the "values" sheet
  valuesSheet.getRange(3, 6).setValue(average); // Column F is index 6
  
  Logger.log("Average of all transactions: " + average);
}
