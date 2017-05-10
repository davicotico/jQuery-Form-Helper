# How to use
### Populate Form
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$('#myFormID').formHelper({data: frmValues});
```
OR with static method
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$.fn.formHelper('fillForm', "#myFormID", frmValues);
```
