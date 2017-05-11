/**
 * formHelper
 * @author David Ticona Saravia
 * */
(function ($) {
    var methods = {
        init: function (options) {
            var settings = $.extend({
                data: '',
                selectorMessage: '#message',
                errorClass: 'error',
                successClass: 'success',
                ajax: false
            }, options);
            var frmValues = settings.data;
            methods.populateForm(this, frmValues);
            if ((this.data('ajax')) === 1 || (settings.ajax)) {
                $(settings.selectorMessage).hide();
                settingAjax(this);
            }
            function settingAjax(form) {
                form.on('submit', function (e) {
                    e.preventDefault();
                    var action = form.attr('action');
                    var data = form.serializeArray();
                    $.post(action, data, function (result) {
                        var msg = '';
                        var cssClass = settings.errorClass;
                        var $divmsg = $(settings.selectorMessage);
                        $divmsg.removeClass(settings.errorClass).removeClass(settings.successClass);
                        if (result.hasOwnProperty('valid')) {
                            msg = result.text;
                            cssClass = "alert-success";
                        } else {
                            $.each(result, function (k, v) {
                                msg += '<p>' + v + '</p>';
                            });
                        }
                        $divmsg.addClass(cssClass).html(msg).hide().fadeIn('slow');
                    });
                });
            }
        },
        populateForm: function (form, values) {
            if (values === '')
                return;
            var $form = (form instanceof jQuery) ? form : $(form);
            var data = JSON.parse(values);
            $.each(data, function (name, val) {
                var $el = $form.find("[name='" + name + "']");
                if ($.isArray(val)) {
                    var selector = "[name='" + name + "\\[\\]']";
                    var $el = $form.find(selector);
                }
                var type = $el.attr('type');
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
                    default:
                        $el.val(val);
                }
            });
        },
        setCheckbox: function (form, name, values) {
            var $form = (form instanceof jQuery) ? form : $(form);
            var $el = $form.find("[name='" + name + "']");
            var data = JSON.parse(values);
            if ($.isArray(data)) {
                var selector = "[name='" + name + "\\[\\]']";
                $el = $form.find(selector);
                $el.each(function () {
                    var val = $(this).val();
                    var state = methods.inArray(val, data);
                    $(this).prop('checked', state);
                });
            } else {
                var state = (data == $el.val());
                $el.prop('checked', state);
            }
        },
        inArray: function (val, array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == val) {
                    return true;
                }
            }
            return false;
        },
        checkAll: function (form, name, checked) {
            $form = (form instanceof jQuery) ? form : $(form);
            if (checked instanceof jQuery) {
                $chkAll = checked;
                var $check = $form.find("[name='" + name + "\\[\\]']");
                $chkAll.click(function () {
                    var state = $(this).prop('checked');
                    $form.find("[name='" + name + "\\[\\]']").prop('checked', state);
                });
                $check.click(function () {
                    if ($check.length === $form.find("[name='" + name + "\\[\\]']:checked").length)
                        $chkAll.prop('checked', true);
                    else
                        $chkAll.prop('checked', false);
                });
                return;
            }
            $form.find("[name='" + name + "\\[\\]']").prop('checked', checked);
        },
        chainSelect: function (action, select1, select2) {
            var $sel1 = (select1 instanceof jQuery) ? select1 : $(select1);
            var $sel2 = (select2 instanceof jQuery) ? select2 : $(select2);
            var key = $sel1.attr('name');
            $sel1.change(function () {
                var data = {};
                data[key] = $(this).val();
                $.post(action, data, null, 'json').done(function (result) {
                    $sel2.empty();
                    $.each(result, function (k, v) {
                        var $opt = $('<option>');
                        $opt.val(v.value);
                        $opt.append(v.text);
                        $sel2.append($opt);
                    });
                }).fail(function (e) {
                    alert('Error: ' + e.statusText);
                });
            });
        }
    };
    $.fn.formHelper = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.utilform');
        }
    };
})(jQuery);