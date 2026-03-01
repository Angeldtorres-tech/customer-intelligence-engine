import { getThemeExplorerData } from "@/lib/data";
import { ThemeExplorer } from "./theme-explorer";

export default async function ThemesPage() {
  const { products, themes, feedbackItems } = await getThemeExplorerData();

  return (
    <ThemeExplorer
      themes={themes}
      products={products}
      feedbackItems={feedbackItems}
    />
  );
}
