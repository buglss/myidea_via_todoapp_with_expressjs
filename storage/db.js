let DB = {
    todo: [],
    user: [
        {
            "id": "1667668065875",
            "active": true,
            "roles": [
                "admin"
            ],
            "username": "buglss",
            "stamp": {
                "createdAt": 1,
                "ip": "127.0.0.1",
                "username": "buglss",
                "email": "l.sencer.sahin@gmail.com"
            },
            "password": "$2a$10$wBVmEwdG3Ruw0nnFvnmC/e9taMYfxprAApBLHH6L4FPQv6txP.zr6",
            "email": "l.sencer.sahin@gmail.com",
            "displayName": "Levent Sencer Şahin"
        }
    ]
}

module.exports = {
    collections() { return Object.keys(DB) },
    getCollection(name) { return DB[name] },
    flush() {
        DB = {
            todo: [],
            user: [
                {
                    "id": "1667668065875",
                    "active": true,
                    "roles": [
                        "admin"
                    ],
                    "username": "buglss",
                    "stamp": {
                        "createdAt": 1,
                        "ip": "127.0.0.1",
                        "username": "buglss",
                        "email": "l.sencer.sahin@gmail.com"
                    },
                    "password": "$2a$10$wBVmEwdG3Ruw0nnFvnmC/e9taMYfxprAApBLHH6L4FPQv6txP.zr6", // 1234
                    "email": "l.sencer.sahin@gmail.com",
                    "displayName": "Levent Sencer Şahin"
                }
            ]
        }
    }
}