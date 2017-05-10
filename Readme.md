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
### Check all input checkbox
#### Static method 'checkAll'
Checked all checkbox with name "nameCheckbox"
```javascript
$.fn.formHelper('checkAll', '#myFormID', 'nameCheckbox', true); // unchecked set false the last parameter
```
Check/Uncheck using another input checkbox
```javascript
$.fn.formHelper('checkAll', '#myFormID', 'nameCheckbox', $("#masterCheckbox"));
```
