
## Handling thousands requests in nodejs using async await
It's either you want to fetch thousands requests or solve 1 of 3 errors:
`read ECONNRESET` / `connect ETIMEDOUT` /  `Client network socket disconnected before secure TLS connection was established`
in nodejs.

### Things to notice:

You will need to change the code inside the `doTheFetch`, in that point you could call the api endpoint, your aws-s3, etc.
If you will need more control over each iteration, you could change the functionality inside the 
`reduce` function. 

Play around with the value `howManyChunks`, increase/decrease it. Depends on your aws-server,
your server, the cpu, etc etc.


## Run Locally

Clone the project

```bash
  git clone https://github.com/alejandro-zapeta/handling-thousands-http-requests
```

Go to the project directory

```bash
  cd handling-thousands-http-requests
```

Install dependencies

```bash
  npm install
```

Run the index file

```bash
  node index.js
```


## Acknowledgements

[![Handling thousands requests in nodejs](https://img.youtube.com/vi/TP6Q1QisVl0/maxresdefault.jpg)](https://www.youtube.com/watch?v=TP6Q1QisVl0)
