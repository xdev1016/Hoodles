interface RoadmapItem {
  title: string;
  description: string[];
}

const RoadmapList: RoadmapItem[] = [
  {
    title: "25% SOLD",
    description: [
      "5 prizes of 0.25 ETH paid to lucky Hoodle owners. Each Hoodle owned counts as 1 entry.",
      "Hoodles trailer and theme song created and released. ",
    ],
  },
  {
    title: "50% SOLD",
    description: [
      "5 Hoodles raffled to early adopters who minted the first 1,667 Hoodles.",
      "Exclusive Hoodles Merch.",
    ],
  },
  {
    title: "75% SOLD",
    description: [
      "Official launch of the Hoodles DAO. More details below.",
      "+5 ETH transferred to the Hoodles DAO.",
    ],
  },
  {
    title: "100% SOLD",
    description: [
      "+10 ETH transferred to the Hoodles DAO.",
      "First community vote will be held on the initial investment to be made with the DAO's assets.",
      "Phase 2 initiated: your Hoodle will serve as a MINT PASS for the next project.",
    ],
  },
];

export default RoadmapList;
