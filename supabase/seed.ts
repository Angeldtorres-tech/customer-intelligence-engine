/**
 * Seed script: Inserts Marigold CIE mock data into Supabase.
 *
 * Usage:  npx tsx supabase/seed.ts
 *
 * Reads credentials from .env.local (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

// ---------------------------------------------------------------------------
// Mock data (inlined from src/lib/mock-data.ts to keep the seed self-contained
// while still matching exactly)
// ---------------------------------------------------------------------------

const products = [
  { name: "Sailthru", slug: "sailthru", company_type: "own" },
  { name: "Cheetah Digital", slug: "cheetah", company_type: "own" },
  { name: "Selligent", slug: "selligent", company_type: "own" },
  { name: "Braze", slug: "braze", company_type: "competitor" },
  { name: "Klaviyo", slug: "klaviyo", company_type: "competitor" },
  { name: "Iterable", slug: "iterable", company_type: "competitor" },
];

const themesData = [
  { name: "Email Deliverability", slug: "th-001", description: "Feedback related to email deliverability rates, inbox placement, and spam filtering issues across platforms.", classification: "pain_point" },
  { name: "Segmentation UX", slug: "th-002", description: "User experience friction in audience segmentation builders, including query performance and UI responsiveness.", classification: "pain_point" },
  { name: "AI Personalization", slug: "th-003", description: "Positive reception of AI-driven content personalization and recommendations engine capabilities.", classification: "praise" },
  { name: "API Documentation", slug: "th-004", description: "Requests for better API documentation, code examples, and developer onboarding experience.", classification: "feature_request" },
  { name: "Cross-Channel Orchestration", slug: "th-005", description: "Growing demand for unified cross-channel campaign orchestration spanning email, SMS, push, and web.", classification: "feature_request" },
  { name: "Pricing Concerns", slug: "th-006", description: "Recurring feedback about pricing transparency, value perception, and contract flexibility.", classification: "churn_risk" },
  { name: "Reporting & Analytics", slug: "th-007", description: "Need for more advanced campaign analytics, attribution modeling, and custom report builders.", classification: "feature_request" },
  { name: "Onboarding Experience", slug: "th-008", description: "Feedback about implementation complexity, time-to-value, and the quality of onboarding support.", classification: "pain_point" },
  { name: "Mobile SDK Quality", slug: "th-009", description: "Technical issues with mobile SDK integration, push notification reliability, and in-app messaging.", classification: "pain_point" },
  { name: "Template Builder", slug: "th-010", description: "Praise and feature requests around the drag-and-drop email template builder and design system.", classification: "praise" },
];

type FeedbackTemplate = {
  text: string;
  source: string;
  product_slug: string;
  sentiment_score: number;
  sentiment_label: string;
  theme_slugs: string[];
  rating?: number;
};

const feedbackTemplates: FeedbackTemplate[] = [
  { text: "Our deliverability rates dropped 15% after migrating to Sailthru. The IP warming process was poorly documented and support took days to respond.", source: "G2", product_slug: "sailthru", sentiment_score: 0.18, sentiment_label: "negative", theme_slugs: ["th-001"], rating: 2 },
  { text: "Sailthru's deliverability tools are solid once you get them configured. Took about a month to see consistent inbox placement above 95%.", source: "G2", product_slug: "sailthru", sentiment_score: 0.65, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 4 },
  { text: "Inbox placement for Gmail has been terrible this quarter. We are seeing 30% of our sends landing in promotions tab.", source: "Support", product_slug: "sailthru", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-001"] },
  { text: "The new deliverability dashboard gives great visibility into inbox placement. Being able to see per-ISP metrics is a game changer.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-001"] },
  { text: "We keep getting flagged as spam on Yahoo. Been working with support for 3 weeks with no resolution.", source: "Support", product_slug: "sailthru", sentiment_score: 0.08, sentiment_label: "negative", theme_slugs: ["th-001"] },
  { text: "Deliverability is the one area where Sailthru clearly beats the competition. Their dedicated IP management is excellent.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 5 },
  { text: "After switching to shared IP pools, our deliverability improved. The team helped us optimize our sending reputation.", source: "G2", product_slug: "sailthru", sentiment_score: 0.71, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 4 },
  { text: "Cheetah Digital's email deliverability has been inconsistent. Some campaigns hit 98% inbox, others barely crack 80%.", source: "G2", product_slug: "cheetah", sentiment_score: 0.35, sentiment_label: "negative", theme_slugs: ["th-001"], rating: 3 },
  { text: "The bounce management in Cheetah is outdated. Hard bounces take too long to suppress.", source: "Support", product_slug: "cheetah", sentiment_score: 0.22, sentiment_label: "negative", theme_slugs: ["th-001"] },
  { text: "We moved from Cheetah to Braze primarily because of deliverability issues with our transactional emails.", source: "G2", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-001", "th-006"], rating: 2 },
  { text: "Building segments in Cheetah Digital is painfully slow. Complex queries with behavioral data take 10+ minutes to return counts.", source: "G2", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-002"], rating: 2 },
  { text: "The segment builder UI feels like it was designed in 2015. No drag-and-drop, no visual query builder. Just raw filter dropdowns.", source: "Capterra", product_slug: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_slugs: ["th-002"], rating: 2 },
  { text: "We have to export to CSV and re-import just to create exclusion segments. This should be a basic feature.", source: "Support", product_slug: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_slugs: ["th-002"] },
  { text: "The new segmentation updates are a step in the right direction but still lag behind what Klaviyo offers out of the box.", source: "G2", product_slug: "cheetah", sentiment_score: 0.40, sentiment_label: "neutral", theme_slugs: ["th-002"], rating: 3 },
  { text: "Segment refresh times have improved recently. Still wish we could do real-time segmentation for triggered campaigns.", source: "NPS", product_slug: "cheetah", sentiment_score: 0.48, sentiment_label: "neutral", theme_slugs: ["th-002"] },
  { text: "Sailthru's Audience Builder is intuitive once you learn it. The behavioral targeting options are comprehensive.", source: "G2", product_slug: "sailthru", sentiment_score: 0.68, sentiment_label: "positive", theme_slugs: ["th-002"], rating: 4 },
  { text: "Nested segment logic in Sailthru crashes the browser when dealing with lists over 1M contacts.", source: "Support", product_slug: "sailthru", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-002"] },
  { text: "Sailthru's personalization engine is genuinely impressive. Saw a 22% lift in click-through rates after enabling AI-powered content blocks.", source: "G2", product_slug: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "The AI product recommendations are spookily good. Our customers are clicking on items we never would have manually curated.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "Prediction Manager lets us identify churn risk before it happens. Integrated it with our lifecycle campaigns and reduced churn by 8%.", source: "G2", product_slug: "sailthru", sentiment_score: 0.90, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "The AI subject line optimizer consistently outperforms our manually written subject lines in A/B tests.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-003"] },
  { text: "Personalization is great but the setup is complex. Took our team 3 months to fully implement the recommendation engine.", source: "G2", product_slug: "sailthru", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-003", "th-008"], rating: 3 },
  { text: "Wish the AI features were available on all plans. Right now they are locked behind the enterprise tier.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_slugs: ["th-003", "th-006"], rating: 3 },
  { text: "Cheetah's API docs are a mess. Half the endpoints are undocumented, and the ones that are documented have outdated examples.", source: "G2", product_slug: "cheetah", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-004"], rating: 1 },
  { text: "Spent 2 weeks trying to integrate the Cheetah API. The SDKs are not maintained and the REST docs are incomplete.", source: "Support", product_slug: "cheetah", sentiment_score: 0.08, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Sailthru's API is well-designed but the documentation could use more real-world examples.", source: "Reddit", product_slug: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_slugs: ["th-004"] },
  { text: "The developer experience with Cheetah Digital is below average. No Postman collection, no OpenAPI spec, no sandbox.", source: "Reddit", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "API rate limits are poorly communicated. We hit them in production and had no idea they existed.", source: "Support", product_slug: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Selligent's journey builder handles cross-channel well. We run email, SMS, and push from a single workflow.", source: "G2", product_slug: "selligent", sentiment_score: 0.75, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 4 },
  { text: "The cross-channel capabilities are promising but the SMS integration feels bolted on rather than native.", source: "Capterra", product_slug: "selligent", sentiment_score: 0.45, sentiment_label: "neutral", theme_slugs: ["th-005"], rating: 3 },
  { text: "We chose Selligent specifically for multi-channel orchestration. It delivers on that promise better than most.", source: "Gartner", product_slug: "selligent", sentiment_score: 0.72, sentiment_label: "positive", theme_slugs: ["th-005"] },
  { text: "Would love to see web push and in-app messaging added to the journey builder. Right now it is email and SMS only.", source: "NPS", product_slug: "selligent", sentiment_score: 0.50, sentiment_label: "neutral", theme_slugs: ["th-005"] },
  { text: "Compared to Iterable's cross-channel, Selligent still has room to grow. But they are moving in the right direction.", source: "G2", product_slug: "selligent", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 3 },
  { text: "Cheetah's pricing is extremely opaque. Took 3 sales calls just to get a ballpark number. Not a great buying experience.", source: "G2", product_slug: "cheetah", sentiment_score: 0.18, sentiment_label: "negative", theme_slugs: ["th-006"], rating: 2 },
  { text: "We are paying significantly more per contact than we would on Klaviyo for essentially the same feature set.", source: "Capterra", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-006"], rating: 2 },
  { text: "The annual contract lock-in with no opt-out clause is frustrating. We wanted to downgrade but couldn't.", source: "NPS", product_slug: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_slugs: ["th-006"] },
  { text: "Sailthru's pricing is fair for what you get, especially the AI features. But the jump from Pro to Enterprise is steep.", source: "G2", product_slug: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_slugs: ["th-006"], rating: 3 },
  { text: "Selligent's pricing model is reasonable but they nickel and dime on add-ons like SMS and advanced analytics.", source: "Gartner", product_slug: "selligent", sentiment_score: 0.30, sentiment_label: "negative", theme_slugs: ["th-006"] },
  { text: "Sailthru's reporting is functional but basic. We export everything to Looker because the built-in dashboards lack depth.", source: "G2", product_slug: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_slugs: ["th-007"], rating: 3 },
  { text: "Need multi-touch attribution in the platform. Currently there is no way to see campaign influence across channels.", source: "Support", product_slug: "sailthru", sentiment_score: 0.25, sentiment_label: "negative", theme_slugs: ["th-007"] },
  { text: "The real-time campaign metrics are helpful for monitoring sends, but historical trend analysis is weak.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.40, sentiment_label: "neutral", theme_slugs: ["th-007"], rating: 3 },
  { text: "Custom report builder would be huge. Right now we are stuck with pre-built reports that do not match our KPIs.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.30, sentiment_label: "negative", theme_slugs: ["th-007"] },
  { text: "Selligent's onboarding was rough. The implementation took 6 months and required significant professional services budget.", source: "G2", product_slug: "selligent", sentiment_score: 0.18, sentiment_label: "negative", theme_slugs: ["th-008"], rating: 2 },
  { text: "The onboarding team was knowledgeable but the process felt rushed. We went live before we were truly ready.", source: "NPS", product_slug: "selligent", sentiment_score: 0.30, sentiment_label: "negative", theme_slugs: ["th-008"] },
  { text: "Cheetah's implementation was smooth thanks to a great onboarding manager. Had our first campaign out in 3 weeks.", source: "G2", product_slug: "cheetah", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-008"], rating: 4 },
  { text: "The learning curve is steep. Even after onboarding, our team needed 2 more months to feel comfortable with the platform.", source: "Capterra", product_slug: "selligent", sentiment_score: 0.25, sentiment_label: "negative", theme_slugs: ["th-008"], rating: 2 },
  { text: "Selligent's mobile SDK has caused multiple app crashes in production. The push notification handling is unreliable on Android.", source: "Support", product_slug: "selligent", sentiment_score: 0.08, sentiment_label: "negative", theme_slugs: ["th-009"] },
  { text: "The iOS SDK is outdated and does not support the latest notification frameworks. We had to write custom wrappers.", source: "Support", product_slug: "selligent", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-009"] },
  { text: "In-app messaging works well when it works, but the SDK initialization is flaky and drops messages.", source: "G2", product_slug: "selligent", sentiment_score: 0.28, sentiment_label: "negative", theme_slugs: ["th-009"], rating: 2 },
  { text: "Mobile push open tracking is inconsistent. We see significant discrepancies between Selligent data and our own analytics.", source: "Support", product_slug: "selligent", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-009"] },
  { text: "The drag-and-drop template builder in Sailthru is excellent. Our designers can create campaigns without any HTML knowledge.", source: "G2", product_slug: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-010"], rating: 5 },
  { text: "Template versioning and A/B testing content blocks directly in the builder saves us hours every week.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-010"], rating: 4 },
  { text: "Would love to see more pre-built templates. The current library is limited compared to Mailchimp or HubSpot.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.50, sentiment_label: "neutral", theme_slugs: ["th-010"] },
  { text: "The template builder is good but rendering in Outlook is hit or miss. Need better testing tools built in.", source: "G2", product_slug: "sailthru", sentiment_score: 0.45, sentiment_label: "neutral", theme_slugs: ["th-010"], rating: 3 },
  // Competitor feedback
  { text: "Braze's real-time personalization is best-in-class. The Content Cards feature alone justified the switch from Sailthru.", source: "G2", product_slug: "braze", sentiment_score: 0.88, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "Braze's segmentation is lightning fast. Complex behavioral segments return in seconds, not minutes.", source: "Capterra", product_slug: "braze", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-002"], rating: 5 },
  { text: "Braze Canvas is the best journey builder in the market. Intuitive, powerful, and flexible.", source: "G2", product_slug: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 5 },
  { text: "Braze is expensive but you get what you pay for. The platform is reliable and the support team is responsive.", source: "Gartner", product_slug: "braze", sentiment_score: 0.65, sentiment_label: "positive", theme_slugs: ["th-006"] },
  { text: "API documentation is excellent. Comprehensive SDKs, Postman collections, and sandbox environments.", source: "Reddit", product_slug: "braze", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-004"] },
  { text: "Braze's email deliverability is good but not exceptional. Their strength is more in push and in-app.", source: "G2", product_slug: "braze", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 3 },
  { text: "Onboarding with Braze was seamless. Their implementation team had us live in 6 weeks.", source: "G2", product_slug: "braze", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-008"], rating: 4 },
  { text: "Reporting in Braze is solid but custom reports require Currents export to a data warehouse.", source: "Capterra", product_slug: "braze", sentiment_score: 0.50, sentiment_label: "neutral", theme_slugs: ["th-007"], rating: 3 },
  { text: "Klaviyo's segmentation is the gold standard for ecommerce. Real-time behavioral segments with zero lag.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.92, sentiment_label: "positive", theme_slugs: ["th-002"], rating: 5 },
  { text: "For an ecommerce brand, Klaviyo's personalization is unmatched. Product recommendations are powered by actual purchase data.", source: "Capterra", product_slug: "klaviyo", sentiment_score: 0.87, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "Klaviyo's pricing is transparent and scales well. You know exactly what you are paying for each month.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-006"], rating: 4 },
  { text: "Email deliverability on Klaviyo is excellent out of the box. Minimal configuration needed.", source: "Capterra", product_slug: "klaviyo", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 4 },
  { text: "Klaviyo's flow builder is intuitive but lacks advanced branching logic for complex multi-channel journeys.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 3 },
  { text: "Analytics are built right into Klaviyo. Revenue attribution per campaign and per flow is available by default.", source: "NPS", product_slug: "klaviyo", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-007"] },
  { text: "The template builder is decent for basic emails but falls short for complex, branded designs.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.45, sentiment_label: "neutral", theme_slugs: ["th-010"], rating: 3 },
  { text: "Iterable's cross-channel orchestration is seamless. Email, push, SMS, in-app all in one workflow.", source: "G2", product_slug: "iterable", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 5 },
  { text: "Iterable's API is developer-friendly with excellent documentation and SDKs for every language.", source: "Reddit", product_slug: "iterable", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-004"] },
  { text: "AI-powered send time optimization in Iterable boosted our open rates by 12%.", source: "Capterra", product_slug: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 4 },
  { text: "Iterable's pricing is reasonable for mid-market but gets expensive fast at enterprise scale.", source: "Gartner", product_slug: "iterable", sentiment_score: 0.40, sentiment_label: "neutral", theme_slugs: ["th-006"] },
  { text: "Segmentation in Iterable is good but the UI could be more intuitive. There is a learning curve.", source: "G2", product_slug: "iterable", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-002"], rating: 3 },
  { text: "Email deliverability on Iterable has been consistently high. Rarely see issues with inbox placement.", source: "Capterra", product_slug: "iterable", sentiment_score: 0.75, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 4 },
  { text: "Onboarding was well-structured. Their success team held weekly calls during the first 3 months.", source: "NPS", product_slug: "iterable", sentiment_score: 0.72, sentiment_label: "positive", theme_slugs: ["th-008"] },
  // More mixed feedback
  { text: "The platform handles high-volume sends well but struggles with real-time triggered campaigns during peak hours.", source: "Support", product_slug: "sailthru", sentiment_score: 0.35, sentiment_label: "negative", theme_slugs: ["th-001"] },
  { text: "Customer support is responsive but often lacks deep technical knowledge about the platform internals.", source: "NPS", product_slug: "cheetah", sentiment_score: 0.30, sentiment_label: "negative", theme_slugs: ["th-008"] },
  { text: "We have been a Selligent customer for 4 years. The product has improved significantly but still needs polish.", source: "G2", product_slug: "selligent", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 3 },
  { text: "The integration marketplace is lacking. We need native connectors for Snowflake, BigQuery, and modern CDPs.", source: "Capterra", product_slug: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_slugs: ["th-004"], rating: 2 },
  { text: "Sailthru's recommendation engine helped us increase average order value by 15% in Q4.", source: "G2", product_slug: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "Really impressed with the new journey analytics dashboard. Finally can see conversion rates at each step.", source: "NPS", product_slug: "selligent", sentiment_score: 0.75, sentiment_label: "positive", theme_slugs: ["th-007"] },
  { text: "Cheetah's loyalty program management is their strongest feature. Integration with campaign tools is where it falls apart.", source: "Gartner", product_slug: "cheetah", sentiment_score: 0.48, sentiment_label: "neutral", theme_slugs: ["th-005"] },
  { text: "The mobile app push notification delivery rate has dropped below 70%. Unacceptable for our use case.", source: "Support", product_slug: "selligent", sentiment_score: 0.05, sentiment_label: "negative", theme_slugs: ["th-009"] },
  { text: "Sailthru's lifecycle optimization tool is underrated. It automatically identifies the best time to message each user.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 4 },
  { text: "We evaluated Braze and Iterable before choosing Cheetah. Regretting that decision based on the developer experience alone.", source: "Reddit", product_slug: "cheetah", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Excellent customer support team. They helped us troubleshoot a complex deliverability issue in under 2 hours.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-001"] },
  { text: "The campaign approval workflow is clunky. Multiple reviewers cannot collaborate simultaneously.", source: "Capterra", product_slug: "cheetah", sentiment_score: 0.25, sentiment_label: "negative", theme_slugs: ["th-002"], rating: 2 },
  { text: "Braze's pricing is steep but the ROI is there. We saw 3x return on our investment in the first year.", source: "G2", product_slug: "braze", sentiment_score: 0.70, sentiment_label: "positive", theme_slugs: ["th-006"], rating: 4 },
  { text: "Klaviyo integrates natively with Shopify in ways no other platform can match.", source: "Capterra", product_slug: "klaviyo", sentiment_score: 0.90, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 5 },
  { text: "Selligent's European data residency is a must-have for us. GDPR compliance was seamless.", source: "Gartner", product_slug: "selligent", sentiment_score: 0.72, sentiment_label: "positive", theme_slugs: ["th-008"] },
  { text: "Template rendering issues across email clients are frequent. Dark mode email support is basically non-existent.", source: "Support", product_slug: "cheetah", sentiment_score: 0.18, sentiment_label: "negative", theme_slugs: ["th-010"] },
  { text: "Iterable's Catalog feature for personalization is powerful. We use it to dynamically populate product grids.", source: "G2", product_slug: "iterable", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 4 },
  { text: "The segmentation performance has gotten worse with our growing contact list. 5M+ contacts and counts take forever.", source: "Support", product_slug: "cheetah", sentiment_score: 0.10, sentiment_label: "negative", theme_slugs: ["th-002"] },
  { text: "Sailthru's content affinity model is unique in the market. No other platform does interest-based personalization this well.", source: "G2", product_slug: "sailthru", sentiment_score: 0.92, sentiment_label: "positive", theme_slugs: ["th-003"], rating: 5 },
  { text: "Push notification rich media support is limited. Cannot send carousels or interactive notifications.", source: "Capterra", product_slug: "selligent", sentiment_score: 0.20, sentiment_label: "negative", theme_slugs: ["th-009"], rating: 2 },
  { text: "Klaviyo's reporting dashboard is clean and actionable. Love the cohort analysis feature.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-007"], rating: 4 },
  { text: "Braze's in-app messaging SDK is rock solid. Zero crashes and handles edge cases gracefully.", source: "Reddit", product_slug: "braze", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-009"] },
  { text: "The lack of a visual workflow builder in Cheetah Digital is a dealbreaker for our marketing team.", source: "G2", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-005"], rating: 1 },
  { text: "Great platform overall but the pricing model makes it hard to justify for smaller brands.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.42, sentiment_label: "neutral", theme_slugs: ["th-006"], rating: 3 },
  { text: "Iterable's onboarding documentation is excellent. Self-serve setup is actually possible.", source: "G2", product_slug: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-008", "th-004"], rating: 4 },
  { text: "Selligent handles multi-language campaigns better than any platform we have used.", source: "NPS", product_slug: "selligent", sentiment_score: 0.80, sentiment_label: "positive", theme_slugs: ["th-005"] },
  { text: "The data sync between Cheetah and our CRM is constantly breaking. No error notifications.", source: "Support", product_slug: "cheetah", sentiment_score: 0.08, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Braze's Currents streaming export is invaluable for our data team. Real-time event streaming to Snowflake.", source: "Gartner", product_slug: "braze", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-007"] },
  { text: "Sailthru's send-time optimization improved our open rates by 18%. The ML models are clearly well-tuned.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.88, sentiment_label: "positive", theme_slugs: ["th-003"] },
  { text: "Cheetah's template system is rigid. Cannot create reusable content modules across campaigns.", source: "Capterra", product_slug: "cheetah", sentiment_score: 0.22, sentiment_label: "negative", theme_slugs: ["th-010"], rating: 2 },
  { text: "Klaviyo's flow builder makes automation easy. Set up our abandoned cart flow in under an hour.", source: "Capterra", product_slug: "klaviyo", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-005"], rating: 5 },
  { text: "Iterable's experiment framework is powerful. True multivariate testing across channels, not just email.", source: "G2", product_slug: "iterable", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-007"], rating: 4 },
  { text: "Selligent's email rendering engine sometimes strips CSS in Outlook. Not ideal for B2B campaigns.", source: "Support", product_slug: "selligent", sentiment_score: 0.25, sentiment_label: "negative", theme_slugs: ["th-010"] },
  { text: "Moving from Sailthru to Braze was the best decision we made this year. Everything just works.", source: "G2", product_slug: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_slugs: ["th-008"], rating: 5 },
  { text: "Cheetah needs to invest in their developer tools. The competition has left them behind.", source: "Reddit", product_slug: "cheetah", sentiment_score: 0.15, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Sailthru's customer success team genuinely cares about our outcomes. Quarterly business reviews are thorough.", source: "NPS", product_slug: "sailthru", sentiment_score: 0.78, sentiment_label: "positive", theme_slugs: ["th-008"] },
  { text: "Klaviyo's pre-built templates for ecommerce are excellent. Saved us weeks of design time.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.82, sentiment_label: "positive", theme_slugs: ["th-010"], rating: 4 },
  { text: "The webhook system in Selligent is unreliable. Events get dropped during high-traffic periods.", source: "Support", product_slug: "selligent", sentiment_score: 0.12, sentiment_label: "negative", theme_slugs: ["th-004"] },
  { text: "Braze's documentation is the most comprehensive I have seen. Every endpoint has working code examples.", source: "Reddit", product_slug: "braze", sentiment_score: 0.88, sentiment_label: "positive", theme_slugs: ["th-004"] },
  { text: "Iterable handles transactional and marketing email equally well. No need for a separate ESP.", source: "Capterra", product_slug: "iterable", sentiment_score: 0.75, sentiment_label: "positive", theme_slugs: ["th-001"], rating: 4 },
  { text: "Cheetah's reporting exports are limited to CSV. No native BI tool integration.", source: "G2", product_slug: "cheetah", sentiment_score: 0.20, sentiment_label: "negative", theme_slugs: ["th-007"], rating: 2 },
  { text: "Sailthru's dynamic content blocks support Zephyr scripting. Powerful but steep learning curve.", source: "Capterra", product_slug: "sailthru", sentiment_score: 0.55, sentiment_label: "positive", theme_slugs: ["th-010"], rating: 3 },
  { text: "We switched from Selligent to Klaviyo. The simplicity and speed difference is night and day.", source: "G2", product_slug: "klaviyo", sentiment_score: 0.85, sentiment_label: "positive", theme_slugs: ["th-002"], rating: 5 },
  { text: "Braze's push notification system is the most reliable we have tested. 99.9% delivery rate.", source: "Capterra", product_slug: "braze", sentiment_score: 0.90, sentiment_label: "positive", theme_slugs: ["th-009"], rating: 5 },
  { text: "Selligent's consent management tools handle GDPR well, but the UX around preference centers needs work.", source: "G2", product_slug: "selligent", sentiment_score: 0.48, sentiment_label: "neutral", theme_slugs: ["th-002"], rating: 3 },
];

const alertsData = [
  { severity: "critical", theme_slug: "th-001", title: "Email Deliverability Drop Detected", description: "Sailthru deliverability sentiment has dropped 13 points over the past 3 weeks. Negative feedback volume increased 40% week-over-week, primarily from G2 and Support tickets.", created_at: "2026-02-22T14:30:00Z" },
  { severity: "warning", theme_slug: "th-006", title: "Pricing Churn Risk Rising", description: "Cheetah Digital pricing concerns showing sustained negative trend. Three recent G2 reviews mention actively evaluating competitor pricing. Sentiment at 0.28, down from 0.35 four weeks ago.", created_at: "2026-02-21T09:15:00Z" },
  { severity: "info", theme_slug: "th-003", title: "AI Personalization Gaining Traction", description: "Sailthru AI personalization theme sentiment has risen steadily to 0.72. Multiple G2 reviews cite measurable ROI from AI features. Emerging competitive differentiator.", created_at: "2026-02-20T11:45:00Z" },
];

const weeklyBriefsData = [
  {
    week_of: "2026-02-17",
    title: "Week of February 17, 2026",
    content: `## Weekly Intelligence Brief\n\n### Executive Summary\n\nThis week saw **293 new feedback items** analyzed across all sources. The overall sentiment index stands at **62/100**, down 2 points from last week. Two themes require immediate attention: Email Deliverability and Pricing Concerns are both showing sustained negative trajectories.\n\n### Key Findings\n\n**1. Email Deliverability Concerns Intensifying**\n\nSailthru deliverability feedback has turned sharply negative, with sentiment dropping from 0.55 to 0.42 over the past four weeks. The primary drivers are:\n- Gmail inbox placement issues reported by multiple enterprise customers\n- IP warming documentation gaps causing problems for new senders\n- Support response times for deliverability issues averaging 3+ days\n\n*Recommendation:* Escalate to the Sailthru product team. Consider a dedicated deliverability task force and proactive outreach to affected accounts.\n\n**2. Cheetah Digital Segmentation UX Falling Behind**\n\nThe Segmentation UX theme continues its downward trend (sentiment: 0.38). Competitors, particularly Klaviyo and Braze, are consistently praised for real-time segmentation while Cheetah users report multi-minute query times and an outdated interface.\n\n*Recommendation:* Prioritize segmentation performance improvements in the Q2 roadmap. Conduct competitive UX audit against Klaviyo's segment builder.\n\n**3. AI Personalization as Competitive Moat**\n\nSailthru's AI personalization capabilities continue to receive strong positive sentiment (0.72, up from 0.63 four weeks ago). Multiple reviews cite measurable business outcomes: 15-22% lift in engagement metrics. This is a rare area where Marigold products lead the competition.\n\n*Recommendation:* Feature AI personalization more prominently in marketing materials. Consider packaging AI capabilities as a standalone value proposition.\n\n### Competitive Landscape\n\n- **Braze** continues to receive the highest overall sentiment (0.78) with particular strength in cross-channel orchestration and developer experience\n- **Klaviyo** dominates ecommerce-focused feedback with praise for segmentation speed and transparent pricing\n- **Iterable** gaining positive mentions for cross-channel capabilities and improving AI features\n\n### Emerging Signals\n\n- Growing demand for **real-time CDP integration** across all platforms\n- **Privacy and consent management** emerging as a differentiator, particularly for Selligent in European markets\n- **SMS/MMS capabilities** becoming table stakes, no longer a differentiator\n\n### Source Distribution This Week\n\n| Source | Count | Avg Sentiment |\n|--------|-------|---------------|\n| G2 | 87 | 0.52 |\n| Support | 68 | 0.31 |\n| Capterra | 52 | 0.58 |\n| NPS | 44 | 0.55 |\n| Gartner | 22 | 0.49 |\n| Reddit | 20 | 0.48 |`,
    key_metrics: {
      top_themes: ["Email Deliverability", "Segmentation UX", "AI Personalization"],
      emerging_signals: ["Real-time CDP integration demand", "Privacy/consent management", "SMS becoming table stakes"],
      sentiment_changes: [
        { theme: "Email Deliverability", change: -5 },
        { theme: "Segmentation UX", change: -3 },
        { theme: "AI Personalization", change: 3 },
        { theme: "Pricing Concerns", change: -2 },
        { theme: "Cross-Channel Orchestration", change: 3 },
      ],
    },
  },
  {
    week_of: "2026-02-10",
    title: "Week of February 10, 2026",
    content: `## Weekly Intelligence Brief\n\n### Executive Summary\n\nThis week saw **276 new feedback items** analyzed. The overall sentiment index stands at **64/100**, stable from last week. Notable movement in AI Personalization (positive) and API Documentation (negative).\n\n### Key Findings\n\n**1. AI Personalization Momentum Building**\n\nSailthru's AI features continue to generate positive buzz. This week saw five separate G2 reviews specifically mentioning the recommendation engine's impact on revenue. Sentiment improved from 0.66 to 0.69.\n\n*Recommendation:* Capture and package these success stories as case studies. The quantifiable ROI claims (15-22% lifts) are powerful sales enablement material.\n\n**2. Developer Experience Gap Widening**\n\nThe API Documentation theme shows persistent negative sentiment (0.35) primarily affecting Cheetah Digital. Developer feedback on Reddit and G2 consistently calls out missing documentation, outdated SDKs, and lack of sandbox environments. This contrasts sharply with Braze (0.82 API doc sentiment) and Iterable (0.80).\n\n*Recommendation:* Invest in developer experience for Cheetah Digital as a strategic priority. The developer community influences buying decisions.\n\n**3. Cross-Channel Orchestration Demand Growing**\n\nFeedback volume for cross-channel orchestration increased 20% week-over-week. Selligent is well-positioned but needs to expand beyond email and SMS to include web push and in-app messaging.\n\n*Recommendation:* Accelerate web push and in-app channel additions to the Selligent journey builder.\n\n### Competitive Landscape\n\n- **Braze** launched new AI features that are generating buzz in Reddit developer communities\n- **Klaviyo** announced SMS expansion to European markets\n- **Iterable** receiving positive feedback for recent UX improvements to their campaign builder\n\n### Emerging Signals\n\n- Increasing mentions of **AI-generated email copy** as a desired feature\n- Several reviews comparing marketing automation platforms to **CDP capabilities**\n- **Deliverability transparency** becoming an expectation (public status pages, real-time metrics)\n\n### Source Distribution This Week\n\n| Source | Count | Avg Sentiment |\n|--------|-------|---------------|\n| G2 | 82 | 0.54 |\n| Support | 61 | 0.33 |\n| Capterra | 49 | 0.56 |\n| NPS | 42 | 0.52 |\n| Gartner | 24 | 0.50 |\n| Reddit | 18 | 0.45 |`,
    key_metrics: {
      top_themes: ["AI Personalization", "API Documentation", "Cross-Channel Orchestration"],
      emerging_signals: ["AI-generated email copy demand", "CDP comparison trend", "Deliverability transparency expectations"],
      sentiment_changes: [
        { theme: "AI Personalization", change: 3 },
        { theme: "API Documentation", change: -1 },
        { theme: "Cross-Channel Orchestration", change: 2 },
        { theme: "Pricing Concerns", change: -3 },
        { theme: "Template Builder", change: 3 },
      ],
    },
  },
];

const pipelineRunsData = [
  { source: "G2", status: "success", items_processed: 47, errors: 0, started_at: "2026-02-24T06:00:00Z", completed_at: "2026-02-24T06:12:34Z" },
  { source: "Capterra", status: "success", items_processed: 31, errors: 0, started_at: "2026-02-24T06:15:00Z", completed_at: "2026-02-24T06:22:18Z" },
  { source: "Support", status: "partial", items_processed: 28, errors: 3, started_at: "2026-02-24T06:30:00Z", completed_at: "2026-02-24T06:45:22Z" },
  { source: "NPS", status: "success", items_processed: 22, errors: 0, started_at: "2026-02-24T07:00:00Z", completed_at: "2026-02-24T07:08:45Z" },
  { source: "Gartner", status: "success", items_processed: 12, errors: 0, started_at: "2026-02-24T07:15:00Z", completed_at: "2026-02-24T07:19:33Z" },
  { source: "Reddit", status: "failed", items_processed: 0, errors: 1, started_at: "2026-02-24T07:30:00Z", completed_at: "2026-02-24T07:30:12Z" },
];

const evalMetricsData = {
  classification_accuracy: 0.924,
  sentiment_accuracy: 0.891,
  cluster_coherence: 0.847,
  eval_date: "2026-02-23",
};

const costTrackingData = {
  month: "February 2026",
  openai_spend: 142.87,
  anthropic_spend: 89.34,
  total_tokens: 2847293,
  budget: 300,
};

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  console.log("Seeding CIE Dashboard data into Supabase...\n");

  // 1. Create company config
  console.log("1. Creating Marigold company config...");
  const { data: configData, error: configError } = await supabase
    .from("company_configs")
    .insert({ name: "Marigold", is_active: true })
    .select()
    .single();

  if (configError) {
    console.error("Failed to create config:", configError);
    process.exit(1);
  }
  const configId = configData.id;
  console.log(`   Config ID: ${configId}`);

  // 2. Insert products
  console.log("2. Inserting products...");
  const { data: productRows, error: prodError } = await supabase
    .from("products")
    .insert(products.map((p) => ({ ...p, config_id: configId })))
    .select();

  if (prodError) {
    console.error("Failed to insert products:", prodError);
    process.exit(1);
  }
  // Map slug -> UUID
  const productMap = new Map<string, string>();
  for (const row of productRows!) {
    productMap.set(row.slug, row.id);
  }
  console.log(`   Inserted ${productRows!.length} products`);

  // 3. Insert themes
  console.log("3. Inserting themes...");
  const { data: themeRows, error: themeError } = await supabase
    .from("themes")
    .insert(
      themesData.map((t) => ({
        config_id: configId,
        name: t.name,
        description: t.description,
        classification: t.classification,
      }))
    )
    .select();

  if (themeError) {
    console.error("Failed to insert themes:", themeError);
    process.exit(1);
  }
  // Map slug -> UUID (by matching order/name)
  const themeMap = new Map<string, string>();
  for (let i = 0; i < themesData.length; i++) {
    const dbTheme = themeRows!.find((r) => r.name === themesData[i].name);
    if (dbTheme) themeMap.set(themesData[i].slug, dbTheme.id);
  }
  console.log(`   Inserted ${themeRows!.length} themes`);

  // 4. Insert feedback items + theme relationships
  console.log("4. Inserting feedback items...");
  const startDate = new Date("2026-01-27");
  let feedbackInserted = 0;
  let themeLinksInserted = 0;

  // Insert in batches of 50
  for (let i = 0; i < feedbackTemplates.length; i += 50) {
    const batch = feedbackTemplates.slice(i, i + 50);
    const feedbackRows = batch.map((f, idx) => {
      const dayOffset = (i + idx) % 28;
      const date = new Date(startDate);
      date.setDate(date.getDate() + dayOffset);

      return {
        config_id: configId,
        product_id: productMap.get(f.product_slug) ?? null,
        text: f.text,
        source: f.source,
        sentiment_score: f.sentiment_score,
        sentiment_label: f.sentiment_label,
        rating: f.rating ?? null,
        scraped_at: date.toISOString(),
      };
    });

    const { data: insertedFeedback, error: fbError } = await supabase
      .from("feedback_items")
      .insert(feedbackRows)
      .select();

    if (fbError) {
      console.error("Failed to insert feedback batch:", fbError);
      continue;
    }

    feedbackInserted += insertedFeedback!.length;

    // Insert feedback_themes join records
    const themeLinks: { feedback_id: string; theme_id: string }[] = [];
    for (let j = 0; j < batch.length; j++) {
      const feedbackId = insertedFeedback![j]?.id;
      if (!feedbackId) continue;
      for (const slug of batch[j].theme_slugs) {
        const themeId = themeMap.get(slug);
        if (themeId) {
          themeLinks.push({ feedback_id: feedbackId, theme_id: themeId });
        }
      }
    }

    if (themeLinks.length > 0) {
      const { error: linkError } = await supabase
        .from("feedback_themes")
        .insert(themeLinks);
      if (linkError) {
        console.error("Failed to insert theme links:", linkError);
      } else {
        themeLinksInserted += themeLinks.length;
      }
    }
  }
  console.log(`   Inserted ${feedbackInserted} feedback items, ${themeLinksInserted} theme links`);

  // 5. Insert alerts
  console.log("5. Inserting alerts...");
  const alertRows = alertsData.map((a) => ({
    config_id: configId,
    theme_id: themeMap.get(a.theme_slug) ?? null,
    severity: a.severity,
    title: a.title,
    description: a.description,
    created_at: a.created_at,
  }));

  const { error: alertError } = await supabase.from("alerts").insert(alertRows);
  if (alertError) console.error("Failed to insert alerts:", alertError);
  else console.log(`   Inserted ${alertRows.length} alerts`);

  // 6. Insert weekly briefs
  console.log("6. Inserting weekly briefs...");
  const briefRows = weeklyBriefsData.map((b) => ({
    config_id: configId,
    week_of: b.week_of,
    title: b.title,
    content: b.content,
    key_metrics: b.key_metrics,
  }));

  const { error: briefError } = await supabase.from("weekly_briefs").insert(briefRows);
  if (briefError) console.error("Failed to insert briefs:", briefError);
  else console.log(`   Inserted ${briefRows.length} weekly briefs`);

  // 7. Insert pipeline runs
  console.log("7. Inserting pipeline runs...");
  const pipelineRows = pipelineRunsData.map((r) => ({
    config_id: configId,
    source: r.source,
    status: r.status,
    items_processed: r.items_processed,
    errors: r.errors,
    started_at: r.started_at,
    completed_at: r.completed_at,
  }));

  const { error: pipelineError } = await supabase.from("pipeline_runs").insert(pipelineRows);
  if (pipelineError) console.error("Failed to insert pipeline runs:", pipelineError);
  else console.log(`   Inserted ${pipelineRows.length} pipeline runs`);

  // 8. Insert eval metrics
  console.log("8. Inserting eval metrics...");
  const { error: evalError } = await supabase.from("eval_metrics").insert({
    config_id: configId,
    classification_accuracy: evalMetricsData.classification_accuracy,
    sentiment_accuracy: evalMetricsData.sentiment_accuracy,
    cluster_coherence: evalMetricsData.cluster_coherence,
    eval_date: evalMetricsData.eval_date,
  });

  if (evalError) console.error("Failed to insert eval metrics:", evalError);
  else console.log("   Inserted eval metrics");

  // 9. Insert cost tracking
  console.log("9. Inserting cost tracking...");
  const { error: costError } = await supabase.from("cost_tracking").insert({
    config_id: configId,
    month: costTrackingData.month,
    openai_spend: costTrackingData.openai_spend,
    anthropic_spend: costTrackingData.anthropic_spend,
    total_tokens: costTrackingData.total_tokens,
    budget: costTrackingData.budget,
  });

  if (costError) console.error("Failed to insert cost tracking:", costError);
  else console.log("   Inserted cost tracking");

  console.log("\nSeed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
