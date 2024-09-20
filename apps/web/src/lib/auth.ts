import { signIn } from "next-auth/react";

const handleOAuth = async (provider: string, ) => {
    const result = await signIn(provider, {
        callbackUrl: `/api/auth/callback/${provider}`,
    });

    if (result?.error) {
        // Handle errors
        console.error(result.error);
    }
};


export { handleOAuth };
