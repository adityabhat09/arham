async function retry(fn, retries = 3) {

    for (let i = 1; i <= retries; i++) {

        try {

            console.log(`Attempt ${i}`);

            return await fn();

        } catch (error) {

            console.log(`Attempt ${i} failed`);

            if (i === retries) {
                throw error;
            }

        }

    }

}

module.exports = retry;