// The smaller the precision, the more accurate the result will be, but the more iterations will be needed
const precision = 1e-6;
// The maximum number of iterations to perform before returning the current value
const maxIterations = 100;
// The initial guess for the root of the polynomial
const initialGuess = 2;

// Consider the polynomial: 2x^3 - 6x^2 + 2x - 6
const coefficients = [2, -6, 2, -6];

// Solve the polynomial equation
const root = solvePolynomialWithNewtonRaphson(coefficients);
// Print the result
console.log(`The root of the polynomial is: ${root}`);

// Function to solve the polynomial equation using Newton-Raphson's method
function solvePolynomialWithNewtonRaphson(coefficients) {
    let x = initialGuess;
    let iterations = 0;

    // Perform the iterations until the result is within the desired precision
    while (iterations < maxIterations) {

        // Evaluate the polynomial and its derivative at the current value of x
        const { result, derivative } = evaluatePolynomial(coefficients, x);

        // Check if the result is within the desired precision
        if (Math.abs(result) < precision) {
            break;
        }
        
        // Update the value of x using Newton-Raphson's method
        x = x - (result / derivative);

        // Increment the number of iterations
        iterations++;
    }

    // Return the current value if the maximum iterations are reached
    return x;
}

// Function to evaluate the polynomial and its derivative
function evaluatePolynomial(coefficients, x) {
    let result = 0;
    let derivative = 0;

    for(const [index, coefficient] of coefficients.entries()) {

        // Find the exponent of the current coefficient with respect to the index
        const exponent = coefficients.length - 1 - index;

        // Calculate the value of the current term
        const power = Math.pow(x, exponent);

        // Add the value of the current calculation to the result
        result += coefficient * power;
        
        // Except for the last term, calculate the derivative of the current term and add it to the derivative
        if (index < coefficients.length - 1) {
            derivative += (coefficients[index] * (coefficients.length - 1 - index)) * Math.pow(x, coefficients.length - 2 - index);
        }
    }

    return { result, derivative };
}
