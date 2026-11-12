export type ClientMirrorInfo = {
    deviceType: string;
    brand: string;
    browser: string;
};

function parseBrowser(userAgent: string): string {
    if (/Edg\//.test(userAgent)) return "Edge";
    if (/OPR\/|Opera/.test(userAgent)) return "Opera";
    if (/Firefox\//.test(userAgent)) return "Firefox";
    if (/CriOS\//.test(userAgent)) return "Chrome";
    if (/FxiOS\//.test(userAgent)) return "Firefox";
    if (/Chrome\//.test(userAgent)) return "Chrome";
    if (/Safari\//.test(userAgent)) return "Safari";
    return "Unknown browser";
}

function parseDeviceFromUserAgent(
    userAgent: string,
): Pick<ClientMirrorInfo, "deviceType" | "brand"> {
    if (/iPhone/.test(userAgent)) {
        return { deviceType: "Phone", brand: "Apple" };
    }

    const ipad =
        /iPad/.test(userAgent) ||
        (typeof navigator !== "undefined" &&
            navigator.platform === "MacIntel" &&
            navigator.maxTouchPoints > 1);

    if (ipad) {
        return { deviceType: "Tablet", brand: "Apple" };
    }

    if (/Android/.test(userAgent)) {
        if (/Samsung|SM-/.test(userAgent)) {
            return {
                deviceType: /Mobile/.test(userAgent) ? "Phone" : "Tablet",
                brand: "Samsung",
            };
        }
        if (/Pixel/.test(userAgent)) {
            return { deviceType: "Phone", brand: "Google" };
        }
        return {
            deviceType: /Mobile/.test(userAgent) ? "Phone" : "Tablet",
            brand: "Android",
        };
    }

    if (/Macintosh|Mac OS X/.test(userAgent)) {
        return { deviceType: "Desktop", brand: "Apple" };
    }
    if (/Windows/.test(userAgent)) {
        return { deviceType: "Desktop", brand: "Windows PC" };
    }
    if (/Linux/.test(userAgent)) {
        return { deviceType: "Desktop", brand: "Linux" };
    }

    return { deviceType: "Unknown device", brand: "Unknown" };
}

export function getClientDeviceSpecs(): ClientMirrorInfo {
    const userAgent = navigator.userAgent;
    const { deviceType, brand } = parseDeviceFromUserAgent(userAgent);
    let info: ClientMirrorInfo = {
        deviceType,
        brand,
        browser: parseBrowser(userAgent),
    };

    const uad = navigator.userAgentData;
    if (uad?.mobile) {
        info = { ...info, deviceType: "Phone" };
    }
    if (uad?.platform) {
        const platformBrand: Record<string, string> = {
            macOS: "Apple",
            Windows: "Windows PC",
            Android: "Android",
            iOS: "Apple",
            Linux: "Linux",
        };
        const mapped = platformBrand[uad.platform];
        if (mapped) {
            info = { ...info, brand: mapped };
        }
        const platformType: Record<string, string> = {
            Android:
                info.deviceType === "Unknown device" ? "Phone" : info.deviceType,
            iOS: "Phone",
            macOS: "Desktop",
            Windows: "Desktop",
            Linux: "Desktop",
        };
        const mappedType = platformType[uad.platform];
        if (mappedType && info.deviceType === "Unknown device") {
            info = { ...info, deviceType: mappedType };
        }
    }

    return info;
}

export async function enrichClientDeviceSpecs(
    base: ClientMirrorInfo,
): Promise<ClientMirrorInfo> {
    const uad = navigator.userAgentData;
    if (!uad?.getHighEntropyValues) {
        return base;
    }

    try {
        const hints = await uad.getHighEntropyValues(["model", "platform"]);
        console.log('enrich function', hints)
        const brand =
            hints.model && hints.model.length > 0 ? hints.model : base.brand;
        return { ...base, brand };
    } catch {
        return base;
    }
}
