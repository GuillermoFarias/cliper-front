import { useRuntimeConfig } from '#app';

export const useCliper = () => {
    const config = useRuntimeConfig();
    const apiUrl = 'https://cliper.gfarias.cl';

    const isValidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const shortenUrl = async (newUrl) => {
        const endpoint = `${apiUrl}/url`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: newUrl }),
        });
        const data = await response.json();
        return data;
    }

    const copyToClipboard = async (text) => {
        if (!navigator.clipboard) {
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    }

    return {
        isValidUrl,
        shortenUrl,
        copyToClipboard,
    };
};