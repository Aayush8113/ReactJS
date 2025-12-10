// src/utils/aiCaption.js

/**
 * --- AI Caption and Tag Generator Utility ---
 * Generates marketing captions and hashtags based on image URL analysis.
 * NOTE: This is a placeholder for a true AI service.
 */

// --- 1. Rule Definitions (Keyword Mapping) ---
const ANALYSIS_RULES = [
    { key: "mountainscape", words: ["mountain", "peak", "ridge", "himalaya", "alps", "range"] },
    { key: "urbanvibes", words: ["city", "urban", "skyscraper", "street", "night", "building"] },
    { key: "forestpath", words: ["forest", "tree", "woods", "green", "jungle", "wilderness"] },
    { key: "oceanview", words: ["ocean", "sea", "water", "wave", "beach", "coast", "shore"] },
    { key: "desertdunes", words: ["desert", "sand", "dune", "arid", "sahara"] },
    { key: "winterwonder", words: ["snow", "winter", "cold", "frozen", "ice", "ski"] },
    { key: "goldenhour", words: ["sunset", "sunrise", "orange", "dusk", "dawn", "golden"] },
    { key: "wildlife", words: ["tiger", "lion", "animal", "wild", "safari", "bird", "pet"] },
];

const DEFAULT_KEYWORD = "scenicview";

/**
 * Analyzes the image URL string to detect relevant keywords.
 * @param {string} url - The image URL string.
 * @returns {Array<string>} An array of detected keywords.
 */
function analyzeImage(url) {
    if (!url || typeof url !== 'string') return [DEFAULT_KEYWORD];
    
    const lowerUrl = url.toLowerCase();
    let detectedKeys = [];

    ANALYSIS_RULES.forEach(rule => {
        const isMatch = rule.words.some(word => lowerUrl.includes(word));
        if (isMatch) {
            detectedKeys.push(rule.key);
        }
    });

    if (detectedKeys.length === 0) {
        detectedKeys.push(DEFAULT_KEYWORD);
    }

    return detectedKeys;
}

/**
 * Constructs a marketing caption from a list of keywords.
 * @param {Array<string>} keys - The detected keywords.
 * @returns {string} The generated caption.
 */
function buildCaption(keys) {
    const templates = [
        "A breathtaking view of the {scene}! Where should we explore next? #TravelGram",
        "Captured a beautifully {scene} moment. Absolutely stunning! What a mood.",
        "Stunning {scene} in perfect lighting. Get lost in this beauty.",
        "A cinematic shot showcasing the power of {scene}. This needs to be your desktop background!",
        "Chasing the sun and the {scene} vibes. Tag a friend who loves this!",
    ];

    // Format scene string (e.g., 'mountainscape, goldenhour' -> 'Mountainscape and Goldenhour')
    const scene = keys.map(k => k.replace(/view|scape|dunes|wonder|vibes/g, '')).join(" and ");
    const formattedScene = scene.charAt(0).toUpperCase() + scene.slice(1);
    
    const chosenTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    return chosenTemplate.replace("{scene}", formattedScene);
}

/**
 * Constructs a comprehensive hashtag list.
 * @param {Array<string>} keys - The detected keywords.
 * @returns {Array<string>} An array of hashtags.
 */
function buildTags(keys) {
    const baseTags = keys.map(k => `#${k}`);
    
    // Add generic, high-traffic tags (remove duplicates via Set later)
    const genericTags = [
        "#photography", "#travel", "#explore", "#naturelover", 
        "#beautifuldestinations", "#art", "#photooftheday"
    ];

    // Combine, convert to lower case, and ensure uniqueness
    const allTags = [...baseTags, ...genericTags];
    return Array.from(new Set(allTags.map(tag => tag.toLowerCase())));
}


/**
 * Main function to generate caption and tags.
 * @param {string} imageUrl - The URL of the image to analyze.
 * @returns {{caption: string, tags: Array<string>}}
 */
export function generateCaption(imageUrl) {
    const keywords = analyzeImage(imageUrl);
    const caption = buildCaption(keywords);
    const tags = buildTags(keywords);

    return { caption, tags };
}