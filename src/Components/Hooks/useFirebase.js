import { useEffect, useState } from 'react';
import initializeAuthentication from '../Firebase/firebase.init';
import { toast } from 'react-toastify';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import nanUser from '../Images/user.jpg';


initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');


    // All Toast Messages.
    const toastRegister = () => toast.success("New User Register Successfully!");
    const toastLogin = () => toast.success("User Login Successfully!");
    const toastSocial = () => toast.success("User Login Successfully!");
    const toastError = (error) => {
        if (error === "Firebase: Error (auth/email-already-in-use).") {
            toast.error("Email Address Already In-Use!");
        }
        else if (error === "Firebase: Error (auth/wrong-password).") {
            toast.error("Incorrect Password!!");
        }
        else if (error === "Firebase: Error (auth/user-not-found).") {
            toast.error("User Not Found!");
        }
        else {
            toast.error("There was an error. please try again!");
        }
    };


    // All Auth Providers.
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();


    // Create User Token(UID).
    const CreateUID = () => {
        const pin = Math.round(Math.random() * 1000000);
        const pinString = pin + '';
        if (pinString.length === 6) {
            return ("GSHOP-" + pin)
        } else {
            return CreateUID()
        }
    };


    // Create an User/Register User.
    const registerNewUser = (name, email, password, location, navigate) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setAuthError('');
                const UID = CreateUID();
                const date = new Date();
                const fullDate = date.toString();
                const time = new Date().toLocaleString();
                const provider = "Email&Password";
                const newUser = { accountType: provider, created: fullDate, createdTime: time, userToken: UID, photoURL: nanUser, email, displayName: name, phoneNumber: null };
                setUser(newUser);
                // Show Toast Alert.
                toastRegister();
                // save db
                // saveUserDatabase(newUser.accountType, newUser.created, newUser.createdTime, newUser.userToken, email, newUser.displayName, newUser.phoneNumber, 'POST');
                // Set name
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => { })
                    .catch((error) => { });
                const destination = location?.state?.from || '/';
                navigate(destination);
            })
            .catch((error) => {
                setAuthError(error.message);
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    };


    // Login User With Email & Password.
    const loginUser = (email, password, location, navigate) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                toastLogin();
                setAuthError('');
            })
            .catch((error) => {
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    };


    // Login User With Facebook.
    const handleFacebookLogin = (location, navigate) => {
        setLoading(true)
        signInWithPopup(auth, FacebookProvider)
            .then((result) => {
                const user = result.user;
                const UID = CreateUID();
                const date = new Date();
                const fullDate = date.toString();
                const time = new Date().toLocaleString();
                const provider = "Facebook";
                // New Property Set in user Objects.
                user.created = fullDate;
                user.createdTime = time;
                user.userToken = UID;
                user.accountType = provider;
                // saveUserDatabase(user.accountType, user.created, user.createdTime, user.userToken, user.email, user.displayName, user?.phoneNumber, 'PUT');
                toastSocial();
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setLoading(false);
                setAuthError(error.message);
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    }


    // Login User With Google.
    const handleGoogleLogin = (location, navigate) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                let user = result.user;
                const UID = CreateUID();
                const date = new Date();
                const fullDate = date.toString();
                const time = new Date().toLocaleString();
                const provider = "Google";
                // New Property Set in user Objects.
                user.created = fullDate;
                user.createdTime = time;
                user.userToken = UID;
                user.accountType = provider;
                // saveUserDatabase(user.accountType, user.created, user.createdTime, user.userToken, user.email, user.displayName, user?.phoneNumber, 'PUT');
                toastSocial();
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setLoading(false);
                setAuthError(error.message);
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    };


    // User Logout/SignOut
    const logout = () => {
        setLoading(true);
        signOut(auth).then(() => {
        }).catch((error) => {

        })
            .finally(() => {
                setLoading(false)
                console.log("Logout")
            });
    };


    // User Observation.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("Auth_Token", idToken))
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);


    // Save User Info On Database.
    // const saveUserDatabase = (accountType, created, createdTime, userToken, email, displayName, phoneNumber, method) => {
    //     const user = { accountType, created, createdTime, userToken, email, displayName, phoneNumber };
    //     fetch("https://daily-bazar-clint.onrender.com/users", {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then()
    // };


    return {
        loginUser,
        handleFacebookLogin,
        handleGoogleLogin,
        registerNewUser,
        logout,
        user,
        loading,
        authError
    };
};

export default useFirebase;