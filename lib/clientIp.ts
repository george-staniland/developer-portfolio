type FreeIpApiResponse = {
    ipAddress?: string;
    cityName?: string;
    countryName?: string;
};

export type ClientIpInfo = {
    ip: string;
    city: string | null;
    country: string | null;
};

const FREE_IP_API_URL = "https://free.freeipapi.com/api/v1/json";

export async function getClientIp(): Promise<ClientIpInfo | null> {
    try {
        const response = await fetch(FREE_IP_API_URL);
        if (!response.ok) {
            return null;
        }
        const data = (await response.json()) as FreeIpApiResponse;
        
        const ip =
            typeof data.ipAddress === "string" ? data.ipAddress : null;
        if (!ip) {
            return null;
        }

        const city =
            typeof data.cityName === "string" && data.cityName.length > 0
                ? data.cityName
                : null;

        const country =
            typeof data.countryName === "string" && data.countryName.length > 0
                ? data.countryName
                : null;

        return { ip, city, country };
    } catch {
        return null;
    }
}
