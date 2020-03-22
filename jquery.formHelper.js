/**
 * @author David Ticona Saravia
 * @param {jQuery} $ jQuery object
 * */
(function ($) {
    var methods = {
        inArray: function (val, array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == val) {
                    return true;
                }
            }
            return false;
        }
    };

    $.fn.checkInput = function (name, values) {
        var $el = this.find("[name='" + name + "']");
        var data = values;
        if (typeof values === 'string'){
            data = JSON.parse(values);
        }
        if ($.isArray(data)) {
            var selector = "[name='" + name + "\\[\\]']";
            $el = this.find(selector);
            $el.each(function () {
                var val = $(this).val();
                var state = methods.inArray(val, data);
                $(this).prop('checked', state);
            });
        } else {
            var state = (data == $el.val());
            $el.prop('checked', state);
        }
    };

    $.fn.checkAll = function (name, checked) {
        if (checked instanceof jQuery) {
            jQuery.propHooks.checked = {
                set: function (el, value) {
                    if (el.checked !== value) {
                        el.checked = value;
                        $(el).trigger('change');
                    }
                }
            };
            var $chkAll = checked;
            var $container = this;
            var $check = this.find("[name='" + name + "\\[\\]']");
            $chkAll.click(function () {
                var state = $(this).prop('checked');
                $container.find("[name='" + name + "\\[\\]']").prop('checked', state);
            });
            $check.change(function () {
                if ($check.length === $container.find("[name='" + name + "\\[\\]']:checked").length)
                    $chkAll.prop('checked', true);
                else
                    $chkAll.prop('checked', false);
            });
            return this;
        }
        this.find("[name='" + name + "\\[\\]']").prop('checked', checked);
    };
    
    /**
     * @param {mixed} values The values in JSON format (Javascript object or string) 
     * */
    $.fn.populateForm = function (values) {
        if (values === '')
            return;
        var $form = this;
        var data = values;
        if ($.type(values) === 'string') {
            data = JSON.parse(values);
        }
        $.each(data, function (name, val) {
            var $el = $form.find("[name='" + name + "']");
            var isSelect = $el.is('select');
            if ($.isArray(val)){
                var selector = "[name='" + name + "\\[\\]']";
                $el = $form.find(selector);
            }
            var type = (isSelect) ? 'select' : $el.attr('type');
            switch (type) {
                case 'checkbox':
                    if ($.isArray(val)) {
                        $el.each(function () {
                            var state = methods.inArray($(this).val(), val);
                            $(this).prop('checked', state);
                        });
                    } else {
                        $el.prop('checked', true);
                    }
                    break;
                case 'radio':
                    $el.filter('[value="' + val + '"]').prop('checked', true);
                    break;
                case 'select':
                    if ($.isArray(val)){
                        $el.children('option').each(function(){
                            var state = methods.inArray($(this).val(), val);
                            $(this).prop('selected', state);
                        });
                    } else{
                        $el.val(val);
                    }
                    break;
                default:
                    $el.val(val);
            }
        });
        return this;
    };
    /**
     * 
     * @param {string} action URL
     * @param {mixed} select2 The select target. (jQuery object or the selector string)
     * @param {object} options (Optional) The options
     * */
    $.fn.chainedSelect = function (action, select2, options) {
        var settings = $.extend({keyAsValue: true, data: {}, debug: false}, options);
        var $sel2 = (select2 instanceof jQuery) ? select2 : $(select2);
        var key = this.attr('name');
        function formatOption(obj) {
            var type = ($.type(obj)), opt = {value: '', text: ''};
            if ((type === 'string') || (type === 'number')) {
                opt.value = obj;
                opt.text = obj;
                return opt;
            }
            if (!$.isPlainObject(obj)) {
                return opt;
            }
            for (var k in obj) {
                opt.value = (settings.keyAsValue) ? k : obj[k];
                opt.text = obj[k];
                break;
            }
            return opt;
        }
        this.change(function () {
            var data = settings.data;
            data[key] = $(this).val();
            $.post(action, data).done(function (result) {
                $sel2.empty();
                $.each(result, function (k, v) {
                    var $opt = $('<option>');
                    var item = formatOption(v);
                    $opt.val(item.value).append(item.text);
                    $sel2.append($opt);
                });
                if (settings.debug)
                    console.log(result);
            }).fail(function (e) {
                if (settings.debug)
                    console.log('Error: ' + e.statusText);
            });
        });
        return $sel2;
    };

    $.fn.submitAjax = function (options) {
        var settings = $.extend({
            classButtonDisabled: 'disabled',
            before: function(){},
            after: function(){},
            onSuccess: function(){},
            onError: function(){},
            onFail: function(){}
        }, options);
        var action = this.attr('action');
        var method = this.attr('method');
        var data = this.serializeArray();
        var $form = this;
        var $btnSubmit = $form.find('[type=submit]').prop('disabled', true).attr('disabled', true).addClass(settings.classButtonDisabled);
        settings.before($form, $btnSubmit);
        var $xhr = $.ajax({type: method, url: action, data: data, dataType: 'json'});
        $xhr.done(function (result) {
            if (result.hasOwnProperty('error')) {
                settings.onError(result);
            } else{
                settings.onSuccess(result);
            }
        });
        $xhr.always(function(r){
            $btnSubmit.prop('disabled', false).removeAttr('disabled').removeClass(settings.classButtonDisabled);
            settings.after($form, $btnSubmit);
        });
        $xhr.fail(function (e) {
            settings.onFail(e);
        });
    };

    /**
     * Submit all data attributes from a clickable element (anchor, button, etc.)
     * Options:
     * ignore: Array with data attributes to ignore on submit
     * method: (Default: 'post')
     * @param {object} options 
     * */
    $.fn.clickSubmit = function (options) {
        var settings = $.extend({ignore: [], addData: {}, method: 'post', action: ''}, options);
        this.click(function (e) {
            e.preventDefault();
            $(this).prop('disabled', true).addClass('disabled');
            var dataaction = $(this).data('action');
            var action = (dataaction === 'undefined') ? $(this).attr('href') : dataaction;
            if ((typeof action==='undefined')||(action==='')){
                action = settings.action;
            }
            $(this).removeData('action').removeAttr('data-action');
            var data = $(this).data();
            var $f = $('<form>').attr({method: settings.method, action: action}).hide();
            for (var key in data) {
                if ($.inArray(key, settings.ignore) === -1) {
                    var $h = $('<input>').attr({type: 'hidden', name: key}).val(data[key]);
                    $f.append($h);
                }
            }
            for (var key in settings.addData) {
                var $h = $('<input>').attr({type: 'hidden', name: key}).val(settings.addData[key]);
                $f.append($h);
            }
            $(this).after($f);
            $f.submit();
        });
    };
    /**
     * Send an Ajax Post Request with all data attributes from a clickable element.
     * Options:
     * ========
     * dataType: Default is 'text'
     * ignore: Ignore data attributes
     * addData: Add data to send in request
     * done: callback function
     * fail: callback function
     * @param {object} options 
     * */
    $.fn.clickAjax = function (options) {
        var settings = $.extend({ignore: [], addData: {}, method: 'post', action:'', dataType: 'text', start: null, done: null, fail: null}, options);
        var $btnTarget = null;
        this.click(function (e) {
            e.preventDefault();
            $btnTarget = $(this);
            var dataaction = $(this).data('action');
            var action = (dataaction === 'undefined') ? $(this).attr('href') : dataaction;
            if ((action==='undefined')||(action==='')){
                action = settings.action;
            }
            $(this).removeData('action').removeAttr('data-action');
            var fdata = $(this).data();
            var data = {};
            for (var key in fdata) {
                if ($.inArray(key, settings.ignore) === -1) {
                    data[key] = fdata[key];
                }
            }
            $(this).data('action', action);
            $.extend(data, settings.addData);
            $(this).prop('disabled', true).addClass('disabled');
            if (typeof settings.start === 'function') {
                settings.start();
            }
            var $xhr = $.ajax({type: settings.method, url: action, data: data, success: success, dataType: settings.dataType});
            if (typeof settings.fail === 'function')
                $xhr.fail(settings.fail);
            $xhr.always(function () {
                $btnTarget.removeClass('disabled').removeProp('disabled');
            });
        });
        var success = function (res) {
            if (typeof settings.done === 'function') {
                settings.done(res);
            }
        };
        this.start = function (func) {
            settings.start = func;
        };
        this.fail = function (func) {
            settings.fail = func;
        };
        this.done = function (func) {
            settings.done = func;
        };
        return this;
    };

})(jQuery);
