const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "ecelluietkuk.appspot.com" 
});

const storage = admin.storage();

exports.uploadImage = async (req, res) => {
    console.log(req)
    if (!req.file) {
        return res.status(400).send('No image uploaded');
    }

    const originalFilename = req.file.originalname;
    const contentType = req.file.mimetype;

    try {
        const bucket = storage.bucket();
        const imageRef = bucket.file(originalFilename);

        await imageRef.save(req.file.buffer, {
            contentType,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4() 
            }
        });
        const imagePath = await imageRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491' 
        }).then(urls => urls[0]);

        res.json({ imagePath: imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
};

exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const originalFilename = req.file.originalname;
    const contentType = req.file.mimetype;

    try {
        const bucket = storage.bucket();
        const fileRef = bucket.file(originalFilename);

        await fileRef.save(req.file.buffer, {
            contentType,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4() 
            }
        });

        const filePath = await fileRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491' 
        }).then(urls => urls[0]);

        res.json({ filePath: filePath });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
};

