try {
  console.log("INSIDE TRY")
  undefined.pop(); //This results in an error
} finally {
  // THIS RUNS NO MATTER WHAT
  console.log("INSIDE FINALLY!")
}
//THIS WILL NOT RUN BECAUSE WE DIDN'T CATCH THE ERROR
console.log("did we make it?");
