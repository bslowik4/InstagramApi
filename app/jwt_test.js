const jwt = require('jsonwebtoken');

const createToken = async () => {

    let token = await jwt.sign(
        {
            email: "aaa@test.com",
            anyData: "123"
        },
        "verysecretkey", // powinno być w .env
        {
            expiresIn: "1h" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
}
createToken()

const verifyToken = async (token) => {

        try {
            let decoded = await jwt.verify(token, "verysecretkey")
            console.log({ decoded: decoded });
        }
        catch (ex) {
            console.log({ message: ex.message });
        }
    }
    
    
    const processToken = async () => {
        await createToken()
        await verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueURhdGEiOiIxMjMiLCJpYXQiOjE2ODM0MTQxNDksImV4cCI6MTY4MzQxNDE3OX0.PqTR48QLtB5tw387Hm3KCSMHUGxNJWn7X8ws2uASXug")
    }
    
    processToken()
    
    