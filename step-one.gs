function calculateAverageColumnD() {
  var valuesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("values");
  var lastRow = valuesSheet.getLastRow();
  
  // Get the data in column D (average of transactions)
  var averageValues = valuesSheet.getRange(3, 4, lastRow - 2, 1).getValues();
  
  // Calculate the total sum of average transactions
  var totalSum = 0;
  averageValues.forEach(function(row) {
    totalSum += row[0];
  });
  
  // Calculate the average of all average transactions
  var average = totalSum / (lastRow - 2);
  
  // Write the average to cell G3 of the "values" sheet
  valuesSheet.getRange(3, 7).setValue(average); // Column G is index 7
  
  Logger.log("Average of all average transactions: " + average);
}
