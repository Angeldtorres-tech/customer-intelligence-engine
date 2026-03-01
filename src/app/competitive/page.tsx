import { getCompetitiveData } from "@/lib/data";
import { CompetitiveView } from "./competitive-view";

export default async function CompetitivePage() {
  const { competitiveRatings, competitiveSentimentTrend, competitiveThemeComparison } =
    await getCompetitiveData();

  return (
    <CompetitiveView
      competitiveRatings={competitiveRatings}
      competitiveSentimentTrend={competitiveSentimentTrend}
      competitiveThemeComparison={competitiveThemeComparison}
    />
  );
}
