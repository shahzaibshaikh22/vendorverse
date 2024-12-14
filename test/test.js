const autocannon = require('autocannon');

const url = 'http://localhost:5000/api/v1/product/all';

// Function to start the load test
function startLoadTest() {
    const instance = autocannon(
        {
            url: url, // Endpoint to test
            method: 'GET', // HTTP method
            connections: 100, // Number of simultaneous connections
            duration: 30, // Duration of the test in seconds
        },
        (err, result) => {
            if (err) {
                console.error('Error during load test:', err);
            } else {
                console.log('Load test completed. Summary:');
                console.log(result);
            }
        }
    );

    // Print live progress updates
    autocannon.track(instance, { renderProgressBar: true });
}

// Run the load test
startLoadTest();
