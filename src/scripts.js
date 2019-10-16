$(function() {
  const randomUser = Math.floor(Math.random() * 50) + 1

  const user = new User(userData[randomUser]);
  const usersRepo = new UsersRepo(userData);
  const userSleep = new UserSleep(userData[randomUser]);
  const userHydration = new UserHydration(userData[randomUser], hydrationData);
  const userActivity = new UserActivity(userData[randomUser], activityData);

  let today = '2019/06/25';

  let $grid = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 100,
    rowHeight: 40,
    gutter: 7,
  });

  let $draggable = $('.draggable').draggabilly({
  });

  let $grid1 = $('.grid').packery({
    itemSelector: '.grid-item',
    columnWidth: 100
  });

  $grid.find('.grid-item').each( function( i, gridItem ) {
    let draggie = new Draggabilly( gridItem );
    $grid.packery( 'bindDraggabillyEvents', draggie );
  });

  let threeDays = userActivity.userThreeDaySteps()
  threeDays.forEach(e => $('.wins').append(`<p>${e.date}<span>&#129409;</span></p>`))

  $('.user__fullName').text(userData[randomUser].name)
  $('.span__currentUser').text(user.getUserFirstName());
  $('.user__address').text(userData[randomUser].address);
  $('.user__email').text(userData[randomUser].email);
  $('.user__stride').text(userData[randomUser].strideLength);
  $('.user__step').text(userData[randomUser].dailyStepGoal);
  $('.user__dailyWater').text(userHydration.userOuncesToday());
  $('.section__sleep--step-feedback').text(userSleep.giveUserSleepFeedback(randomUser, today));
  $('.activity__current--step').text(userActivity.userStepsByDate(randomUser, today));
  $('.activity__minutes--active').text(userActivity.userMinutesActiveByDate(randomUser, today))
  $('.activity__steps--miles').text(userActivity.userMilesByDate(randomUser, today));

  const usersWeeklyWater = new Chart($('#weeklyUserDailyWater'), {
    type: 'horizontalBar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Weekly View of Water Drank',
        data: userHydration.userOuncesByWeek(),
        backgroundColor: ['#DDE65C', '#6FACBD', '#FFAF1A', '#133C55', '#D95F32', '#FFAF1A', '#DDE65C'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const comparedHoursSleep = new Chart($('#currentHoursSleep'), {
    type: 'bar',
    data: {
      labels: ["Today\'s Hours Sleep", "Today\'s Sleep Quality"],
      datasets: [{
        label: 'Today\'s Sleep Numbers',
        data: [userSleep.userSleepHoursByDate(randomUser, today), userSleep.userSleepQualityByDate(randomUser, today)],
        backgroundColor: ['#6FACBD', '#D95F32'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const hoursSleptChart = new Chart($('#weeklyHoursSleep'), {
    type: 'line',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Hours Slept This Week',
        data: userSleep.userDailySleepHoursByWeek(),
        backgroundColor: ['#DDE65C'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const qualitySleepChart = new Chart($('#weeklyQualitySleep'), {
    type: 'line',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Quality Sleep This Week',
        data: userSleep.userDailySleepQualityByWeek(),
        backgroundColor: ['#133C55'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const alltimeAvgSleepNums = new Chart($('#alltimeAvgSleep'), {
    type: 'bar',
    data: {
      labels: ["Alltime Average Hours Slept", "Alltime Average Sleep Quality"],
      datasets: [{
        label: 'Alltime Average Sleep Numbers',
        data: [userSleep.avgUserHoursSleptPerDay(randomUser), userSleep.avgUserSleepQualityDateAllTime(randomUser)],
        backgroundColor: ['#DDE65C', '#3A8DA5'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const stepGoalComparison = new Chart($('#stepGoalCompared'), {
    type: 'bar',
    data: {
      labels: ['Your Step Goal', 'Average of Users Step Goal'],
      datasets: [{
        label: 'Step Goal Comparison',
        data: [userData[randomUser].dailyStepGoal, usersRepo.avgStepGoal()],
        backgroundColor: ['#FFAF1A', '#133C55'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  const friends = user.getFriends();

  friends.unshift(userData[randomUser].id);

  let friendsActivityLastWeek = friends.map(e => userActivity.userStepsByWeek(e));

  const stepGoalFriends = new Chart($('#stepGoalFriends'), {
    type: 'bar',
    data: {
      labels: ['Your Step Goal', 'Friends', 'Friends', 'Friends', 'Friends'],
      datasets: [{
        label: 'Step Goal Weekly Average',
        data: friendsActivityLastWeek,
        backgroundColor: ['#FFAF1A', '#EE6836', '#EE6836', '#EE6836', '#EE6836'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const userVsAllUsersActivity = new Chart($('#allActivityComparedToUsers'), {
    type: 'horizontalBar',
    data: {
      labels: ['Your Steps', 'Users Steps', 'Your Min Active', 'Users Min Active', 'Your Stairs Climbed', 'Users Stairs Climbed'],
      datasets: [{
        label: 'Your vs. All Users Activity',
        data: [userActivity.userStepsByDate(randomUser, today), userActivity.usersActivityAvgByDate('numSteps'), userActivity.userMinutesActiveByDate(randomUser, today), userActivity.usersActivityAvgByDate('minutesActive'), userActivity.userStepsByDate(randomUser, today), userActivity.usersActivityAvgByDate('flightsOfStairs')],
        backgroundColor: ['#DDE65C', '#6FACBD', '#FFAF1A', '#133C55', '#D95F32', '#FFAF1A', '#DDE65C'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });

  const usersWeeklyStepCount = new Chart($('#weeklyStepCount'), {
    type: 'bar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Weekly View of Step Count',
        data: userActivity.userStepCountByWeek(randomUser),
        backgroundColor: ['#103246', '#CAD800', '#FFAF1A', '#3A8DA5', '#EE6836', '#103246', '#CAD800'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const usersWeeklyMinutesActive = new Chart($('#weeklyMinutesActive'), {
    type: 'bar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Weekly View of Minutes Active',
        data: userActivity.userMinutesActiveByWeek(randomUser),
        backgroundColor: ['#EE6836', '#3A8DA5', '#CAD800', '#103246', '#FFAF1A', '#EE6836', '#3A8DA5'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  const usersWeeklyStairClimbed = new Chart($('#weeklyStairsClimbed'), {
    type: 'bar',
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [{
        label: 'Weekly View of Stairs Climbed',
        data: userActivity.userStairsClimbedByWeek(randomUser),
        backgroundColor: ['#DDE65C', '#6FACBD', '#FFAF1A', '#133C55', '#D95F32', '#FFAF1A', '#DDE65C'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

});
