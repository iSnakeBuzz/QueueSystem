# GamesAPI

GamesAPI is an API designed for Minecraft Servers who wants save data from a lot of players simultaneous without knocking their Databases directly.

This system uses a cache system dedicated to prevent update MongoDB at each request. (Recommended a good Redis Instance for run this app)

If you have 1000 - 10k users we recommend use this API, if you have more, I personally recommend you to contract a developer team to make your backend system. But if you don't want to pay, bad idea, you can use this system.

If you anyway want to use this, keep in mind scale your app vertically with Redis instances. Keeping that in mind, enjoy it!

## Explanation
```

# RedisDB URL Connection
REDIS_URL=redis://user:pass@127.0.0.1:6379/1

# MongoDB URL Connection
MONGO_URL=mongodb://admin:admin123@localhost:27017/?authSource=admin&readPreference=primary&ssl=false

# Tops expire after 60 seconds
REDIS_EXPIRE=60

# Docker servers || BungeeCord Servers IP
SERVER_HOST=127.0.0.1
```

ATT: Snake