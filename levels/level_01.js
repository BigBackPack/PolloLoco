const level01 = new Level(
    [
        new Bg("imgs/bgs/BG_1024px.png", 0, -1696), // clouds big
        new Bg("imgs/bgs/BG_1024px.png", 0, -2176), // clouds small
        new Bg("imgs/bgs/BG_1024px.png", 0, -2656), // mountains
        new Bg("imgs/bgs/BG_1024px.png", 0, -3136), // desert
        new Bg("imgs/bgs/BG_1024px.png", 0, -3616), // ground
    ], 

    [
        // new Bg("imgs/bgs/BG_1024px.png", 0, -2176), // clouds
    ],

    [
        // new Npc(),
        // new Npc(),

        new Boss(),
    ],

    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ],

    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],
);