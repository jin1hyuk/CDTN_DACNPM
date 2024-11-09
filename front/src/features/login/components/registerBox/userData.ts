export const users = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "password123",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        verifyCode: "123456",
        posts: [
            {
                title: "Alice's First Post",
                description: "This is the description of Alice's first post.",
                content: "Here is the content of Alice's first post.",
                comments: [
                    { user: "Bob Smith", text: "Great post, Alice!" },
                    { user: "Charlie Brown", text: "Very informative, thanks!" }
                ],
                likes: 10,
                dislikes: 2
            },
            {
                title: "Alice's Second Post",
                description: "This is a short description for Alice's second post.",
                content: "Content of Alice's second post here.",
                comments: [
                    { user: "Evan Lee", text: "Looking forward to more posts!" }
                ],
                likes: 5,
                dislikes: 1
            }
        ]
    },
    {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "password456",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        verifyCode: "654321",
        posts: [
            {
                title: "Bob's First Post",
                description: "Description for Bob's first post.",
                content: "Content of Bob's first post.",
                comments: [
                    { user: "Alice Johnson", text: "Nice post, Bob!" }
                ],
                likes: 7,
                dislikes: 0
            }
        ]
    },
    {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: "password789",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        verifyCode: "112233",
        posts: [
            {
                title: "Charlie's First Post",
                description: "Charlie's first post description.",
                content: "This is the content of Charlie's first post.",
                comments: [],
                likes: 3,
                dislikes: 0
            },
            {
                title: "Charlie's Second Post",
                description: "A description for the second post of Charlie.",
                content: "Here is the content for the second post of Charlie.",
                comments: [
                    { user: "Diana Prince", text: "Interesting thoughts, Charlie!" }
                ],
                likes: 8,
                dislikes: 1
            }
        ]
    },
    {
        name: "Diana Prince",
        email: "diana.prince@example.com",
        password: "password101",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        verifyCode: "445566",
        posts: [
            {
                title: "Diana's First Post",
                description: "Short description for Diana's first post.",
                content: "Detailed content for Diana's first post.",
                comments: [],
                likes: 2,
                dislikes: 0
            }
        ]
    },
    {
        name: "Evan Lee",
        email: "evan.lee@example.com",
        password: "password202",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        verifyCode: "778899",
        posts: [
            {
                title: "Evan's First Post",
                description: "Evan's first post description goes here.",
                content: "Here is the content of Evan's first post.",
                comments: [
                    { user: "Alice Johnson", text: "Great insights, Evan!" }
                ],
                likes: 6,
                dislikes: 1
            }
        ]
    }
];
