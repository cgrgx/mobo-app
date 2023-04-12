$(document).ready(function () {
    init();
    initDB();
});

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
    $("#cgAddReviewPage").on("pageshow", reviewPageDetail_show);
    //view review page
    $("#cgViewReviewPage").on("pageshow", viewReviewPage_show);
    $("#cgModifyReviewPage").on("pageshow", reviewPageDetails_show);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnCancel").on("click", btnCancel_click);
    $("#btnSave").on("click", btnSave_click);
    $("#btnClearDatabase").on("click", btnClearDatabase_click);
}
//database creation
function initDB() {
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating tables...");
            DB.createTables();
        } else {
            console.info("Can not create tables:Database doesn't exist!");

        }
    } catch (e) {
        console.error("Error in database creation");
    }
}

function btnAdd_click() {
    //frmAddValidation();
    showOverallRatingAddForm();
    addReview();
}

function btnUpdate_click() {
    // frmModifyValidation();
    // showOverallRatingModifyForm();
    updateReview();
}

function btnDelete_click() {
    deleteReview();
}

function reviewPageDetail_show() {
    showDefaultEmail();
    updateStatesDropdown();
    $("#txtRestName").val("");
    $("#txtBusId").val("");
    // $("#cmbState").val(updateStatesDropdown());
    // $("#txtRevEmail").val(localStorage.getItem("default_rev_email"));
    $("#textareaComment").val("");
    $("#cbRating").prop('checked', false);
    $(".rating-fields").hide();
}

//set default review email in localstorage
function btnSave_click() {
    var default_reviewer_email = $("#txtDefRevMail").val();
    localStorage.setItem("default_rev_email", default_reviewer_email);
    alert("Default reviewer E-mail saved in the local storage");
}

function viewReviewPage_show() {
    getReviews();
}

function reviewPageDetails_show() {
    showReviewDetails();
}

function btnCancel_click() {
    cancelModification();
}

function btnClearDatabase_click() {
    clearDatabase();
}