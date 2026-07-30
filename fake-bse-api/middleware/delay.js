function delay(req, res, next) {

    console.log("Request received:", req.originalUrl);

    // Read values from .env
    const delayTime = Number(process.env.DELAY_MS) || 5000;
    const failureRate = Number(process.env.FAILURE_RATE) || 0.2;

    setTimeout(() => {

        const random = Math.random();

        console.log("Random Number:", random);

        // Fail 20% of the time
        if (random < failureRate) {

            console.log("Request Failed!");

            return res.status(500).json({
                success: false,
                message: "Random BSE Failure"
            });

        }

        console.log("Request Successful!");

        next();

    }, delayTime);

}

module.exports = delay;