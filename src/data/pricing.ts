import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI Thumbnails/month",
            "Basic Templates",
            "standard Resolution",
            "No Watermark",
            "E-mail Support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited AI Thumbnails",
            "Premium Templates",
            "4k Reslution",
            "A/B Testing tool",
            "Priority Support",
            "Custom Font",
            "Brand Kit Analysis"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Eveything in PRO",
            "API Access",
            "Team Collaboration",
            "Custom Branding ",
            "Dedicated Account Manager"
        ],
        mostPopular: false
    }
];