async function retry(fn, label = "Request", retries = 3) {
    for (let i = 1; i <= retries; i++) {

        try {

            console.log(`🔁 [${label}] Attempt ${i}`);

            const result = await fn();

            console.log(`✅ [${label}] Success`);

            return result;
        } catch (error) {

            console.log(`❌ [${label}] Attempt ${i} failed`);

            if (i === retries) {
                console.log(`🚫 [${label}] All ${retries} retry attempts exhausted`);
                throw error;
            }

        }

    }

}

module.exports = retry;