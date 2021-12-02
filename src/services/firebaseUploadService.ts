import { bucket } from "./Firebase.service";

const folderName = "images/";

export const uploadeFileFirestore = (file, userId) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("NO IMAGE FILE");
        }

        const filename = `${folderName}${userId}_${Date.now()}`;

        const fileUpload = bucket.file(filename);
        const blobStream = fileUpload.createWriteStream({
            contentType: file.mimetype
        })

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            fileUpload.makePublic()
            const url = fileUpload.publicUrl()
            resolve(url);
        });

        blobStream.end(file.buffer);
    })
}
