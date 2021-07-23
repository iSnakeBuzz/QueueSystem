# Snake Queue System

QueueSystem is an API designed for Minecraft Servers who wants make a Queue for thier games, it handles arround 2k players per instance.

## Explanation

```
# RedisDB URL Connection
REDIS_URL=redis://user:pass@127.0.0.1:6379/1
```

```json
{
  "solo-queues": [
    {
      "name": "BuildUHC", // Queue name -- localhost:3000/queue/:ID (ID = BuildUHC)
      "minAmount": 2, // Min amount per round
      "maxAmount": 2, // Max per round Amount
      "ranked": false // Is ranked?
    },
    {
      "name": "BuildUHC-Party",
      "minAmount": 2,
      "maxAmount": 48,
      "ranked": true
    }
  ]
}
```

ATT: Snake
