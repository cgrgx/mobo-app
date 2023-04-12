//Review Class and constructor
var Review = function (restName, restBId, state, reviewerEmail, restComments, hasRating, foodQuality, service, value) {
    this.restName = restName;
    this.restBId = restBId;
    this.state = state;
    this.reviewerEmail = reviewerEmail;
    this.restComments = restComments;
    this.hasRating = hasRating;
    this.foodQuality = foodQuality;
    this.service = service;
    this.value = value;
}