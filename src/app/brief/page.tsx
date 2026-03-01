import { getBriefPageData } from "@/lib/data";
import { BriefViewer } from "./brief-viewer";

export default async function BriefPage() {
  const { weeklyBriefs } = await getBriefPageData();

  return <BriefViewer weeklyBriefs={weeklyBriefs} />;
}
