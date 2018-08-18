# Perestrava

Perestrava is a Web app for cyclists and runners that lets users create and store
their riding and running routes using an interactive map. It is modeled after
the Web version of Strava.

Perestrava is built on a Ruby on Rails back end, with a PostgreSQL database and a
React/Redux front end. The first version of this site was built as a project with
a deadline of ten days. More features will be added, and the current features
will be deepened and extended in the future.

## Features

* Secure frontend and backend user authentication using BCrypt
* Interactive route map where users can create and save routes
* Route index page, showing all a user's routes

## Projected features

* Individual show pages for each route, reached by clicking on route on the index page
* Editing and deletion of saved routes
* Draggable markers in the Route Builder
* Manual entry form for workouts, either attached to specific routes or not
* Viewing, editing, and deletion of workouts
* Scrolling workout feed on a user's home page ("Dashboard")
* Calculated workout statistics on a user's home page
* Specific timeframes for statistics
