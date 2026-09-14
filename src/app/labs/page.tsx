import { LabsGallery } from "@/domains/labs/list/LabsGallery";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "움직임과 인터랙션을 탐구하는 프론트엔드 실험실. 직접 조작하며 경험하는 컴포넌트 전시입니다.",
};

export default function LabsPage() {
  return <LabsGallery />;
}
