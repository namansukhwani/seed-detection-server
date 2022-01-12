import firebase from './Firebase.service';

export const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

export const getNewAuthToken = async (req, res, next) => {
    if (!req.headers.uid) {
        res.send({
            status: 'failed',
            msg: "please send uid..."
        })
    } else {
        const token = await firebase.auth().createCustomToken(req.headers.uid);
        res.send({
            token: token
        });
    }
};

export const checkRestAuth = (req, res, next) => {
    if (req.headers['x-user-id']) {
        req.authId=req.headers['x-user-id']
        return next();
    }
    else return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
}

export const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await firebase
                .auth()
                .verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};


export async function getTokenWithEmail(req, res, next) {
    const { email } = req.query;

    try {
        const userRecord = await firebase.auth().getUserByEmail(email)
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`)
        const token = await firebase.auth().createCustomToken(userRecord.uid)
        res.statusCode = 200;
        res.send(token)
    }
    catch (err) {
        next(err)
    }

}

