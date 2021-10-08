import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.initialize";

initializeAuthentication();
const useFirebase = () => {
	const [user, setUser] = useState({});
	const [error, setError] = useState("");
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	const logout = () => {
		signOut(auth)
			.then(() => {
				setUser({});
			})
			.catch((error) => console.log(error.message));
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			}
		});
	}, []);

	const signInUsingGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				setUser(result.user);
			})
			.catch((error) => setError(error.message));
	};
	return {
		signInUsingGoogle,
		user,
		error,
		logout,
	};
};

export default useFirebase;
