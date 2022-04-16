import Sample from "../../assets/pictures/doodle-sample1.jpg";
import OtherSample from "../../assets/pictures/skoodle.jpg";
import koala from "../../assets/pictures/bpkoala.png";
import hoodmorning from "../../assets/pictures/hoodmorning.jpg";
import rizo from "../../assets/pictures/rizo.png";
import chb from "../../assets/pictures/chb.png";
import girl from "../../assets/pictures/boolbool.png";
import asap from "../../assets/pictures/asap.png";

const team: {
  picture: string;
  name: string;
  description: string;
}[] = [
  {
    picture: koala,
    name: "Dank",
    description: "Co-Founder",
  },
  {
    picture: hoodmorning,
    name: "Hoodmorning",
    description: "Co-Founder",
  },
  {
    picture: rizo,
    name: "Rizo",
    description: "Design Lead",
  },
  {
    picture: asap,
    name: "Lil Hoodle",
    description: "Lead Developer",
  },
  {
    picture: OtherSample,
    name: "Pulse",
    description: "Strategy",
  },
  {
    picture: girl,
    name: "Styll",
    description: "Marketing Lead",
  },
];

export default team;
