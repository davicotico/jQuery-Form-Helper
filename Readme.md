# How to use
### Populate Form
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$('#myFormID').formHelper({data: frmValues});
```
OR with static method
```javascript
var frmValues = '{"var1": "", "var2": ""}';
$.fn.formHelper('populateForm', "#myFormID", frmValues);
```
### Check all input checkbox
We have a checkbox array:
```html
<label><input type="checkbox" name="nameCheckbox[]" value="1"> Option 1</label>
<label><input type="checkbox" name="nameCheckbox[]" value="2"> Option 2</label>
<label><input type="checkbox" name="nameCheckbox[]" value="3"> Option 3</label>
```
#### Static method 'checkAll'
Check input checkbox with name "nameCheckbox" and values "1", "3" (Option 1 and Option 3)
```javascript
$.fn.formHelper('setCheckbox', '#myFormID', 'nameCheckbox', '["1", "3"]');
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
### Chained selects
Chain input select and populate select with result ajax.
```javascript
$.fn.formHelper('chainSelect', 'http://yourdomain.com/app/post.php', $('#select1'), $('#select2'));
```
The response must be an array json:
```
[{"value": "1", "text": "Option 1"}, {"value": "2", "text": "Option 2"}, ...]
```
