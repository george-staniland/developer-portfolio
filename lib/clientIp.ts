type IpifyResponse = {
    ip: string;
};

export async function getClientIp(): Promise<string | null> {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) {
            return null;
        }
        const data = (await response.json()) as IpifyResponse;
        return typeof data.ip === "string" ? data.ip : null;
    } catch {
        return null;
    }
}
