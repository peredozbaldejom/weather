export async function GET(request) {
    const data = {
        name: 'alex',
        age: 20,
        bio: 'some info'
    };

    return new Response(JSON.stringify(data));
}


