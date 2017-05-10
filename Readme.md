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
We have a checkbox array:
```html
<label><input type="checkbox" name="nameCheckbox[]" value="1"> Option 1</label>
<label><input type="checkbox" name="nameCheckbox[]" value="2"> Option 2</label>
<label><input type="checkbox" name="nameCheckbox[]" value="3"> Option 3</label>
```
#### Static method 'checkAll'
Check all input checkbox with name "nameCheckbox"
```javascript
$.fn.formHelper('checkAll', '#myFormID', 'nameCheckbox', true); // for unchecked: Set false the last parameter
```
Check/Uncheck using another input checkbox
```html
<label><input type="checkbox" id="masterCheckbox"> Check All</label>
```
```javascript
$.fn.formHelper('checkAll', '#myFormID', 'nameCheckbox', $("#masterCheckbox"));
```
