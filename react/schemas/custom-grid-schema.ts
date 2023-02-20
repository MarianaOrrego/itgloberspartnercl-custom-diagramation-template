const customGridSchema = {
    title: "Grilla custom",
    type: "object",
    properties: {
        gridType: {
            title: 'Tipo de grilla',
            type: 'number',
            enum: [
                1,
                2,
                3,
                4
            ]
        }
    }
}

export default customGridSchema;