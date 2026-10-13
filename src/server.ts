import { env } from "./config/env";
import { app } from "./app";
import { connectRedis } from "./config/redis-client";

async function bootstrap() {
    await connectRedis();
     
    app.listen(env.server.port, ()=> {
        console.log(`The server is running on port ${env.server.port}...`)
    });
}


bootstrap();