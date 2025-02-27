class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  getUserFirstName() {
    return this.name.split(' ')[0]
  }

  getFriends() {
    return this.friends
  }
}


if (typeof module !== 'undefined') {
  module.exports = User;
}
