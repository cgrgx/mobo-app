var Reviews = {
    //CRUD functions for 'review' table
    insertReview: function (objReview) {
        db.transaction(function (tx) {
            var sql = "INSERT INTO review (restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

            var options = [objReview.restName, objReview.restBId, objReview.state, objReview.reviewerEmail, objReview.restComments, objReview.hasRating, objReview.foodQuality, objReview.service, objReview.value];

            function successCallBack() {
                console.info("Successfully Inserted data into review table");
                alert("Successfully Inserted data into review table");
            }
            tx.executeSql(sql, options, successCallBack, errorHandler);
        });
    },
    selectReview: function (id, successCallback) {
        db.transaction(function (tx) {
            var sql = "SELECT * FROM review WHERE id = ?;";
            var options = [id];

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },
    selectAllReviews: function (options, successCallback) {
        db.transaction(function (tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },
    updateReview: function (objReview, id) {
        db.transaction(function (tx) {
            var sql = "UPDATE review SET restaurantName = ?, restaurantId = ?, stateId = ?, reviewerEmail = ?, reviewerComments = ?, hasRating = ?, rating1 = ?, rating2 = ?, rating3 = ? WHERE id = ?;";
            var options = [objReview.restName, objReview.restBId, objReview.state, objReview.reviewerEmail, objReview.restComments, objReview.hasRating, objReview.foodQuality, objReview.service, objReview.value, id];

            function successCallBack() {
                console.info("Success: Review details updated successfully");
                alert("Success: Review details updated successfully");
            }
            tx.executeSql(sql, options, successCallBack, errorHandler);
        });
    },
    deleteReview: function (options) {
        var options = options;
        db.transaction(function (tx) {
            var sql = "DELETE FROM review WHERE id = ?;";

            function successCallBack() {
                console.info("Success: Review details deleted successfully");
                alert("Success: Review details deleted successfully");
                $(location).prop('href', '#cgViewReviewPage');
            }
            tx.executeSql(sql, options, successCallBack, errorHandler);
        });
    },
    //CRUD functions for 'state' table
    insertState: function (objState) {
        db.transaction(function (tx) {
            var sql = "INSERT INTO state (name) VALUES (?);";
            var options = [objState.state];

            function successCallBack() {
                console.info("Success: state name inserted successfully");
            }
            tx.executeSql(sql, options, successCallBack, errorHandler);
        });
    },
    selectAllStates: function (options, successCallback) {
        db.transaction(function (tx) {
            var sql = "SELECT * FROM state;";

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
};