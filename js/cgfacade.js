//Review form validation
// function frmAddValidation() {
//     if (doValidate_frmAdd()) {
//         console.info("Review add form is valid");
//     } else {
//         console.info("Review add form is invalid");
//     }
// }
//Review modify form validation
function frmModifyValidation() {
    if (doValidate_frmModifyReview()) {
        console.info("Review modify form is valid");
    } else {
        console.info("Review modify form is invalid");
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

//add review
function addReview() {
    if (doValidate_frmAdd()) {
        console.info("Add review form is valid");
        var restName = $("#txtRestName").val();
        var restBId = $("#txtBusId").val();
        var state = $("#cmbState").val();
        var reviewerEmail = $("#txtRevEmail").val();
        var restComments = $("#textareaComment").val();
        var hasRating = $("#cbRating").prop("checked");
        var foodQuality = $("#numQuality").val();
        var service = $("#numService").val();
        var value = $("#numValue").val();

        //review object
        var objReview = new Review(restName, restBId, state, reviewerEmail, restComments, hasRating, foodQuality, service, value);

        console.info(objReview);
        Reviews.insertReview(objReview);

    } else console.info("Add review form is invalid");
}

//get default email address
function showDefaultEmail() {
    var default_rev_email = localStorage.getItem("default_rev_email");

    if (default_rev_email != null) {
        $("#txtRevEmail").val(default_rev_email);
    } else {
        console.info("Defualt Reviewer Email is null or empty");
    }
}

//update state dropdown function
function updateStatesDropdown() {
    var options = [];
    Reviews.selectAllStates(options, successCallBack);

    function successCallBack(tx, results) {
        console.info("Success: Records selected successfully");
        var htmlCode = "";
        var stateDropdown = $("#cmbState");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var id = row['id'];
            var stateName = row['name'];
            console.info(`id: ${id}, name: ${stateName}`);
            htmlCode += `
            <option value="${id}">${stateName}</option>
        `;
        }
        stateDropdown = stateDropdown.html(htmlCode);
        stateDropdown.val("1").change(); //select ontario as default one
        stateDropdown.selectmenu("refresh");

    }
}

//get all the reviews 
function getReviews() {
    var options = [];
    Reviews.selectAllReviews(options, successCallBack);

    function successCallBack(tx, results) { //callback start
        console.info("Success: Records selected successfully");
        var htmlCode = "";

        if (results.rows.length > 0) { //if else block start
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows[i];
                var id = row['id'];
                var restaurantName = row['restaurantName'];
                var reviewerEmail = row['reviewerEmail'];
                var reviewerComments = row['reviewerComments'];

                var overallRating = 0;
                var hasRating = row['hasRating'];
                if (hasRating) {
                    var foodQuality = row['rating1'];
                    var service = row['rating2'];
                    var value = row['rating3'];
                    overallRating = (foodQuality + service + value) * 100 / 15;
                }
                console.info(`getreviews() => id: ${id} restaurantName: ${restaurantName} reviewerEmail: ${reviewerEmail} comments: ${reviewerComments} overallRating: ${overallRating}`);

                htmlCode += `
            <li>
                <a data-role="button" data-row-id=${row['id']} href="#">
                <h2>Id: ${id}</h2>
                <h2>Restaurent Name: ${restaurantName}</h2>
                <h2>Reviewer Email: ${reviewerEmail}</h2>
                <h2>Reviewer Comments: ${reviewerComments}</h2>
                <h2>Overall Rating: ${overallRating.toFixed(2)}</h2>
                
                </a>
          </li>`;
            } //for loop end

            var lv = $("#1stViewReview");
            lv = lv.html(htmlCode);
            lv.listview("refresh");

            function clickHandler() {
                localStorage.setItem("id", $(this).attr("data-row-id"));
                $(location).prop('href', '#cgModifyReviewPage');
            }

            $("#1stViewReview a").on("click", clickHandler);
        } else {
            $("#1stViewReview").html("<li>No record found in reviews</li>").listview("refresh");
        } //if else block end
    } //callback end
}

//show review page details
function showReviewDetails() {
    var id = localStorage.getItem("id");
    Reviews.selectReview(id, successCallBack);

    function successCallBack(tx, results) { //callback start
        console.info("Success: Review details selected successfully");

        var row = results.rows[0];
        var restaurantName = row['restaurantName'];
        var restaurantId = row['restaurantId'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var hasRating = row['hasRating'];
        var overallRating = 0;
        if (hasRating) {
            var foodQuality = row['rating1'];
            var service = row['rating2'];
            var value = row['rating3'];
            overallRating = (foodQuality + service + value) * 100 / 15;
        }
        console.info(`showPageDetails() => \n id: ${id} restaurantName: ${restaurantName} reviewerEmail: ${reviewerEmail} comments: ${reviewerComments} overallRating: ${overallRating}`);
        //populate the above values in the modify page
        Reviews.selectAllStates([], function (tx, results) {
            var stateDropdown = $("#cmbState");

            var htmlCode = "";

            for (var i = 0; i < results.rows.length; i++) {
                var state = results.rows[i];
                var selected = (state['name'] == row['state']) ? "selected" : "";
                htmlCode += `<option value="${state['id']}" ${selected}>${state['name']}</option>`;
            }

            stateDropdown.html(htmlCode);
            // stateDropdown.selectmenu("refresh");

            $("#txtRestName").val(restaurantName);
            $("#txtBusId").val(restaurantId);
            $("#txtRevEmail").val(reviewerEmail);
            $("#textareaComment").val(reviewerComments);
            if (hasRating) {
                $("#cbRating").prop("checked", true);
                $(".rating-fields").show();

                $("#numQualityMod").val(foodQuality);
                $("#numServiceMod").val(service);
                $("#numValueMod").val(value);
                $("#sldRateMod").val(overallRating);
            } else {
                $("#cbRating").prop("checked", false);
                $(".rating-fields").hide();
            }
        });
    }
}

//update Review
function updateReview() {
    if (doValidate_frmAdd()) {
        console.info("modify review form is valid");
        var id = localStorage.getItem("id");
        var restName = $("#txtRestName").val();
        var restBId = $("#txtBusId").val();
        var state = $("#cmbState").val();
        var reviewerEmail = $("#txtRevEmail").val();
        var restComments = $("#textareaComment").val();
        var hasRating = $("#cbRating").prop("checked");
        var foodQuality = hasRating ? $("#numQualityMod").val() : 0;
        var service = hasRatings ? $("#numServiceMod").val() : 0;
        var value = hasRatings ? $("#numValueMod").val() : 0;

        var objReview = new Review(restName, restBId, state, reviewerEmail, restComments, hasRating, foodQuality, service, value);
        Reviews.updateReview(objReview, id);

    } else console.info("modify review form is invalid");

}
//delete review
function deleteReview() {
    var id = localStorage.getItem("id");
    var options = [id];
    Reviews.deleteReview(options);
}
//cancel review and navigate to home
function cancelModification() {
    $(location).prop('href', '#cgHomePage');
}

function clearDatabase() {
    var result = confirm("Are you sure you want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared: All tables cleared!");
        } catch (e) {
            alert(e);
        }
    }
}