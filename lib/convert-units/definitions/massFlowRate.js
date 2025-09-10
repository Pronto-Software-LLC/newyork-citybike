const metric = {
    'kg/s': {
        name: {
            singular: 'Kilogram per second',
            plural: 'Kilograms per second',
        },
        to_anchor: 1,
    },
    'kg/h': {
        name: {
            singular: 'Kilogram per hour',
            plural: 'Kilograms per hour',
        },
        to_anchor: 1 / 3600,
    },
    'mt/h': {
        name: {
            singular: 'Ton per hour',
            plural: 'Tons per hour',
        },
        to_anchor: 1 / 3.6,
    },
};
const imperial = {
    'lb/s': {
        name: {
            singular: 'Pound per second',
            plural: 'Pounds per second',
        },
        to_anchor: 1,
    },
    'lb/h': {
        name: {
            singular: 'Pound per hour',
            plural: 'Pounds per hour',
        },
        to_anchor: 1 / 3600,
    },
};
const measure = {
    systems: {
        metric,
        imperial,
    },
    anchors: {
        metric: {
            imperial: {
                ratio: 1 / 0.453592,
            },
        },
        imperial: {
            metric: {
                ratio: 0.453592,
            },
        },
    },
};
export default measure;
