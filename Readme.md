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

Check input checkbox with name "myCheckbox" and values "1", "3" (Option 1 and Option 3)
```javascript
$('#myForm').checkInput('myCheckbox', ["1", "3"]);
```
## .checkAll(nameCheckbox, value)

We have a checkbox array:
```html
<label><input type="checkbox" name="myCheckbox[]" value="1"> Option 1</label>
<label><input type="checkbox" name="myCheckbox[]" value="2"> Option 2</label>
<label><input type="checkbox" name="myCheckbox[]" value="3"> Option 3</label>
```

Check all input checkbox with name "myCheckbox"
```javascript
$('#myForm').checkAll('myCheckbox', true); // for unchecked: Set false the last parameter
```
Check/Uncheck using another input checkbox
```html
<!-- We need a master checkbox -->
<label><input type="checkbox" id="masterCheckbox"> Check All</label>
```
```javascript
$('#myForm').checkAll('myCheckbox', $("#masterCheckbox")); // And here connect the master checkbox
```
## .chainedSelect(action, jqSelect2, options)
Chain input select and populate select with result ajax.
```javascript
$('#select1').chainedSelect('http://yourdomain.com/app/post.php', $('#select2'));
```
The $('#select2') will be populate with the response.

The response must be an array json like this:
```
["Option 1", "Option 2", "Option 3", ...]
```
or like this:
```
[{"value": "1", "text": "Option 1"}, {"value": "2", "text": "Option 2"}, ...]
```
or like this:
```
[{"A": "Option A"}, {"B": "Option B"}, {"C": "Option C"}, ...]
```
In the last case use the option parameter 'keyAsValue'
```javascript
$('#select1').chainedSelect('http://yourdomain.com/app/post.php', $('#select2'), {keyAsValue: true});
```
#### Options

|Option|Type|Description|
|---|---|---|
|keyAsValue|bool| (Default: false) Populate the select using the key result as option value|
|data|object|Aditional data to send with the request|
|debug|bool|Print the response in the console on fail|

### Return
* jQuery Return the second select, then we can use the return with a third select.

## .clickSubmit(options)

Submit all data attributes from a clickable element (anchor, button, etc.)

```html
<a href="#" data-id="1121" class="send" data-action="http://localhost/another_app/save">Send</a>
<a href="#" data-id="1122" class="send">Send</a>
<a href="#" data-id="1123" class="send">Send</a>
```
```javascript
$('.send').clickSubmit({action: 'http://localhost/app/save'});
```

## .clickAjax(options)
Send an Ajax Post Request with all data attributes from a clickable element.
```html
<a href="#" data-id="1121" class="send" data-action="http://localhost/another_app/save">Send</a>
<a href="#" data-id="1122" class="send">Send</a>
<a href="#" data-id="1123" class="send">Send</a>
```

```javascript
var sendAjax = $('.send').clickAjax({action: 'http://localhost/app/save'});
sendAjax.done(function(r){
    console.log('Response: '+r);
});
```
