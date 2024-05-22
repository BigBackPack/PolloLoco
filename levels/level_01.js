const level01 = new Level(
    [
        // sky
        new Bg("img/5_background/layers/air.png", 0),
        new Bg("img/5_background/layers/air.png", 720),
        new Bg("img/5_background/layers/air.png", 1440),
        new Bg("img/5_background/layers/air.png", 2160),

        new Bg("img/5_background/layers/3_third_layer/1.png", 0),
        new Bg("img/5_background/layers/3_third_layer/2.png", 720),
        new Bg("img/5_background/layers/2_second_layer/1.png", 0),
        new Bg("img/5_background/layers/2_second_layer/2.png", 720),
        new Bg("img/5_background/layers/1_first_layer/1.png", 0),
        new Bg("img/5_background/layers/1_first_layer/2.png", 720),

        new Bg("img/5_background/layers/3_third_layer/1.png", 1440),
        new Bg("img/5_background/layers/3_third_layer/2.png", 2160),
        new Bg("img/5_background/layers/2_second_layer/1.png", 1440),
        new Bg("img/5_background/layers/2_second_layer/2.png", 2160),
        new Bg("img/5_background/layers/1_first_layer/1.png", 1440),
        new Bg("img/5_background/layers/1_first_layer/2.png", 2160),
    ], 

    [
        new Cloud()
    ],

    [
        new Npc(),
        new Npc(),
        new Npc(),
        new Boss()
    ],
);