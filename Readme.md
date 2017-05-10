# How to use
### Populate Form
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$('#frmCadastro').formHelper({data: frmValues, errorClass: 'alert-danger', successClass: 'alert-success'});
```
OR with static method
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$.fn.formHelper('fillForm', "#myFormID", frmValues);
```
