$(document).ready(function () {
    init();
});


function btnAdd_click() {
    frmAddValidation();
    showOverallRatingAddForm();
}

function btnUpdate_click() {
    frmModifyValidation();
    showOverallRatingModifyForm();
}


function init() {

    //initial ratings hidden 
    $(".rating-fields").hide();

    //show when rating checkbox is checked, otherwise hide
    $(".wantRate").change(function () {
        if ($(this).is(":checked")) {
            $(".rating-fields").show();
        } else {
            $(".rating-fields").hide();
        }
    });

    $("#btnAdd").on("click", btnAdd_click);

    $("#btnUpdate").on("click", btnUpdate_click);

}