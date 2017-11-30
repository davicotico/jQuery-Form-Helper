# Requirements

* jQuery >= 1.10 

# Plugins
## .populateForm(values)

Populate a form from a object. Each key for each input. The key name for the field name.

```javascript
var frmValues = {"var1": "value1", "var2": "value2"};
$("#myForm").populateForm(frmValues);
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
$('#myForm').checkInput('myCheckbox', ["1", "3"]);
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
$('#myForm').checkAll('nameCheckbox', true); // for unchecked: Set false the last parameter
```
Check/Uncheck using another input checkbox
```html
<!-- We need a master checkbox -->
<label><input type="checkbox" id="masterCheckbox"> Check All</label>
```
```javascript
$('#myForm').checkAll('nameCheckbox', $("#masterCheckbox")); // And here connect the master checkbox
```
## .chainedSelect(action, jqSelect2, options)
Chain input select and populate select with result ajax.
```javascript
$('#select1').chainedSelect('http://yourdomain.com/app/post.php', $('#select2'));
```
The $('#select2') will be populate with the response.

The response must be an array json like this:
```
[{"value": "1", "text": "Option 1"}, {"value": "2", "text": "Option 2"}, ...]
```
or like this:
```
["Option 1", "Option 2", "Option 3", ...]
```
In the last case use the option parameter 'keyAsValue'
```javascript
$('#select1').chainedSelect('http://yourdomain.com/app/post.php', $('#select2'), {keyAsValue: true});
```
#### Options

|Option|Type|Description|
|---|---|---|
|keyAsValue|bool| (Default: false) Populate the select using the value for key and value|
|data|object|Aditional data to send in the request|
|debug|bool|Print the response in the console on fail|
