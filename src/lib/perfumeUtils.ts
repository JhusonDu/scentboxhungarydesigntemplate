import { ShopifyProduct } from "./shopify";

const CONCENTRATION_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /\bEDP\b/i, label: "EDP" },
  { pattern: /\bEDT\b/i, label: "EDT" },
  { pattern: /\bExtrait\b/i, label: "Extrait" },
  // "Parfum" as a standalone word but NOT "Code Parfum" style where it's part of the product name
  { pattern: /\bParfum\b/i, label: "Parfum" },
  // "Intense" as standalone word, not "Intensément" or similar
  { pattern: /\bIntense\b(?!m)/i, label: "Intense" },
];

const DECANT_SUFFIX = /\s*-\s*Dekant\s*$/i;

export interface ConcentrationInfo {
  baseName: string;
  concentration: string | null;
  isDecant: boolean;
}

/**
 * Extracts concentration type and base name from a Shopify product title.
 *
 * Examples:
 *  "Dior Sauvage EDP - Dekant"  → { baseName: "Dior Sauvage", concentration: "EDP", isDecant: true }
 *  "Chanel Bleu de Chanel Parfum - Dekant" → { baseName: "Chanel Bleu de Chanel", concentration: "Parfum", isDecant: true }
 *  "Tom Ford Oud Wood - Dekant" → { baseName: "Tom Ford Oud Wood", concentration: null, isDecant: true }
 */
export function extractConcentration(title: string): ConcentrationInfo {
  const isDecant = DECANT_SUFFIX.test(title);
  let cleaned = title.replace(DECANT_SUFFIX, "").trim();

  for (const { pattern, label } of CONCENTRATION_PATTERNS) {
    if (pattern.test(cleaned)) {
      const baseName = cleaned.replace(pattern, "").replace(/\s{2,}/g, " ").trim();
      return { baseName, concentration: label, isDecant };
    }
  }

  return { baseName: cleaned, concentration: null, isDecant };
}

/**
 * Groups products by their base perfume name so that different concentrations
 * of the same fragrance can be shown together (e.g. EDT / EDP / Parfum tabs).
 */
export function groupProductsByBaseName(
  products: ShopifyProduct[]
): Map<string, { product: ShopifyProduct; info: ConcentrationInfo }[]> {
  const map = new Map<string, { product: ShopifyProduct; info: ConcentrationInfo }[]>();

  for (const product of products) {
    const info = extractConcentration(product.node.title);
    const key = info.baseName.toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push({ product, info });
  }

  return map;
}
