This project was bootstrapped using Node.js + TypeScript + Express

The task description can be found online at: https://powerxai.notion.site/Software-Engineer-c2d8095970d94e78a39f1abd86533939

## Getting Started

In the project directory, you can run:

### `npm run serve`

Runs the app in the development mode at [http://localhost:3000](http://localhost:3000).

The server will reload if you make edits.<br />
You will also see any lint or type errors in the console.

### Additional Considerations
1) How can we test the code to be confident in the implementation?

We can have unit tests for each function and endpoint using frameworks like Jest. We should ensure each test covers both typical cases and edge cases.

We can also do performance Testing using tools like JMeter or Apache Bench to simulate both typical and peak loads on our API to see how it handles stress and load.

2)How can we make sure this code is easy to maintain for future developers?

We should write clean, well-commented and consistent code and follow best practices.
We can maintain up-to-date documentation for the API endpoints
We should also use version control like git to include feature branches


3)Our API needs to be high-performance — how can we measure the performance of our API?

Logging & Monitoring
Profiling

4)How could we optimise this code if the API receives many more POST requests than GET requests? What about if the API receives many more GET requests than POST requests?

Optimizing for POST requests:
If immediate processing of data isn't crucial we could consider queuing requests and processing them async. 
We could consider scaling the database, we might use databases optimized for high write loads like Cassandra or Amazon DynamoDB.
We can use a load balancer to distribute incoming requests 

Optimizing for GET requests:
We can use in-memory cache like redis to cache frequent queries or computed results. 
We can have read replicas that will distribute read queries across multiple database instances.


5)Would any of this logic need to change to scale to millions of simultaneous connections?

Transitioning to microservices architecture can increase scalability. This will help to scale each service independently. 

Load Balancing

Database scalability => horizontal scaling, caching, read/write separation (using read replicas)

CDN

Real time monitoring

Implement failover mechanism