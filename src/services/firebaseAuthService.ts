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