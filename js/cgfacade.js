//restaurent form validation
function frmAddValidation() {
    if (doValidate_frmAdd()) {
        console.info("Restaurent add form is valid");
    } else {
        console.info("Restaurent add form is invalid");
    }
}
//restaurent modify form validation
function frmModifyValidation() {
    if (doValidate_frmModifyReview()) {
        console.info("Restaurent modify form is valid");
    } else {
        console.info("Restaurent modify form is invalid");
    }
}

//overall rating calculation for Add form
function showOverallRatingAddForm() {
    var foodQuality = $("#numQuality").val();
    var service = $("#numService").val();
    var value = $("#numValue").val();
    var overallRatings = (parseInt(foodQuality) + parseInt(service) + parseInt(value)) * 100 / 15;
    $("#sldRate").val(overallRatings);
    console.log(`Overall Ratings: ${overallRatings}`);
}
//overall rating calculation for Modify form
function showOverallRatingModifyForm() {
    var foodQuality = $("#numQualityMod").val();
    var service = $("#numServiceMod").val();
    var value = $("#numValueMod").val();
    var overallRatings = (parseInt(foodQuality) + parseInt(service) + parseInt(value)) * 100 / 15;
    $("#sldRateMod").val(overallRatings);
    console.log(`Overall Ratings: ${overallRatings}`);
}