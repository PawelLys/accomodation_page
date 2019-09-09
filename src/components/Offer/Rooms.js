const rooms = [
    {
        id: 0,
        name: 'two-person room',
        img: 'css/img/2-room.jpg',
        space: 20,
        people: 2,
        contain: [
            'access to stylish and fully fitted kitchen',
            'access to modern bathroom',
            'bedroom with luxury beds',
            'lock-up garage',
            'Lorem ipsum dolor sit amet, cras dapibus',
            'Etiam ultricies nisi vel augue.'
        ],
        description: `Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
            Aenean commodo ligula eget dolor. Cum sociis natoque penatibus.`,
        aditionalInfo: 'Shared house with 4 bedrooms, bathroom + toilet, kitchen, parking.',
        descShort: '1 room + 2 beds',
        price: 40
    },
    {
        id: 1,
        name: 'four-person house',
        img: 'css/img/4-house.jpg',
        space: 180,
        people: 4,
        contain: [
            'vast open living room',
            'exclusive access to stylish and fully fitted kitchen',
            'exclusive access to two modern bathrooms',
            'two cosy bedrooms with luxury beds',
            'lock-up garage',
            'Lorem ipsum dolor sit amet, cras dapibus',
            'Etiam ultricies nisi vel augue.'
        ],
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.`,
        aditionalInfo: 'House with 2 bedrooms, living room, bathroom + toilet, kitchen, balcon and garage.',
        descShort: '5 rooms + 4 beds',
        price: 200
    },
    {
        id: 2,
        name: 'two-person house',
        img: 'css/img/2-house.jpg',
        space: 100,
        people: 2,
        contain: [
            'exclusive access to stylish and fully fitted kitchen',
            'exclusive access to modern bathroom',
            'cosy bedroom with luxury beds',
            'lock-up garage',
            'Lorem ipsum dolor sit amet, cras dapibus',
            'Etiam ultricies nisi vel augue.'
        ],
        description: `Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, 
            consectetuer adipiscing elit. Cum sociis natoque penatibus.`,
        aditionalInfo: 'House with bedroom, living room, bathroom + toilet, kitchen, balcon and garage.',
        descShort: '4 room + 2 beds',
        price: 150
    },
    {
        id: 3,
        name: 'Premium house',
        img: 'css/img/premium-house.jpg',
        space: 280,
        people: 8,
        contain: [
            'exclusive access to stylish and fully fitted kitchen',
            'exclusive access to modern bathrooms',
            'four cosy bedrooms with luxury beds',
            'lock-up garage',
            'exclusive access to SPA room, swimming pool and gym',
            'Lorem ipsum dolor sit amet, cras dapibus',
            'Etiam ultricies nisi vel augue.'
        ],
        description: `Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, 
            consectetuer adipiscing elit. Cum sociis natoque penatibus.`,
        aditionalInfo: `House with 4 bedrooms, large living room, bathroom + toilet, kitchen, swimming pool, 
            SPA room, 2 balcons and 2 garages.`,
        descShort: '9 room + beds at will (no more than 8)',
        price: 450
    },
    {
        id: 4,
        name: 'Tour house',
        img: 'css/img/tour-house.jpg',
        space: 240,
        people: 10,
        contain: [
            'exclusive access to stylish and fully fitted kitchen',
            'exclusive access to modern bathrooms',
            'three cosy bedrooms with luxury beds',
            'lock-up garage',
            'exclusive access to gym',
            'Lorem ipsum dolor sit amet, cras dapibus',
            'Etiam ultricies nisi vel augue.',
        ],
        description: `Lorem ipsum dolor sit amet.. Aenean massa, aenean commodo ligula eget dolor.
            Consectetuer adipiscing elit. Cum sociis natoque penatibus.`,
        aditionalInfo: 'House with 5 bedrooms, large living room, bathroom + toilet, kitchen, balcon and parking.',
        descShort: '8 room + beds at will (no more than 10)',
        price: 300
    }
];

export default rooms;