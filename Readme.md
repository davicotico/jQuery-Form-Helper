# Plugins
## .populateForm(values)

Populate a form from a object. Each key for each input with the key name

```javascript
var frmValues = {"var1": "value1", "var2": "value2"};
$("#myFormID").populateForm(frmValues);
```
## .checkInput(nameCheckbox, values)
We have a checkbox array:
```html
<label><input type="checkbox" name="myCheckbox[]" value="1"> Option 1</label>
<label><input type="checkbox" name="myCheckbox[]" value="2"> Option 2</label>
<label><input type="checkbox" name="myCheckbox[]" value="3"> Option 3</label>
```

Check input checkbox with name "nameCheckbox" and values "1", "3" (Option 1 and Option 3)
```javascript
$('#myFormID').checkInput('myCheckbox', ["1", "3"]);
```
## .checkAll(nameCheckbox, value)

We have a checkbox array:
```html
<label><input type="checkbox" name="nameCheckbox[]" value="1"> Option 1</label>
<label><input type="checkbox" name="nameCheckbox[]" value="2"> Option 2</label>
<label><input type="checkbox" name="nameCheckbox[]" value="3"> Option 3</label>
```

Check all input checkbox with name "nameCheckbox"
```javascript
$('#myFormID').checkAll('nameCheckbox', true); // for unchecked: Set false the last parameter
```
Check/Uncheck using another input checkbox
```html
<!-- We need a master checkbox -->
<label><input type="checkbox" id="masterCheckbox"> Check All</label>
```
```javascript
$('#myFormID').checkAll('nameCheckbox', $("#masterCheckbox")); // And here connect the master checkbox
```
## .chainedSelect(action, jqSelect2, options)
Chain input select and populate select with result ajax.
```javascript
$('#select1').chainedSelect('http://yourdomain.com/app/post.php', $('#select2'));
```
The $('#select2') will be populate with the response. The response must be an array json:
```
[{"value": "1", "text": "Option 1"}, {"value": "2", "text": "Option 2"}, ...]
```
