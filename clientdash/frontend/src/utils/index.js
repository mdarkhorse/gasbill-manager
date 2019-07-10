/*
* convert TSV to JSON
* @param
* tsv: tab seperated values (with header)
* 
* @return
* JSON string
*/
export const tsv2JSON = function (tsv) {

  var lines=tsv.split("\n");
  
  var result = [];
  
  var headers=lines[0].split("\t");
  
  for(var i = 1;i < lines.length; i++) {

    var obj = {};
    var currentline=lines[i].split("\t");

    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

/*
* convert XLSX to JSON
* @param
* file: xlsx file path
* 
* @return
* JSON string
*/
export const excel2JSON = function(file, callback) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    workbook.SheetNames.forEach(function(sheetName) {
      // Here is your object
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if (XL_row_object.length > 0)
        callback(XL_row_object);
      
      // var json_object = JSON.stringify(XL_row_object);
      // console.log(json_object);
    })

  };

  reader.onerror = function(ex) {
    console.log(ex);
  };

  reader.readAsBinaryString(file);
};
