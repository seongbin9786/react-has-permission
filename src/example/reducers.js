const initialState = {
    subject: {
        id: 1,
        name: 'Seongbin Kim'
    },
    post: {
        authorId: 1,
        author: 'Seongbin Kim',
        postLevel: 1,
        title: 'hello',
        content: 'world'
    }
};

export default function(state = initialState, action) {
    return state;
}