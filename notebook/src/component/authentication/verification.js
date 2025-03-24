import { useEffect } from "react";

export default function CheckVerify({ setAuthorize, setVerification }) {
    useEffect(() => {
        const checkVerify = async () => {
            try {
                const response = await fetch("http://localhost:5000/verify", {
                    method: "GET",
                    credentials: "include",
                });
                console.log(response);
                setVerification(true);

                if (response.status === 200) {
                    setAuthorize(true);
                }
            } catch (error) {
                console.error("Verification failed:", error);
                setVerification(false);
            }
        };

        checkVerify();
    }, []);

    return <h1>Loading...</h1>; // ✅ Correctly returning JSX
}
