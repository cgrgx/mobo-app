function doValidate_frmAdd() {
    var form = $("#frmAdd");
    form.validate({
        rules: {
            txtRestName: {
                required: true,
                rangelength: [2, 20]
            },
            txtBusId: {
                required: true,
                rangelength: [2, 5]
            },
            txtRevEmail: {
                required: true,
                emailcheck: true
            },
            numQuality: {
                checkvalue: true
            },
            numService: {
                checkvalue: true
            },
            numValue: {
                checkvalue: true
            }

        },
        messages: {
            txtRestName: {
                required: "Required",
                rangelength: "Length must be 2 to 20 characters long"
            },
            txtBusId: {
                required: "Required",
                rangelength: "Length must be 2 to 20 characters long"

            },
            txtRevEmail: {
                required: "Required",
                emailcheck: "Email must be valid"
            },
            numQuality: {
                checkvalue: "Value must be 0-5"
            },
            numService: {
                checkvalue: "Value must be 0-5"
            },
            numValue: {
                checkvalue: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

function doValidate_frmModifyReview() {
    var form = $("#frmModifyReview");
    form.validate({
        rules: {
            txtRestName: {
                required: true,
                rangelength: [2, 20]
            },
            txtBusId: {
                required: true,
                rangelength: [2, 5]
            },
            txtRevEmail: {
                required: true,
                emailcheck: true
            },
            numQuality: {
                checkvalue: true
            },
            numService: {
                checkvalue: true
            },
            numValue: {
                checkvalue: true
            }

        },
        messages: {
            txtRestName: {
                required: "Required",
                rangelength: "Length must be 2 to 20 characters long"
            },
            txtBusId: {
                required: "Required",
                rangelength: "Length must be 2 to 20 characters long"

            },
            txtRevEmail: {
                required: "Required",
                emailcheck: "Email must be valid"
            },
            numQuality: {
                checkvalue: "Value must be 0-5"
            },
            numService: {
                checkvalue: "Value must be 0-5"
            },
            numValue: {
                checkvalue: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailcheck",
    function (value, element) {
        var regexp = /^[\w-\.]+@([\w]+\.)+[\w-]{2,4}$/;
        return this.optional(element) || regexp.test(value);
    });

jQuery.validator.addMethod("checkvalue",
    function (value, element) {
        var regexp = /^[012345]$/;
        return this.optional(element) || regexp.test(value);
    });